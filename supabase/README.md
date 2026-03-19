# Supabase para Verduleria Isa

Esta carpeta deja preparado el backend de datos para que la app use Supabase en lugar de SQLite local.

## Proyecto configurado

- Supabase URL: `https://pmhdlrbakqpmtulpxhwi.supabase.co`
- GitHub repo: `https://github.com/nmillana/VerduleriaIsa.git`

## Archivos

- `sql/001_schema.sql`: crea las tablas `admins`, `clients`, `products`, `orders` y `order_items`.
- `sql/002_seed_products.sql`: carga el catalogo inicial desde tu Excel actual.
- `sql/003_promote_admin.sql`: ya no crea admin; solo sirve para comprobar cuantos admins hay.
- `sql/004_service_role_grants.sql`: corrige permisos si Supabase devuelve `403 permission denied`.
- `.env.example`: variables necesarias para que la app apunte a Supabase.

## Como configurarlo en tu Supabase

1. Entra a `https://pmhdlrbakqpmtulpxhwi.supabase.co`.
2. Ve a `SQL Editor`.
3. Ejecuta `sql/001_schema.sql`.
4. Ejecuta `sql/002_seed_products.sql`.
5. Si las tablas ya existian o aparece `403 permission denied`, ejecuta `sql/004_service_role_grants.sql`.
6. En el proyecto local, usa un archivo `.env` con `VERDULERIA_BACKEND=supabase`, tu `SUPABASE_URL` y tu `SUPABASE_SERVICE_ROLE_KEY`.
7. Inicia la app y crea tu admin desde `/admin/setup`.

## Como funciona ahora

- La app sigue siendo server-side.
- El servidor usa la `service role key` para leer y escribir en Supabase.
- Esa clave debe quedarse solo en el backend, nunca en el frontend publico.
- Si Supabase responde `permission denied for table products`, corre `sql/004_service_role_grants.sql` y vuelve a probar.
- Las clientas, pedidos y productos ya no dependen de `data/verduleria.sqlite3` si la app arranca con Supabase activo.

## Importar catalogo

Con `.env` configurado, este comando tambien actualiza Supabase:

`py scripts/import_catalog_from_excel.py "C:\ruta\archivo.xlsx" --deactivate-missing`

## Nota importante

El login de clientas sigue siendo solo con correo porque asi esta construido el MVP actual. Para una publicacion abierta al publico te recomiendo migrarlo luego a codigo por correo o magic link.
