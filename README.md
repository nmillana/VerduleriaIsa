# Verduleria Isa

Aplicacion para registrar clientas, tomar pedidos semanales, repetir compras anteriores, ajustar precios reales y revisar dashboards simples.

## Backend de datos

La app puede trabajar de dos formas:

- `Supabase`, si existe un `.env` con `VERDULERIA_BACKEND=supabase` y las claves necesarias.
- `SQLite` local, si no hay configuracion de Supabase.

## Donde quedan los datos

- En modo local: `data/verduleria.sqlite3`
- En modo Supabase: `https://keqqojqcnqporvgsaqby.supabase.co`
- Clave de sesiones local: `data/session.secret`
- Variables privadas locales: `.env` y no se sube al repo

## Ejecutar localmente

1. Abre una terminal en `C:\Verduleria\Test`
2. Si usaras Supabase, ejecuta primero los SQL de `supabase/sql/`
3. Ejecuta `py app.py`
4. Abre `http://127.0.0.1:8000`
5. Si no hay admin, crealo desde `/admin/setup`

## Que incluye este MVP

- Registro de clientas con nombre, correo, telefono y direccion
- Ingreso de clientas usando solo correo
- Pedido nuevo con catalogo agrupado por frutas y verduras
- Repetir pedido anterior y editar cantidades
- Historial con desglose semanal y gasto mensual
- Login seguro de administradora con contrasena hasheada
- Gestion manual de productos y precios estimados
- Ajuste de precios reales y notas por faltantes al comprar
- Dashboard de ingresos mensuales y top 5 de productos mas y menos pedidos

## Importar un nuevo Excel semanal

Puedes actualizar el catalogo con:

`py scripts/import_catalog_from_excel.py "C:\ruta\archivo.xlsx" --deactivate-missing`

Si el `.env` apunta a Supabase, el catalogo se actualiza alli. Si no, se actualiza SQLite local.

## Preparacion de Supabase

- `supabase/sql/001_schema.sql`
- `supabase/sql/002_seed_products.sql`
- `supabase/sql/003_promote_admin.sql`
- `supabase/sql/004_service_role_grants.sql`
- `supabase/README.md`
- `supabase/.env.example`

Si Supabase devuelve `403 permission denied`, ejecuta `supabase/sql/004_service_role_grants.sql` en el `SQL Editor`.

## GitHub y despliegue

Repo objetivo:

- `https://github.com/nmillana/VerduleriaIsa.git`

El backend Python ya quedó preparado para despliegue tradicional con estos archivos:

- `requirements.txt`
- `wsgi.py`
- `render.yaml`
- `.env.example`

Ademas, el repo ahora incluye una version estatica para GitHub Pages dentro de `docs/`.

### Version GitHub Pages

Esta version ya no depende del backend Flask y usa:

- `Supabase Auth` para login de clientas y administracion
- `RLS` para permisos por usuario
- `docs/index.html` como SPA estatica
- `docs/static/config.js` para `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- `docs/static/product-images/` para las ilustraciones visuales del catálogo
- `supabase/sql/009_github_pages_auth.sql` para enlazar `auth.users` con `clients` y `admins`
- `supabase/sql/010_secure_order_creation.sql` para crear pedidos con una RPC transaccional y totales calculados en Supabase
- `supabase/sql/011_admin_first_login_setup.sql` para preparar administradoras y obligar cambio de clave temporal
- `supabase/sql/012_catalog_units_other_request.sql` para actualizar el catalogo desde `Lista de frutas y verduras 01-08-2026.xlsx`, agregar unidad/kg y permitir el campo `Otro`

Pasos:

1. Completa `docs/static/config.js` con tu `SUPABASE_ANON_KEY`
2. Ejecuta `supabase/sql/009_github_pages_auth.sql` en Supabase
3. Crea en `Authentication > Users` los usuarios `isabelsoledadster@gmail.com` y `nataliamillanassler@gmail.com` con la clave temporal acordada
4. Ejecuta `supabase/sql/011_admin_first_login_setup.sql` en Supabase
5. Ejecuta `supabase/sql/012_catalog_units_other_request.sql` en Supabase
6. Publica GitHub Pages apuntando a la carpeta `docs/`

En el SQL Editor debes abrir el archivo `.sql`, copiar todo su contenido y pegarlo en Supabase. No pegues solo la ruta como `supabase/sql/012_catalog_units_other_request.sql`, porque Supabase lo interpreta como SQL y devuelve error de sintaxis.

### Importante sobre el login

- La version Flask antigua dejaba entrar a clientas solo con correo.
- La version GitHub Pages cambia eso a `correo + contraseña`, porque en un frontend publico no se puede seguir usando la `service role key`.

### Si prefieres mantener el backend

GitHub Pages no ejecuta Python. Si quieres conservar la app server-side actual tal como estaba, despliegala en un hosting compatible, por ejemplo Render, usando `render.yaml`.

## Nota de seguridad

La `SUPABASE_SERVICE_ROLE_KEY` debe quedar solo en variables privadas del servidor. No la expongas en codigo cliente ni en archivos versionados. En GitHub Pages, la clienta crea pedidos llamando `create_secure_order`; no vuelvas a habilitar inserts directos desde el navegador sobre `orders` u `order_items`.
