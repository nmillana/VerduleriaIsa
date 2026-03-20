from __future__ import annotations

import mimetypes
import os
import secrets
import sqlite3
from dataclasses import dataclass
from http import cookies
from pathlib import Path
from typing import Callable
from urllib.parse import parse_qs

from jinja2 import Environment, FileSystemLoader, select_autoescape

from verduleria.catalog_meta import CATEGORY_CHOICES, DELIVERY_FEE, category_label
from verduleria.database import Database
from verduleria.env import load_env_file
from verduleria.security import hash_password, make_session_token, read_session_token, verify_password
from verduleria.storage import create_database


STATUS_LABELS = {
    "pendiente": "Pendiente",
    "comprado": "Comprado",
}


@dataclass
class Request:
    method: str
    path: str
    query: dict[str, list[str]]
    form: dict[str, list[str]]
    cookies: dict[str, str]


@dataclass
class Response:
    body: bytes
    status: str = "200 OK"
    headers: list[tuple[str, str]] | None = None

    def as_wsgi(self) -> tuple[str, list[tuple[str, str]], list[bytes]]:
        headers = list(self.headers or [])
        if not any(name.lower() == "content-type" for name, _ in headers):
            headers.insert(0, ("Content-Type", "text/html; charset=utf-8"))
        return self.status, headers, [self.body]


