# Verduleria Isa

Aplicacion para registrar clientas, tomar pedidos semanales, repetir compras anteriores, ajustar precios reales y revisar dashboards simples.

## Backend de datos

La app puede trabajar de dos formas:

- `Supabase`, si existe un `.env` con `VERDULERIA_BACKEND=supabase` y las claves necesarias.
- `SQLite` local, si no hay configuracion de Supabase.

## Donde quedan los datos

- En modo local: `data/verduleria.sqlite3`
- En modo Supabase: `https://pmhdlrbakqpmtulpxhwi.supabase.co`
- Clave de sesiones local: `data/session.secret`
- Variables privadas locales: `.env` y no se sube al repo

## Ejecutar localmente

1. Abre una terminal en `c:\Test`
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

El proyecto ya quedo preparado para despliegue desde GitHub con estos archivos:

- `requirements.txt`
- `wsgi.py`
- `render.yaml`
- `.env.example`

GitHub Pages no puede correr este backend Python porque solo sirve contenido estatico. Para publicarla como pagina web real, deja el codigo en GitHub y desplegalo en un hosting Python compatible, por ejemplo Render, usando `render.yaml`.

## Nota de seguridad

La `SUPABASE_SERVICE_ROLE_KEY` debe quedar solo en variables privadas del servidor. No la expongas en codigo cliente ni en archivos versionados.
