from __future__ import annotations

import sqlite3
from collections import OrderedDict
from datetime import datetime, timedelta
from pathlib import Path
from typing import Iterable

from verduleria.catalog_meta import DELIVERY_FEE, category_sort_key, display_category_for, normalize_name
from verduleria.catalog_seed import CATALOG_SEED


SCHEMA = """
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    last_login_at TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    estimated_price INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    source_order_id INTEGER REFERENCES orders(id),
    status TEXT NOT NULL DEFAULT 'pendiente',
    admin_note TEXT,
    estimated_total INTEGER NOT NULL DEFAULT 0,
    actual_total INTEGER,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    purchased_at TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    product_name TEXT NOT NULL,
    quantity REAL NOT NULL,
    estimated_price INTEGER NOT NULL,
    estimated_total INTEGER NOT NULL,
    actual_price INTEGER,
    actual_total INTEGER,
    item_note TEXT,
    was_missing INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_id, created_at);
CREATE INDEX IF NOT EXISTS idx_orders_month ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
"""


def now_str() -> str:
    return datetime.now().replace(microsecond=0).isoformat(sep=" ")


class Database:
    def __init__(self, path: str | Path):
        self.path = Path(path)

    def initialize(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as conn:
            conn.executescript(SCHEMA)
        self.seed_products(CATALOG_SEED)

    def connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        return conn

    def seed_products(self, products: Iterable[dict]) -> None:
        stamp = now_str()
        with self.connect() as conn:
            count = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
            if count:
                return
            conn.executemany(
                """
                INSERT INTO products (name, category, estimated_price, is_active, created_at, updated_at)
                VALUES (?, ?, ?, 1, ?, ?)
                """,
                [
                    (item["name"], item["category"], item["estimated_price"], stamp, stamp)
                    for item in products
                ],
            )

    def sync_catalog(self, products: Iterable[dict], deactivate_missing: bool = False) -> dict:
        stamp = now_str()
        incoming = list(products)
        names = {item["name"] for item in incoming}
        inserted = 0
        updated = 0
        with self.connect() as conn:
            for item in incoming:
                existing = conn.execute(
                    "SELECT id FROM products WHERE name = ?",
                    (item["name"],),
                ).fetchone()
                if existing:
                    conn.execute(
                        """
                        UPDATE products
                        SET category = ?, estimated_price = ?, is_active = 1, updated_at = ?
                        WHERE id = ?
                        """,
                        (
                            item["category"],
                            item["estimated_price"],
                            stamp,
                            existing["id"],
                        ),
                    )
                    updated += 1
                else:
                    conn.execute(
                        """
                        INSERT INTO products (name, category, estimated_price, is_active, created_at, updated_at)
                        VALUES (?, ?, ?, 1, ?, ?)
                        """,
                        (
                            item["name"],
                            item["category"],
                            item["estimated_price"],
                            stamp,
                            stamp,
                        ),
                    )
                    inserted += 1
            deactivated = 0
            if deactivate_missing and names:
                existing_rows = conn.execute("SELECT id, name FROM products WHERE is_active = 1").fetchall()
                to_deactivate = [row["id"] for row in existing_rows if row["name"] not in names]
                if to_deactivate:
                    conn.executemany(
                        "UPDATE products SET is_active = 0, updated_at = ? WHERE id = ?",
                        [(stamp, product_id) for product_id in to_deactivate],
                    )
                    deactivated = len(to_deactivate)
        return {"inserted": inserted, "updated": updated, "deactivated": deactivated}

    def admin_count(self) -> int:
        with self.connect() as conn:
            return conn.execute("SELECT COUNT(*) FROM admins").fetchone()[0]

    def create_admin(self, name: str, email: str, password_salt: str, password_hash: str) -> int:
        stamp = now_str()
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO admins (name, email, password_salt, password_hash, created_at)
                VALUES (?, ?, ?, ?, ?)
                """,
                (name.strip(), email.strip().lower(), password_salt, password_hash, stamp),
            )
            return cursor.lastrowid

    def find_admin_by_email(self, email: str) -> dict | None:
        with self.connect() as conn:
            row = conn.execute(
                "SELECT * FROM admins WHERE email = ?",
                (email.strip().lower(),),
            ).fetchone()
        return dict(row) if row else None

    def get_admin(self, admin_id: int) -> dict | None:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM admins WHERE id = ?", (admin_id,)).fetchone()
        return dict(row) if row else None

    def create_client(self, name: str, email: str, phone: str, address: str) -> int:
        stamp = now_str()
        with self.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO clients (name, email, phone, address, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    name.strip(),
                    email.strip().lower(),
                    phone.strip(),
                    address.strip(),
                    stamp,
                    stamp,
                ),
            )
            return cursor.lastrowid

    def list_clients(self) -> list[dict]:
        with self.connect() as conn:
            rows = conn.execute(
                """
                SELECT c.*, COUNT(o.id) AS order_count
                FROM clients c
                LEFT JOIN orders o ON o.client_id = c.id
                GROUP BY c.id
                ORDER BY c.name
                """
            ).fetchall()
        return [dict(row) for row in rows]

    def find_client_by_email(self, email: str) -> dict | None:
        with self.connect() as conn:
            row = conn.execute(
                "SELECT * FROM clients WHERE email = ?",
                (email.strip().lower(),),
            ).fetchone()
        return dict(row) if row else None

    def get_client(self, client_id: int) -> dict | None:
        with self.connect() as conn:
            row = conn.execute("SELECT * FROM clients WHERE id = ?", (client_id,)).fetchone()
        return dict(row) if row else None

    def touch_client_login(self, client_id: int) -> None:
        stamp = now_str()
        with self.connect() as conn:
            conn.execute(
                "UPDATE clients SET last_login_at = ?, updated_at = ? WHERE id = ?",
                (stamp, stamp, client_id),
            )

    def list_products(self, active_only: bool = False) -> list[dict]:
        query = "SELECT * FROM products"
        if active_only:
            query += " WHERE is_active = 1"
        with self.connect() as conn:
            rows = [dict(row) for row in conn.execute(query).fetchall()]
        products = []
        for row in rows:
            row["name"] = normalize_name(row["name"])
            row["category"] = display_category_for(row["name"], row.get("category", "verduras"))
            products.append(row)
        products.sort(key=lambda item: (category_sort_key(item["category"]), item["name"].lower()))
        return products

    def grouped_products(self, active_only: bool = True) -> OrderedDict[str, list[dict]]:
        groups: OrderedDict[str, list[dict]] = OrderedDict()
        for product in self.list_products(active_only=active_only):
            groups.setdefault(product["category"], []).append(product)
        return groups

    def get_product(self, product_id: int) -> dict | None:
        """Obtener un producto por su ID."""
        with self.connect() as conn:
            row = conn.execute(
                "SELECT * FROM products WHERE id = ?",
                (product_id,)
            ).fetchone()
        return dict(row) if row else None

    def save_product(
        self,
        product_id: int | None,
        name: str,
        category: str,
        estimated_price: int,
        is_active: bool,
    ) -> None:
        stamp = now_str()
        clean_name = name.strip()
        clean_category = category.strip().lower()
        active_flag = 1 if is_active else 0
        with self.connect() as conn:
            if product_id:
                conn.execute(
                    """
                    UPDATE products
                    SET name = ?, category = ?, estimated_price = ?, is_active = ?, updated_at = ?
                    WHERE id = ?
                    """,
                    (clean_name, clean_category, estimated_price, active_flag, stamp, product_id),
                )
            else:
                conn.execute(
                    """
                    INSERT INTO products (name, category, estimated_price, is_active, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                    """,
                    (clean_name, clean_category, estimated_price, active_flag, stamp, stamp),
                )

    def create_order(
        self,
        client_id: int,
        quantities: dict[int, float],
        source_order_id: int | None = None,
    ) -> int:
        product_ids = list(quantities.keys())
        if not product_ids:
            raise ValueError("No hay productos seleccionados.")

        placeholders = ",".join("?" for _ in product_ids)
        with self.connect() as conn:
            rows = conn.execute(
                f"""
                SELECT id, name, estimated_price
                FROM products
                WHERE id IN ({placeholders}) AND is_active = 1
                ORDER BY category, name
                """,
                product_ids,
            ).fetchall()
            products = {row["id"]: dict(row) for row in rows}
            line_items = []
            estimated_total = 0
            for product_id, quantity in quantities.items():
                product = products.get(product_id)
                if not product:
                    continue
                subtotal = int(round(product["estimated_price"] * quantity))
                estimated_total += subtotal
                line_items.append(
                    (
                        product_id,
                        product["name"],
                        quantity,
                        product["estimated_price"],
                        subtotal,
                    )
                )
            if not line_items:
                raise ValueError("No se pudo construir el pedido con los productos enviados.")
            stamp = now_str()
            cursor = conn.execute(
                """
                INSERT INTO orders (
                    client_id, source_order_id, status, estimated_total, created_at, updated_at
                )
                VALUES (?, ?, 'pendiente', ?, ?, ?)
                """,
                (client_id, source_order_id, estimated_total, stamp, stamp),
            )
            order_id = cursor.lastrowid
            conn.executemany(
                """
                INSERT INTO order_items (
                    order_id, product_id, product_name, quantity,
                    estimated_price, estimated_total
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                [
                    (order_id, product_id, name, quantity, price, subtotal)
                    for product_id, name, quantity, price, subtotal in line_items
                ],
            )
        return order_id

    def get_order(self, order_id: int) -> dict | None:
        with self.connect() as conn:
            order = conn.execute(
                """
                SELECT
                    o.*, c.name AS client_name, c.email AS client_email,
                    c.phone AS client_phone, c.address AS client_address
                FROM orders o
                JOIN clients c ON c.id = o.client_id
                WHERE o.id = ?
                """,
                (order_id,),
            ).fetchone()
            if not order:
                return None
            items = conn.execute(
                """
                SELECT *
                FROM order_items
                WHERE order_id = ?
                ORDER BY product_name
                """,
                (order_id,),
            ).fetchall()
        order_dict = dict(order)
        order_dict["items"] = [dict(item) for item in items]
        return self._decorate_order_totals(order_dict)

    def get_client_order(self, order_id: int, client_id: int) -> dict | None:
        order = self.get_order(order_id)
        if not order or order["client_id"] != client_id:
            return None
        return order

    def repeatable_order_map(self, order_id: int, client_id: int) -> dict[int, float]:
        order = self.get_client_order(order_id, client_id)
        if not order:
            return {}
        return {item["product_id"]: item["quantity"] for item in order["items"]}

    def list_orders_for_client(self, client_id: int, month: str | None = None) -> list[dict]:
        query = """
            SELECT *
            FROM orders
            WHERE client_id = ?
        """
        params: list = [client_id]
        if month:
            query += " AND substr(created_at, 1, 7) = ?"
            params.append(month)
        query += " ORDER BY created_at DESC"
        with self.connect() as conn:
            orders = conn.execute(query, params).fetchall()
            order_ids = [row["id"] for row in orders]
            items_by_order: dict[int, list[dict]] = {order_id: [] for order_id in order_ids}
            if order_ids:
                placeholders = ",".join("?" for _ in order_ids)
                item_rows = conn.execute(
                    f"""
                    SELECT *
                    FROM order_items
                    WHERE order_id IN ({placeholders})
                    ORDER BY order_id, product_name
                    """,
                    order_ids,
                ).fetchall()
                for item in item_rows:
                    items_by_order[item["order_id"]].append(dict(item))
        results = []
        for row in orders:
            order = dict(row)
            order["items"] = items_by_order.get(row["id"], [])
            results.append(self._decorate_order_totals(order))
        return results

    def client_dashboard(self, client_id: int, month: str) -> dict:
        orders = self.list_orders_for_client(client_id, month)
        monthly_total = sum(order["display_total"] for order in orders)
        order_count = len(orders)
        average_ticket = int(round(monthly_total / order_count)) if order_count else 0
        weekly_groups: OrderedDict[str, dict] = OrderedDict()
        for order in orders:
            order_dt = datetime.fromisoformat(order["created_at"])
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
        query = """
            SELECT
                o.*, c.name AS client_name, c.email AS client_email
            FROM orders o
            JOIN clients c ON c.id = o.client_id
            WHERE 1 = 1
        """
        params: list = []
        if month:
            query += " AND substr(o.created_at, 1, 7) = ?"
            params.append(month)
        if status:
            query += " AND o.status = ?"
            params.append(status)
        query += " ORDER BY o.created_at DESC"
        with self.connect() as conn:
            rows = conn.execute(query, params).fetchall()
        return [self._decorate_order_totals(dict(row)) for row in rows]

    def update_order_actuals(
        self,
        order_id: int,
        status: str,
        admin_note: str,
        item_updates: dict[int, dict],
    ) -> None:
        stamp = now_str()
        with self.connect() as conn:
            for item_id, item in item_updates.items():
                actual_price = item["actual_price"]
                quantity = float(item["quantity"])
                actual_total = int(round(actual_price * quantity)) if actual_price is not None else None
                conn.execute(
                    """
                    UPDATE order_items
                    SET actual_price = ?, actual_total = ?, item_note = ?, was_missing = ?
                    WHERE id = ? AND order_id = ?
                    """,
                    (
                        actual_price,
                        actual_total,
                        item["item_note"],
                        1 if item["was_missing"] else 0,
                        item_id,
                        order_id,
                    ),
                )
            totals = conn.execute(
                """
                SELECT
                    SUM(estimated_total) AS estimated_total,
                    SUM(COALESCE(actual_total, estimated_total)) AS display_total
                FROM order_items
                WHERE order_id = ?
                """,
                (order_id,),
            ).fetchone()
            purchased_at = stamp if status == "comprado" else None
            conn.execute(
                """
                UPDATE orders
                SET status = ?, admin_note = ?, estimated_total = ?, actual_total = ?,
                    purchased_at = ?, updated_at = ?
                WHERE id = ?
                """,
                (
                    status,
                    admin_note.strip(),
                    totals["estimated_total"] or 0,
                    totals["display_total"] or 0,
                    purchased_at,
                    stamp,
                    order_id,
                ),
            )

    def _decorate_order_totals(self, order: dict) -> dict:
        subtotal_estimated = int(order.get("estimated_total") or 0)
        subtotal_actual = int(order["actual_total"]) if order.get("actual_total") is not None else None
        actual_base = subtotal_actual if subtotal_actual is not None else subtotal_estimated
        order["subtotal_estimated"] = subtotal_estimated
        order["subtotal_actual"] = subtotal_actual
        order["display_subtotal"] = actual_base
        order["display_subtotal_label"] = (
            "subtotal real de productos" if subtotal_actual is not None else "subtotal estimado de productos"
        )
        order["delivery_fee"] = DELIVERY_FEE
        order["estimated_total_with_delivery"] = subtotal_estimated + DELIVERY_FEE
        order["actual_total_with_delivery"] = actual_base + DELIVERY_FEE
        order["display_total"] = actual_base + DELIVERY_FEE
        return order

    def admin_dashboard(self, month: str) -> dict:
        with self.connect() as conn:
            summary = conn.execute(
                """
                SELECT
                    COUNT(*) AS order_count,
                    COUNT(DISTINCT client_id) AS client_count,
                    COALESCE(SUM(COALESCE(actual_total, estimated_total)), 0) AS revenue
                FROM orders
                WHERE substr(created_at, 1, 7) = ?
                """,
                (month,),
            ).fetchone()
            ranked_products = [
                dict(row)
                for row in conn.execute(
                    """
                    SELECT
                        oi.product_name,
                        COUNT(*) AS request_count,
                        ROUND(SUM(oi.quantity), 2) AS total_quantity,
                        COALESCE(SUM(COALESCE(oi.actual_total, oi.estimated_total)), 0) AS revenue
                    FROM order_items oi
                    JOIN orders o ON o.id = oi.order_id
                    WHERE substr(o.created_at, 1, 7) = ?
                    GROUP BY oi.product_name
                    """,
                    (month,),
                ).fetchall()
            ]
        summary_dict = dict(summary)
        summary_dict["revenue"] = int(summary_dict.get("revenue") or 0) + int(summary_dict.get("order_count") or 0) * DELIVERY_FEE
        top_products = sorted(
            ranked_products,
            key=lambda row: (-int(row["request_count"]), -float(row["total_quantity"]), row["product_name"].lower()),
        )[:5]
        top_names = {row["product_name"] for row in top_products}
        low_products = [
            row
            for row in sorted(
                ranked_products,
                key=lambda row: (int(row["request_count"]), float(row["total_quantity"]), row["product_name"].lower()),
            )
            if row["product_name"] not in top_names
        ][:5]
        return {
            "summary": summary_dict,
            "top_products": top_products,
            "low_products": low_products,
        }

    def update_pending_orders_with_new_price(self, product_id: int, new_price: int) -> int:
        """
        Recalcular pedidos en estado 'pendiente' cuando cambia el precio de un producto.

        Lógica:
        - Solo afecta pedidos con status='pendiente'
        - Mantiene estimated_total (precio antiguo)
        - Actualiza actual_price y actual_total (precio nuevo)
        - Recalcula el total del pedido

        Args:
            product_id: ID del producto que cambió de precio
            new_price: Nuevo precio del producto

        Returns:
            Cantidad de órdenes actualizadas
        """
        stamp = now_str()
        updated_orders = 0

        with self.connect() as conn:
            # 1. Encontrar todos los order_items con este producto en órdenes 'pendiente'
            items = conn.execute(
                """
                SELECT oi.id, oi.order_id, oi.quantity
                FROM order_items oi
                JOIN orders o ON o.id = oi.order_id
                WHERE oi.product_id = ? AND o.status = 'pendiente'
                """,
                (product_id,),
            ).fetchall()

            if not items:
                return 0

            # 2. Actualizar cada item con el nuevo precio
            for item in items:
                item_id = item["id"]
                quantity = float(item["quantity"])
                actual_total = int(round(new_price * quantity))

                conn.execute(
                    """
                    UPDATE order_items
                    SET actual_price = ?, actual_total = ?
                    WHERE id = ?
                    """,
                    (new_price, actual_total, item_id),
                )

            # 3. Recalcular totales para cada orden afectada
            order_ids = list(set(item["order_id"] for item in items))
            for order_id in order_ids:
                totals = conn.execute(
                    """
                    SELECT
                        SUM(estimated_total) AS estimated_total,
                        SUM(COALESCE(actual_total, estimated_total)) AS display_total
                    FROM order_items
                    WHERE order_id = ?
                    """,
                    (order_id,),
                ).fetchone()

                conn.execute(
                    """
                    UPDATE orders
                    SET actual_total = ?, updated_at = ?
                    WHERE id = ?
                    """,
                    (
                        totals["display_total"] or 0,
                        stamp,
                        order_id,
                    ),
                )
                updated_orders += 1

        return updated_orders

    def consolidate_orders_by_week(self, from_date: str, to_date: str) -> dict:
        """
        Consolidar pedidos por semana ISO.

        Args:
            from_date: Fecha inicio (YYYY-MM-DD)
            to_date: Fecha fin (YYYY-MM-DD)

        Returns:
            Dict con estructura:
            {
                'semana_1': {
                    'tomate': {'cantidad': 5.5, 'precio_unitario': 500, 'total': 2750},
                    ...
                },
                'semana_2': {...}
            }
        """
        with self.connect() as conn:
            # Obtener todos los order_items en el rango de fechas
            items = conn.execute(
                """
                SELECT
                    oi.*,
                    o.created_at,
                    STRFTIME('%W', o.created_at) as week_number,
                    STRFTIME('%Y', o.created_at) as year
                FROM order_items oi
                JOIN orders o ON o.id = oi.order_id
                WHERE DATE(o.created_at) BETWEEN ? AND ?
                ORDER BY o.created_at, oi.product_name
                """,
                (from_date, to_date),
            ).fetchall()

        # Agrupar por semana
        consolidation = {}
        for item in items:
            week_num = item["week_number"]
            year = item["year"]
            week_key = f"Semana {int(week_num):02d} ({year})"

            if week_key not in consolidation:
                consolidation[week_key] = {}

            product_name = item["product_name"]
            quantity = float(item["quantity"])
            # Usar actual_price si existe, sino estimated_price
            price = item["actual_price"] if item["actual_price"] is not None else item["estimated_price"]
            total = int(round(price * quantity))

            if product_name not in consolidation[week_key]:
                consolidation[week_key][product_name] = {
                    "cantidad": 0.0,
                    "precio_unitario": price,
                    "total": 0,
                }

            consolidation[week_key][product_name]["cantidad"] += quantity
            consolidation[week_key][product_name]["total"] += total

        return consolidation
