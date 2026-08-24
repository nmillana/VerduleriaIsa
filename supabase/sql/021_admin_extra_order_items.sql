-- Admin post-order manual order items.
-- Run after 020_client_password_reset_flow.sql.

alter table public.order_items
    alter column product_id drop not null;

grant insert on public.order_items to authenticated;
grant usage, select on all sequences in schema public to authenticated;

drop policy if exists order_items_admin_insert_manual on public.order_items;
create policy order_items_admin_insert_manual
on public.order_items
for insert
to authenticated
with check (
    (select private.is_admin_user())
    and product_id is null
    and order_id in (select id from public.orders)
    and length(trim(product_name)) between 1 and 120
    and quantity > 0
    and estimated_price >= 0
    and estimated_total >= 0
    and actual_price is not null
    and actual_price >= 0
    and actual_total is not null
    and actual_total >= 0
    and requested_unit in ('unidad', 'kg')
);

comment on policy order_items_admin_insert_manual on public.order_items
is 'Administradoras pueden agregar lineas manuales post pedido al ajustar valores reales.';

comment on column public.order_items.product_id
is 'Producto de catalogo. Puede ser null solo en lineas manuales post pedido agregadas por administracion.';

-- Verification:
-- select is_nullable from information_schema.columns where table_schema = 'public' and table_name = 'order_items' and column_name = 'product_id';
-- select policyname from pg_policies where schemaname = 'public' and tablename = 'order_items' and policyname = 'order_items_admin_insert_manual';