class VerduleriaApp:
    def __init__(self, db: Database, base_dir: Path, secret_key: str):
        self.db = db
        self.base_dir = base_dir
        self.static_dir = base_dir / "static"
        self.secret_key = secret_key
        self.templates = Environment(
            loader=FileSystemLoader(base_dir / "templates"),
            autoescape=select_autoescape(["html"]),
        )
        self.templates.filters["currency"] = format_currency
        self.templates.filters["qty"] = format_quantity
        self.templates.filters["status_label"] = lambda value: STATUS_LABELS.get(value, value)
        self.templates.filters["category_label"] = category_label

    def __call__(self, environ: dict, start_response: Callable):
        request = build_request(environ)
        response = self.dispatch(request)
        status, headers, body = response.as_wsgi()
        start_response(status, headers)
        return body

    def dispatch(self, request: Request) -> Response:
        if request.path.startswith("/static/"):
            return self.serve_static(request.path.removeprefix("/static/"))

        session = self.session_from_request(request)

        if request.path == "/":
            return self.home(session)
        if request.path == "/registro":
            return self.client_register(request, session)
        if request.path == "/login-cliente":
            return self.client_login(request, session)
        if request.path == "/logout":
            return redirect("/", delete_session_cookie())
        if request.path == "/cliente/dashboard":
            return self.client_dashboard(request, session)
        if request.path == "/cliente/pedido/nuevo":
            return self.client_order_form(request, session)
        if request.path == "/cliente/pedido/guardar" and request.method == "POST":
            return self.client_order_save(request, session)
        if request.path.startswith("/cliente/pedido/"):
            return self.client_order_detail(request, session)
        if request.path == "/admin/setup":
            return self.admin_setup(request, session)
        if request.path == "/admin/login":
            return self.admin_login(request, session)
        if request.path == "/admin/dashboard":
            return self.admin_dashboard(request, session)
        if request.path == "/admin/productos":
            return self.admin_products(request, session)
        if request.path == "/admin/pedidos":
            return self.admin_orders(request, session)
        if request.path.startswith("/admin/pedido/"):
            return self.admin_order_detail(request, session)
        if request.path == "/admin/clientes":
            return self.admin_clients(request, session)
        return self.render("not_found.html", {"title": "No encontrado"}, status="404 NOT FOUND", session=session)

    def home(self, session: dict | None) -> Response:
        if session:
            if session["role"] == "admin":
                return redirect("/admin/dashboard")
            if session["role"] == "client":
                return redirect("/cliente/dashboard")
        return self.render(
            "home.html",
            {
                "title": "Verduleria Isa",
            },
            session=session,
        )

    def client_register(self, request: Request, session: dict | None) -> Response:
        if session and session["role"] == "client":
            return redirect("/cliente/dashboard")
        if request.method == "POST":
            name = form_value(request, "name")
            email = form_value(request, "email")
            phone = form_value(request, "phone")
            address = form_value(request, "address")
            errors = []
            if not name:
                errors.append("El nombre es obligatorio.")
            if "@" not in email:
                errors.append("Ingresa un correo válido.")
            if not phone:
                errors.append("El teléfono es obligatorio.")
            if not address:
                errors.append("La dirección es obligatoria.")
            if errors:
                return self.render(
                    "client_register.html",
                    {
                        "title": "Registro de clienta",
                        "errors": errors,
                        "values": {"name": name, "email": email, "phone": phone, "address": address},
                    },
                    session=session,
                )
            try:
                client_id = self.db.create_client(name, email, phone, address)
            except (sqlite3.IntegrityError, ValueError):
                return self.render(
                    "client_register.html",
                    {
                        "title": "Registro de clienta",
                        "errors": ["Ese correo ya está registrado."],
                        "values": {"name": name, "email": email, "phone": phone, "address": address},
                    },
                    session=session,
                )
            cookie = session_cookie_header(self.secret_key, "client", client_id)
            return redirect("/cliente/dashboard?notice=Registro%20completado", cookie)
        return self.render(
            "client_register.html",
            {"title": "Registro de clienta", "values": {}},
            session=session,
        )

    def client_login(self, request: Request, session: dict | None) -> Response:
        if session and session["role"] == "client":
            return redirect("/cliente/dashboard")
        if request.method == "POST":
            email = form_value(request, "email").lower()
            client = self.db.find_client_by_email(email)
            if not client:
                return self.render(
                    "client_login.html",
                    {
                        "title": "Ingreso clienta",
                        "error": "No reconocí ese correo. Puede haber un error al escribirlo o necesitas registrarte.",
                        "email": email,
                    },
                    session=session,
                )
            self.db.touch_client_login(client["id"])
            cookie = session_cookie_header(self.secret_key, "client", client["id"])
            return redirect("/cliente/dashboard", cookie)
        return self.render("client_login.html", {"title": "Ingreso clienta"}, session=session)

    def client_dashboard(self, request: Request, session: dict | None) -> Response:
        client = self.require_client(session)
        if not client:
            return redirect("/login-cliente?notice=Debes%20ingresar")
        month = query_value(request, "month") or current_month()
        dashboard = self.db.client_dashboard(client["id"], month)
        return self.render(
            "client_dashboard.html",
            {
                "title": "Tu panel",
                "client": client,
                "month": month,
                "dashboard": dashboard,
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def client_order_form(self, request: Request, session: dict | None) -> Response:
        client = self.require_client(session)
        if not client:
            return redirect("/login-cliente?notice=Debes%20ingresar")
        source_id = query_value(request, "source")
        quantities = {}
        source_order = None
        if source_id and source_id.isdigit():
            source_order = self.db.get_client_order(int(source_id), client["id"])
            quantities = self.db.repeatable_order_map(int(source_id), client["id"])
        return self.render(
            "client_order_form.html",
            {
                "title": "Nuevo pedido",
                "client": client,
                "products": self.db.grouped_products(active_only=True),
                "quantities": quantities,
                "source_order": source_order,
                "error": query_value(request, "error"),
            },
            session=session,
        )

    def client_order_save(self, request: Request, session: dict | None) -> Response:
        client = self.require_client(session)
        if not client:
            return redirect("/login-cliente?notice=Debes%20ingresar")
        quantities = {}
        for key, values in request.form.items():
            if not key.startswith("qty_"):
                continue
            raw_value = first(values).replace(",", ".").strip()
            if not raw_value:
                continue
            try:
                quantity = float(raw_value)
            except ValueError:
                continue
            if quantity <= 0:
                continue
            product_id = int(key.removeprefix("qty_"))
            quantities[product_id] = quantity
        source_order_id = form_value(request, "source_order_id")
        try:
            order_id = self.db.create_order(
                client["id"],
                quantities,
                int(source_order_id) if source_order_id.isdigit() else None,
            )
        except ValueError as exc:
            return self.render(
                "client_order_form.html",
                {
                    "title": "Nuevo pedido",
                    "client": client,
                    "products": self.db.grouped_products(active_only=True),
                    "quantities": quantities,
                    "source_order": None,
                    "error": str(exc),
                },
                session=session,
            )
        return redirect(f"/cliente/pedido/{order_id}?notice=Pedido%20guardado")

    def client_order_detail(self, request: Request, session: dict | None) -> Response:
        client = self.require_client(session)
        if not client:
            return redirect("/login-cliente?notice=Debes%20ingresar")
        path_parts = request.path.strip("/").split("/")
        if len(path_parts) != 3 or not path_parts[-1].isdigit():
            return self.render("not_found.html", {"title": "No encontrado"}, status="404 NOT FOUND", session=session)
        order = self.db.get_client_order(int(path_parts[-1]), client["id"])
        if not order:
            return self.render("not_found.html", {"title": "Pedido no encontrado"}, status="404 NOT FOUND", session=session)
        return self.render(
            "client_order_detail.html",
            {
                "title": f"Pedido #{order['id']}",
                "client": client,
                "order": order,
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def admin_setup(self, request: Request, session: dict | None) -> Response:
        if self.db.admin_count():
            return redirect("/admin/login")
        if request.method == "POST":
            name = form_value(request, "name")
            email = form_value(request, "email")
            password = form_value(request, "password")
            confirm_password = form_value(request, "confirm_password")
            errors = []
            if not name:
                errors.append("El nombre es obligatorio.")
            if "@" not in email:
                errors.append("Ingresa un correo válido.")
            if len(password) < 8:
                errors.append("La contraseña debe tener al menos 8 caracteres.")
            if password != confirm_password:
                errors.append("Las contraseñas no coinciden.")
            if errors:
                return self.render(
                    "admin_setup.html",
                    {
                        "title": "Configurar administrador",
                        "errors": errors,
                        "values": {"name": name, "email": email},
                    },
                    session=session,
                )
            salt, password_hash = hash_password(password)
            try:
                admin_id = self.db.create_admin(name, email, salt, password_hash)
            except (sqlite3.IntegrityError, ValueError):
                return self.render(
                    "admin_setup.html",
                    {
                        "title": "Configurar administrador",
                        "errors": ["Ese correo ya est? registrado como administradora."],
                        "values": {"name": name, "email": email},
                    },
                    session=session,
                )
            cookie = session_cookie_header(self.secret_key, "admin", admin_id)
            return redirect("/admin/dashboard?notice=Administrador%20creado", cookie)
        return self.render(
            "admin_setup.html",
            {"title": "Configurar administrador", "values": {}},
            session=session,
        )

    def admin_login(self, request: Request, session: dict | None) -> Response:
        if not self.db.admin_count():
            return redirect("/admin/setup")
        if session and session["role"] == "admin":
            return redirect("/admin/dashboard")
        if request.method == "POST":
            email = form_value(request, "email").lower()
            password = form_value(request, "password")
            admin = self.db.find_admin_by_email(email)
            if not admin or not verify_password(password, admin["password_salt"], admin["password_hash"]):
                return self.render(
                    "admin_login.html",
                    {
                        "title": "Ingreso administrador",
                        "error": "Correo o contraseña inválidos.",
                        "email": email,
                    },
                    session=session,
                )
            cookie = session_cookie_header(self.secret_key, "admin", admin["id"])
            return redirect("/admin/dashboard", cookie)
        return self.render(
            "admin_login.html",
            {"title": "Ingreso administrador", "notice": query_value(request, "notice")},
            session=session,
        )

    def admin_dashboard(self, request: Request, session: dict | None) -> Response:
        admin = self.require_admin(session)
        if not admin:
            return redirect("/admin/login?notice=Debes%20ingresar")
        month = query_value(request, "month") or current_month()
        dashboard = self.db.admin_dashboard(month)
        recent_orders = self.db.list_orders_for_admin(month=month)[:8]
        return self.render(
            "admin_dashboard.html",
            {
                "title": "Panel administrador",
                "admin": admin,
                "month": month,
                "dashboard": dashboard,
                "recent_orders": recent_orders,
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def admin_products(self, request: Request, session: dict | None) -> Response:
        admin = self.require_admin(session)
        if not admin:
            return redirect("/admin/login?notice=Debes%20ingresar")
        if request.method == "POST":
            product_id = form_value(request, "product_id")
            name = form_value(request, "name")
            category = form_value(request, "category") or "verduras"
            estimated_price_raw = form_value(request, "estimated_price")
            is_active = form_value(request, "is_active") == "1"
            try:
                estimated_price = int(float(estimated_price_raw))
                self.db.save_product(
                    int(product_id) if product_id.isdigit() else None,
                    name,
                    category,
                    estimated_price,
                    is_active,
                )
            except (ValueError, sqlite3.IntegrityError):
                return self.render(
                    "admin_products.html",
                    {
                        "title": "Productos",
                        "admin": admin,
                        "error": "No pude guardar el producto. Revisa nombre, categoría y precio.",
                        "products": self.db.list_products(),
                    },
                    session=session,
                )
            return redirect("/admin/productos?notice=Producto%20guardado")
        return self.render(
            "admin_products.html",
            {
                "title": "Productos",
                "admin": admin,
                "products": self.db.list_products(),
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def admin_orders(self, request: Request, session: dict | None) -> Response:
        admin = self.require_admin(session)
        if not admin:
            return redirect("/admin/login?notice=Debes%20ingresar")
        month = query_value(request, "month") or current_month()
        status = query_value(request, "status")
        if status == "todos":
            status = ""
        orders = self.db.list_orders_for_admin(month=month, status=status or None)
        return self.render(
            "admin_orders.html",
            {
                "title": "Pedidos",
                "admin": admin,
                "orders": orders,
                "month": month,
                "status": status or "",
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def admin_order_detail(self, request: Request, session: dict | None) -> Response:
        admin = self.require_admin(session)
        if not admin:
            return redirect("/admin/login?notice=Debes%20ingresar")
        path_parts = request.path.strip("/").split("/")
        if len(path_parts) != 3 or not path_parts[-1].isdigit():
            return self.render("not_found.html", {"title": "No encontrado"}, status="404 NOT FOUND", session=session)
        order_id = int(path_parts[-1])
        order = self.db.get_order(order_id)
        if not order:
            return self.render("not_found.html", {"title": "Pedido no encontrado"}, status="404 NOT FOUND", session=session)
        if request.method == "POST":
            status = form_value(request, "status") or "pendiente"
            admin_note = form_value(request, "admin_note")
            item_updates = {}
            for item in order["items"]:
                raw_price = form_value(request, f"actual_{item['id']}")
                raw_note = form_value(request, f"note_{item['id']}")
                was_missing = form_value(request, f"missing_{item['id']}") == "1"
                actual_price = None
                if raw_price.strip():
                    actual_price = int(float(raw_price))
                item_updates[item["id"]] = {
                    "quantity": item["quantity"],
                    "actual_price": actual_price,
                    "item_note": raw_note,
                    "was_missing": was_missing,
                }
            self.db.update_order_actuals(order_id, status, admin_note, item_updates)
            return redirect(f"/admin/pedido/{order_id}?notice=Pedido%20actualizado")
        return self.render(
            "admin_order_detail.html",
            {
                "title": f"Pedido #{order['id']}",
                "admin": admin,
                "order": order,
                "notice": query_value(request, "notice"),
            },
            session=session,
        )

    def admin_clients(self, request: Request, session: dict | None) -> Response:
        admin = self.require_admin(session)
        if not admin:
            return redirect("/admin/login?notice=Debes%20ingresar")
        return self.render(
            "admin_clients.html",
            {
                "title": "Clientas",
                "admin": admin,
                "clients": self.db.list_clients(),
            },
            session=session,
        )

    def render(
        self,
        template_name: str,
        context: dict,
        status: str = "200 OK",
        session: dict | None = None,
        headers: list[tuple[str, str]] | None = None,
    ) -> Response:
        template = self.templates.get_template(template_name)
        default_context = {
            "category_choices": CATEGORY_CHOICES,
            "delivery_fee": DELIVERY_FEE,
            "notice": context.get("notice", ""),
            "request_month": current_month(),
            "status_labels": STATUS_LABELS,
            "session": session,
            "current_user": self.current_user(session),
        }
        default_context.update(context)
        body = template.render(**default_context).encode("utf-8")
        return Response(body=body, status=status, headers=headers or [])

    def serve_static(self, relative_path: str) -> Response:
        file_path = (self.static_dir / relative_path).resolve()
        if not str(file_path).startswith(str(self.static_dir.resolve())) or not file_path.exists():
            return Response(b"Not found", status="404 NOT FOUND", headers=[("Content-Type", "text/plain; charset=utf-8")])
        mime_type = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"
        return Response(file_path.read_bytes(), headers=[("Content-Type", mime_type)])

    def session_from_request(self, request: Request) -> dict | None:
        return read_session_token(self.secret_key, request.cookies.get("verduleria_session"))

    def require_client(self, session: dict | None) -> dict | None:
        if not session or session.get("role") != "client":
            return None
        return self.db.get_client(int(session["user_id"]))

    def require_admin(self, session: dict | None) -> dict | None:
        if not session or session.get("role") != "admin":
            return None
        return self.db.get_admin(int(session["user_id"]))

    def current_user(self, session: dict | None) -> dict | None:
        if not session:
            return None
        if session.get("role") == "admin":
            return self.require_admin(session)
        if session.get("role") == "client":
            return self.require_client(session)
        return None


def build_request(environ: dict) -> Request:
    method = environ.get("REQUEST_METHOD", "GET").upper()
    query = parse_qs(environ.get("QUERY_STRING", ""), keep_blank_values=True)
    form = {}
    if method == "POST":
        try:
            length = int(environ.get("CONTENT_LENGTH", "0") or 0)
        except ValueError:
            length = 0
        body = environ["wsgi.input"].read(length) if length else b""
        form = parse_qs(body.decode("utf-8"), keep_blank_values=True)
    cookie_header = environ.get("HTTP_COOKIE", "")
    parsed_cookies = cookies.SimpleCookie()
    parsed_cookies.load(cookie_header)
    return Request(
        method=method,
        path=environ.get("PATH_INFO", "/"),
        query=query,
        form=form,
        cookies={key: morsel.value for key, morsel in parsed_cookies.items()},
    )


def form_value(request: Request, name: str, default: str = "") -> str:
    return first(request.form.get(name, [default]))


def query_value(request: Request, name: str, default: str = "") -> str:
    return first(request.query.get(name, [default]))


def first(values: list[str] | tuple[str, ...] | str | None, default: str = "") -> str:
    if values is None:
        return default
    if isinstance(values, str):
        return values
    return values[0] if values else default


def redirect(location: str, cookie_header: tuple[str, str] | None = None) -> Response:
    headers = [("Location", location)]
    if cookie_header:
        headers.append(cookie_header)
    return Response(b"", status="302 FOUND", headers=headers)


def session_cookie_header(secret_key: str, role: str, user_id: int) -> tuple[str, str]:
    token = make_session_token(secret_key, role, user_id)
    return (
        "Set-Cookie",
        f"verduleria_session={token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800",
    )


def delete_session_cookie() -> tuple[str, str]:
    return ("Set-Cookie", "verduleria_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0")


def current_month() -> str:
    from datetime import datetime

    return datetime.now().strftime("%Y-%m")


def format_currency(value: int | float | None) -> str:
    if value is None:
        return "-"
    return f"${int(round(value)):,}".replace(",", ".")


def format_quantity(value: int | float | None) -> str:
    if value is None:
        return "-"
    if float(value).is_integer():
        return str(int(value))
    text = f"{value:.2f}".rstrip("0").rstrip(".")
    return text.replace(".", ",")


def load_or_create_secret(data_dir: Path) -> str:
    env_secret = os.getenv("VERDULERIA_SECRET_KEY")
    if env_secret:
        return env_secret
    secret_file = data_dir / "session.secret"
    if secret_file.exists():
        return secret_file.read_text(encoding="utf-8").strip()
    secret = secrets.token_urlsafe(48)
    data_dir.mkdir(parents=True, exist_ok=True)
    secret_file.write_text(secret, encoding="utf-8")
    return secret


def create_application() -> VerduleriaApp:
    base_dir = Path(__file__).resolve().parent.parent
    load_env_file(base_dir / ".env")
    data_dir = base_dir / "data"
    db = create_database(base_dir)
    try:
        db.initialize()
    except Exception as exc:
        if os.getenv("VERDULERIA_BACKEND", "").strip().lower() == "supabase":
            print(f"Supabase no esta listo ({exc}). Usando SQLite local temporalmente.")
            db = Database(data_dir / "verduleria.sqlite3")
            db.initialize()
        else:
            raise
    secret_key = load_or_create_secret(data_dir)
    return VerduleriaApp(db, base_dir, secret_key)



