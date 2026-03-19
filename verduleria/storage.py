from __future__ import annotations

import os
from pathlib import Path

from verduleria.database import Database
from verduleria.supabase_db import SupabaseDatabase


def create_database(base_dir: Path):
    backend = os.getenv("VERDULERIA_BACKEND", "").strip().lower()
    supabase_url = os.getenv("SUPABASE_URL", "").strip()
    supabase_service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "").strip()

    if backend == "sqlite":
        return Database(base_dir / "data" / "verduleria.sqlite3")

    if supabase_url and supabase_service_role_key:
        return SupabaseDatabase(
            url=supabase_url,
            service_role_key=supabase_service_role_key,
            anon_key=os.getenv("SUPABASE_ANON_KEY", "").strip(),
        )

    if backend == "supabase":
        raise RuntimeError(
            "Falta configurar SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en el archivo .env"
        )

    return Database(base_dir / "data" / "verduleria.sqlite3")
