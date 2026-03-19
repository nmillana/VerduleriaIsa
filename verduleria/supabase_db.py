from __future__ import annotations

import json
from collections import Counter, OrderedDict
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class SupabaseError(RuntimeError):
    pass


class SupabaseDatabase:
    def __init__(self, url: str, service_role_key: str, anon_key: str = "", timeout: int = 20):
        self.url = url.rstrip("/")
        self.service_role_key = service_role_key
        self.anon_key = anon_key
        self.timeout = timeout
        self.path = self.url

    def initialize(self) -> None:
        try:
            self._select("products", columns="id", limit=1)
        except SupabaseError as exc:
            raise SupabaseError(
                "Supabase no esta listo para Verduleria Isa. Ejecuta supabase/sql/001_schema.sql y supabase/sql/002_seed_products.sql. Si aparece 403 permission denied, ejecuta tambien supabase/sql/004_service_role_grants.sql en el SQL Editor."
            ) from exc

    def sync_catalog(self, products: list[dict], deactivate_missing: bool = False) -> dict:
        incoming = [self._product_payload(item) for item in products]
        self._insert(
            "products",
            incoming,
            prefer="resolution=merge-duplicates,return=representation",
            on_conflict="name",
        )
        deactivated = 0
        if deactivate_missing and incoming:
            names = {item["name"] for item in incoming}
            active_rows = self.list_products(active_only=True)
            for row in active_rows:
                if row["name"] not in names:
                    self._update("products", [("id", f"eq.{row['id']}")], {"is_active": False})
                    deactivated += 1
        return {"inserted": len(incoming), "updated": 0, "deactivated": deactivated}

    def admin_count(self) -> int:
        return len(self._select("admins", columns="id", limit=1))

    def create_admin(self, name: str, email: str, password_salt: str, password_hash: str) -> int:
        payload = {
            "name": name.strip(),
            "email": email.strip().lower(),
            "password_salt": password_salt,
            "password_hash": password_hash,
        }
        row = self._insert_one("admins", payload)
        return int(row["id"])

    def find_admin_by_email(self, email: str) -> dict | None:
        rows = self._select(
            "admins",
            filters=[("email", f"eq.{email.strip().lower()}")],
            limit=1,
        )
        return self._normalize_admin(rows[0]) if rows else None

    def get_admin(self, admin_id: int | str) -> dict | None:
        rows = self._select("admins", filters=[("id", f"eq.{admin_id}")], limit=1)
        return self._normalize_admin(rows[0]) if rows else None

    def create_client(self, name: str, email: str, phone: str, address: str) -> int:
        payload = {
            "name": name.strip(),
            "email": email.strip().lower(),
            "phone": phone.strip(),
            "address": address.strip(),
        }
        row = self._insert_one("clients", payload)
        return int(row["id"])

    def list_clients(self) -> list[dict]:
        clients = [self._normalize_client(row) for row in self._select("clients", order="name.asc")]
        orders = self._select("orders", columns="id,client_id")
        counts = Counter(int(row["client_id"]) for row in orders)
        for client in clients:
            client["order_count"] = counts.get(int(client["id"]), 0)
        return clients

    def find_client_by_email(self, email: str) -> dict | None:
        rows = self._select(
            "clients",
            filters=[("email", f"eq.{email.strip().lower()}")],
            limit=1,
        )
        return self._normalize_client(rows[0]) if rows else None

    def get_client(self, client_id: int | str) -> dict | None:
        rows = self._select("clients", filters=[("id", f"eq.{client_id}")], limit=1)
        return self._normalize_client(rows[0]) if rows else None

    def touch_client_login(self, client_id: int | str) -> None:
        self._update(
            "clients",
            [("id", f"eq.{client_id}")],
            {"last_login_at": self._now_iso(), "updated_at": self._now_iso()},
        )

    def list_products(self, active_only: bool = False) -> list[dict]:
        filters = []
        if active_only:
            filters.append(("is_active", "eq.true"))
        rows = self._select("products", filters=filters, order="category.asc,name.asc")
        return [self._normalize_product(row) for row in rows]

    def grouped_products(self, active_only: bool = True) -> OrderedDict[str, list[dict]]:
        groups: OrderedDict[str, list[dict]] = OrderedDict()
        for product in self.list_products(active_only=active_only):
            groups.setdefault(product["category"], []).append(product)
        return groups

    def save_product(
        self,
        product_id: int | None,
        name: str,
        category: str,
        estimated_price: int,
        is_active: bool,
    ) -> None:
        payload = {
            "name": name.strip(),
            "category": category.strip().lower(),
            "estimated_price": int(estimated_price),
            "is_active": bool(is_active),
        }
        if product_id:
            self._update("products", [("id", f"eq.{product_id}")], payload)
        else:
            self._insert_one("products", payload)

    def create_order(
        self,
        client_id: int,
        quantities: dict[int, float],
        source_order_id: int | None = None,
    ) -> int:
        product_ids = [int(product_id) for product_id in quantities.keys()]
        if not product_ids:
            raise ValueError("No hay productos seleccionados.")

        rows = self._select(
            "products",
            filters=[("id", f"in.({','.join(str(product_id) for product_id in product_ids)})"), ("is_active", "eq.true")],
        )
        products = {int(row["id"]): self._normalize_product(row) for row in rows}
        line_items = []
        estimated_total = 0
        for product_id, quantity in quantities.items():
            product = products.get(int(product_id))
            if not product:
                continue
            subtotal = int(round(product["estimated_price"] * quantity))
            estimated_total += subtotal
            line_items.append(
                {
                    "product_id": int(product_id),
                    "product_name": product["name"],
                    "quantity": float(quantity),
                    "estimated_price": int(product["estimated_price"]),
                    "estimated_total": subtotal,
                }
            )
        if not line_items:
            raise ValueError("No se pudo construir el pedido con los productos enviados.")

        order = self._insert_one(
            "orders",
            {
                "client_id": int(client_id),
                "source_order_id": int(source_order_id) if source_order_id else None,
                "status": "pendiente",
                "estimated_total": estimated_total,
            },
        )
        order_id = int(order["id"])
        items_payload = []
        for item in line_items:
            item["order_id"] = order_id
            items_payload.append(item)
        self._insert("order_items", items_payload, prefer="return=minimal")
        return order_id

    def get_order(self, order_id: int) -> dict | None:
        order_rows = self._select("orders", filters=[("id", f"eq.{order_id}")], limit=1)
        if not order_rows:
            return None
        order = self._normalize_order(order_rows[0])
        client = self.get_client(order["client_id"])
        items = self._fetch_order_items([order_id]).get(order_id, [])
        order["client_name"] = client.get("name") if client else ""
        order["client_email"] = client.get("email") if client else ""
        order["client_phone"] = client.get("phone") if client else ""
        order["client_address"] = client.get("address") if client else ""
        order["items"] = items
        return order

    def get_client_order(self, order_id: int, client_id: int) -> dict | None:
        order = self.get_order(order_id)
        if not order or int(order["client_id"]) != int(client_id):
            return None
        return order

    def repeatable_order_map(self, order_id: int, client_id: int) -> dict[int, float]:
        order = self.get_client_order(order_id, client_id)
        if not order:
            return {}
        return {int(item["product_id"]): float(item["quantity"]) for item in order["items"]}

    def list_orders_for_client(self, client_id: int, month: str | None = None) -> list[dict]:
        filters: list[tuple[str, str]] = [("client_id", f"eq.{client_id}")]
        if month:
            filters.extend(self._month_filters(month))
        orders = [
            self._normalize_order(row)
            for row in self._select("orders", filters=filters, order="created_at.desc")
        ]
        items_by_order = self._fetch_order_items([order["id"] for order in orders])
        for order in orders:
            order["items"] = items_by_order.get(order["id"], [])
            order["display_total"] = order["actual_total"] or order["estimated_total"]
        return orders

    def client_dashboard(self, client_id: int, month: str) -> dict:
        orders = self.list_orders_for_client(client_id, month)
        monthly_total = sum(order["display_total"] for order in orders)
        order_count = len(orders)
        average_ticket = int(round(monthly_total / order_count)) if order_count else 0
        weekly_groups: OrderedDict[str, dict] = OrderedDict()
        for order in orders:
            order_dt = self._parse_datetime(order["created_at"])
            week_start = (order_dt - timedelta(days=order_dt.weekday())).date()
            key = week_start.isoformat()
            if key not in weekly_groups:
                weekly_groups[key] = {
                    "label": f"Semana del {week_start.strftime('%d-%m-%Y')}",
                    "total": 0,
                    "orders": [],
                }
            weekly_groups[key]["total"] += order["display_total"]
            weekly_groups[key]["orders"].append(order)
        return {
            "summary": {
                "monthly_total": monthly_total,
                "order_count": order_count,
                "average_ticket": average_ticket,
            },
            "weeks": list(weekly_groups.values()),
            "orders": orders,
        }

    def list_orders_for_admin(self, month: str | None = None, status: str | None = None) -> list[dict]:
        filters: list[tuple[str, str]] = []
        if month:
            filters.extend(self._month_filters(month))
        if status:
            filters.append(("status", f"eq.{status}"))
        orders = [
            self._normalize_order(row)
            for row in self._select("orders", filters=filters, order="created_at.desc")
        ]
        clients = self._fetch_clients_for_orders(orders)
        for order in orders:
            client = clients.get(order["client_id"], {})
            order["client_name"] = client.get("name", "")
            order["client_email"] = client.get("email", "")
        return orders

    def update_order_actuals(
        self,
        order_id: int,
        status: str,
        admin_note: str,
        item_updates: dict[int, dict],
    ) -> None:
        for item_id, item in item_updates.items():
            actual_price = item["actual_price"]
            quantity = float(item["quantity"])
            actual_total = int(round(actual_price * quantity)) if actual_price is not None else None
            self._update(
                "order_items",
                [("id", f"eq.{item_id}"), ("order_id", f"eq.{order_id}")],
                {
                    "actual_price": actual_price,
                    "actual_total": actual_total,
                    "item_note": item["item_note"],
                    "was_missing": bool(item["was_missing"]),
                },
            )

        items = self._fetch_order_items([order_id]).get(order_id, [])
        estimated_total = sum(int(item["estimated_total"]) for item in items)
        display_total = sum(int(item["actual_total"] or item["estimated_total"]) for item in items)
        self._update(
            "orders",
            [("id", f"eq.{order_id}")],
            {
                "status": status,
                "admin_note": admin_note.strip(),
                "estimated_total": estimated_total,
                "actual_total": display_total,
                "purchased_at": self._now_iso() if status == "comprado" else None,
            },
        )

    def admin_dashboard(self, month: str) -> dict:
        orders = self.list_orders_for_admin(month=month)
        order_ids = [order["id"] for order in orders]
        items = []
        for rows in self._fetch_order_items(order_ids).values():
            items.extend(rows)
        summary = {
            "order_count": len(orders),
            "client_count": len({int(order["client_id"]) for order in orders}),
            "revenue": sum(int(order["actual_total"] or order["estimated_total"]) for order in orders),
        }
        grouped: dict[str, dict] = {}
        for item in items:
            bucket = grouped.setdefault(
                item["product_name"],
                {
                    "product_name": item["product_name"],
                    "request_count": 0,
                    "total_quantity": 0.0,
                    "revenue": 0,
                },
            )
            bucket["request_count"] += 1
            bucket["total_quantity"] += float(item["quantity"])
            bucket["revenue"] += int(item["actual_total"] or item["estimated_total"])
        ranked = sorted(
            grouped.values(),
            key=lambda row: (-row["request_count"], -row["total_quantity"], row["product_name"]),
        )
        low_ranked = sorted(
            grouped.values(),
            key=lambda row: (row["request_count"], row["total_quantity"], row["product_name"]),
        )
        return {
            "summary": summary,
            "top_products": ranked[:5],
            "low_products": low_ranked[:5],
        }

    def _fetch_order_items(self, order_ids: list[int]) -> dict[int, list[dict]]:
        if not order_ids:
            return {}
        rows = self._select(
            "order_items",
            filters=[("order_id", f"in.({','.join(str(order_id) for order_id in order_ids)})")],
            order="order_id.asc,product_name.asc",
        )
        grouped: dict[int, list[dict]] = {int(order_id): [] for order_id in order_ids}
        for row in rows:
            item = self._normalize_item(row)
            grouped.setdefault(int(item["order_id"]), []).append(item)
        return grouped

    def _fetch_clients_for_orders(self, orders: list[dict]) -> dict[int, dict]:
        client_ids = sorted({int(order["client_id"]) for order in orders})
        if not client_ids:
            return {}
        rows = self._select(
            "clients",
            filters=[("id", f"in.({','.join(str(client_id) for client_id in client_ids)})")],
        )
        return {int(row["id"]): self._normalize_client(row) for row in rows}

    def _select(
        self,
        table: str,
        filters: list[tuple[str, str]] | None = None,
        columns: str = "*",
        order: str | None = None,
        limit: int | None = None,
    ):
        query: list[tuple[str, str]] = [("select", columns)]
        if filters:
            query.extend(filters)
        if order:
            query.append(("order", order))
        if limit is not None:
            query.append(("limit", str(limit)))
        data = self._request("GET", f"/rest/v1/{table}", query=query)
        return data if isinstance(data, list) else []

    def _insert_one(self, table: str, payload: dict) -> dict:
        rows = self._insert(table, payload)
        return rows[0] if rows else {}

    def _insert(
        self,
        table: str,
        payload: dict | list[dict],
        prefer: str = "return=representation",
        on_conflict: str | None = None,
    ):
        query = []
        if on_conflict:
            query.append(("on_conflict", on_conflict))
        data = self._request(
            "POST",
            f"/rest/v1/{table}",
            query=query,
            body=payload,
            headers={"Prefer": prefer},
        )
        return data if isinstance(data, list) else ([data] if isinstance(data, dict) else [])

    def _update(
        self,
        table: str,
        filters: list[tuple[str, str]],
        payload: dict,
        prefer: str = "return=minimal",
    ):
        return self._request(
            "PATCH",
            f"/rest/v1/{table}",
            query=filters,
            body=payload,
            headers={"Prefer": prefer},
        )

    def _request(
        self,
        method: str,
        path: str,
        query: list[tuple[str, str]] | None = None,
        body: dict | list[dict] | None = None,
        headers: dict[str, str] | None = None,
    ):
        url = f"{self.url}{path}"
        if query:
            url = f"{url}?{urlencode(query, doseq=True)}"

        request_headers = {
            "apikey": self.service_role_key,
            "Authorization": f"Bearer {self.service_role_key}",
            "Accept": "application/json",
        }
        if headers:
            request_headers.update(headers)

        data = None
        if body is not None:
            data = json.dumps(body, ensure_ascii=False).encode("utf-8")
            request_headers["Content-Type"] = "application/json"

        request = Request(url=url, data=data, headers=request_headers, method=method)
        try:
            with urlopen(request, timeout=self.timeout) as response:
                raw = response.read()
                if not raw:
                    return None
                return json.loads(raw.decode("utf-8"))
        except HTTPError as exc:
            message = exc.reason
            try:
                error_body = exc.read().decode("utf-8")
                payload = json.loads(error_body) if error_body else {}
                message = payload.get("message") or payload.get("msg") or error_body or message
            except Exception:
                pass
            lowered = str(message).lower()
            if exc.code == 409 or "duplicate key" in lowered or "already exists" in lowered:
                raise ValueError(message) from exc
            raise SupabaseError(message) from exc

    def _normalize_admin(self, row: dict) -> dict:
        return {
            "id": int(row["id"]),
            "name": row.get("name") or "",
            "email": row.get("email") or "",
            "password_salt": row.get("password_salt") or "",
            "password_hash": row.get("password_hash") or "",
            "created_at": row.get("created_at") or "",
        }

    def _normalize_client(self, row: dict) -> dict:
        return {
            "id": int(row["id"]),
            "name": row.get("name") or "",
            "email": row.get("email") or "",
            "phone": row.get("phone") or "",
            "address": row.get("address") or "",
            "created_at": row.get("created_at") or "",
            "updated_at": row.get("updated_at") or "",
            "last_login_at": row.get("last_login_at") or None,
        }

    def _normalize_product(self, row: dict) -> dict:
        return {
            "id": int(row["id"]),
            "name": row.get("name") or "",
            "category": row.get("category") or "",
            "estimated_price": int(row.get("estimated_price") or 0),
            "is_active": bool(row.get("is_active")),
            "created_at": row.get("created_at") or "",
            "updated_at": row.get("updated_at") or "",
        }

    def _normalize_order(self, row: dict) -> dict:
        return {
            "id": int(row["id"]),
            "client_id": int(row["client_id"]),
            "source_order_id": int(row["source_order_id"]) if row.get("source_order_id") is not None else None,
            "status": row.get("status") or "pendiente",
            "admin_note": row.get("admin_note") or "",
            "estimated_total": int(row.get("estimated_total") or 0),
            "actual_total": int(row["actual_total"]) if row.get("actual_total") is not None else None,
            "created_at": row.get("created_at") or "",
            "updated_at": row.get("updated_at") or "",
            "purchased_at": row.get("purchased_at") or None,
        }

    def _normalize_item(self, row: dict) -> dict:
        return {
            "id": int(row["id"]),
            "order_id": int(row["order_id"]),
            "product_id": int(row["product_id"]),
            "product_name": row.get("product_name") or "",
            "quantity": float(row.get("quantity") or 0),
            "estimated_price": int(row.get("estimated_price") or 0),
            "estimated_total": int(row.get("estimated_total") or 0),
            "actual_price": int(row["actual_price"]) if row.get("actual_price") is not None else None,
            "actual_total": int(row["actual_total"]) if row.get("actual_total") is not None else None,
            "item_note": row.get("item_note") or "",
            "was_missing": bool(row.get("was_missing")),
        }

    def _product_payload(self, item: dict) -> dict:
        return {
            "name": item["name"].strip(),
            "category": item["category"].strip().lower(),
            "estimated_price": int(item["estimated_price"]),
            "is_active": True,
        }

    def _month_filters(self, month: str) -> list[tuple[str, str]]:
        year, month_number = month.split("-", 1)
        start = datetime(int(year), int(month_number), 1, tzinfo=timezone.utc)
        if int(month_number) == 12:
            end = datetime(int(year) + 1, 1, 1, tzinfo=timezone.utc)
        else:
            end = datetime(int(year), int(month_number) + 1, 1, tzinfo=timezone.utc)
        return [("created_at", f"gte.{start.isoformat()}"), ("created_at", f"lt.{end.isoformat()}")]

    def _parse_datetime(self, value: str) -> datetime:
        text = value.replace("Z", "+00:00")
        parsed = datetime.fromisoformat(text)
        if parsed.tzinfo is not None:
            return parsed.astimezone().replace(tzinfo=None)
        return parsed

    def _now_iso(self) -> str:
        return datetime.now(timezone.utc).replace(microsecond=0).isoformat()

