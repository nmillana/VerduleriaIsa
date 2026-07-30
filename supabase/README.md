# Supabase para Verduleria Isa

Esta carpeta deja preparado el backend de datos para que la app use Supabase en lugar de SQLite local.

## Proyecto configurado

- Supabase URL: `https://keqqojqcnqporvgsaqby.supabase.co`
- GitHub repo: `https://github.com/nmillana/VerduleriaIsa.git`

## Archivos

- `sql/001_schema.sql`: crea las tablas `admins`, `clients`, `products`, `orders` y `order_items`.
- `sql/002_seed_products.sql`: carga el catalogo inicial desde tu Excel actual.
- `sql/003_promote_admin.sql`: ya no crea admin; solo sirve para comprobar cuantos admins hay.
- `sql/004_service_role_grants.sql`: corrige permisos si Supabase devuelve `403 permission denied`.
- `sql/009_github_pages_auth.sql`: agrega `auth_user_id`, habilita RLS y deja la base lista para la version estatica en GitHub Pages.
- `sql/010_secure_order_creation.sql`: crea el flujo seguro de pedidos con totales calculados en Supabase.
- `sql/011_admin_first_login_setup.sql`: prepara administradoras y obliga cambio de clave temporal.
- `sql/012_catalog_units_other_request.sql`: actualiza el catalogo desde `Lista de frutas y verduras 01-08-2026.xlsx`, deja inactivos los productos ausentes, agrega unidad/kg y permite el campo `Otro`.
- `sql/013_client_registration_repair.sql`: repara registro de clientas con Supabase Auth + RLS.
- `sql/014_product_classification_presentation.sql`: limpia categorias visibles y presentaciones.
- `sql/015_product_images_and_order_edit.sql`: agrega fotos reales editables y permite editar pedidos pendientes.
- `sql/016_admin_email_allowlist.sql`: permite administración solo a `isabelsoledadster@gmail.com` y `nataliamillanassler@gmail.com`.
- `.env.example`: variables necesarias para que la app apunte a Supabase.

## Como configurarlo en tu Supabase

1. Entra a `https://keqqojqcnqporvgsaqby.supabase.co`.
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

## GitHub Pages

La carpeta `docs/` ahora contiene una version SPA estatica.

Para activarla:

1. Completa `docs/static/config.js` con `SUPABASE_URL` y `SUPABASE_ANON_KEY`
2. Ejecuta `sql/009_github_pages_auth.sql`
3. Crea en Supabase Auth las administradoras con el mismo correo que existe en la tabla `admins`
4. Ejecuta `sql/011_admin_first_login_setup.sql`
5. Ejecuta `sql/012_catalog_units_other_request.sql`
6. Ejecuta `sql/013_client_registration_repair.sql`
7. Ejecuta `sql/014_product_classification_presentation.sql`
8. Ejecuta `sql/015_product_images_and_order_edit.sql`
9. Ejecuta `sql/016_admin_email_allowlist.sql`

En el SQL Editor copia y pega el contenido completo del archivo `.sql`; no pegues solo la ruta del archivo.

Con eso la pagina estatica funciona con `Supabase Auth` + `RLS`, sin exponer la `SUPABASE_SERVICE_ROLE_KEY`.
