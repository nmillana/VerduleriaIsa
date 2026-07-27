-- Secure order creation for the GitHub Pages frontend.
-- Run after 009_github_pages_auth.sql. This keeps order totals on Supabase,
-- not in browser-controlled inserts.

alter table public.orders
    add column if not exists client_note text;

comment on column public.orders.client_note is 'Observaciones enviadas por la clienta al crear el pedido.';

drop policy if exists "orders_client_insert" on public.orders;
drop policy if exists "order_items_client_insert" on public.order_items;

revoke insert on public.orders from anon, authenticated;
revoke insert on public.order_items from anon, authenticated;

create or replace function public.create_secure_order(
    p_items jsonb,
    p_source_order_id bigint default null,
    p_client_note text default null
)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_client_id bigint;
    v_order_id bigint;
    v_estimated_total integer;
    v_invalid_count integer;
    v_missing_count integer;
    v_item_count integer;
    v_client_note text;
begin
    if auth.uid() is null then
        raise exception 'Debes iniciar sesion para crear un pedido.';
    end if;

    select c.id
    into v_client_id
    from public.clients c
    where c.auth_user_id = auth.uid()
    limit 1;

    if v_client_id is null then
        raise exception 'No hay una clienta asociada a esta sesion.';
    end if;

    if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
        raise exception 'Selecciona al menos un producto.';
    end if;

    if jsonb_array_length(p_items) > 150 then
        raise exception 'El pedido tiene demasiadas lineas.';
    end if;

    if p_source_order_id is not null and not exists (
        select 1
        from public.orders o
        where o.id = p_source_order_id
          and o.client_id = v_client_id
    ) then
        raise exception 'El pedido de origen no pertenece a esta clienta.';
    end if;

    drop table if exists pg_temp.secure_order_raw;
    drop table if exists pg_temp.secure_order_request;

    create temp table secure_order_raw (
        product_id bigint,
        quantity numeric
    ) on commit drop;

    insert into secure_order_raw (product_id, quantity)
    select product_id, quantity
    from jsonb_to_recordset(p_items) as item(product_id bigint, quantity numeric);

    select count(*)
    into v_invalid_count
    from secure_order_raw
    where product_id is null
       or quantity is null
       or quantity <= 0
       or quantity > 999
       or quantity <> round(quantity, 2);

    if v_invalid_count > 0 then
        raise exception 'El pedido contiene productos o cantidades invalidas.';
    end if;

    create temp table secure_order_request on commit drop as
    select product_id, sum(quantity)::numeric(10, 2) as quantity
    from secure_order_raw
    group by product_id;

    select count(*)
    into v_item_count
    from secure_order_request;

    if v_item_count = 0 then
        raise exception 'Selecciona al menos un producto.';
    end if;

    select count(*)
    into v_missing_count
    from secure_order_request r
    left join public.products p
        on p.id = r.product_id
       and p.is_active = true
    where p.id is null;

    if v_missing_count > 0 then
        raise exception 'Uno o mas productos no estan activos.';
    end if;

    select coalesce(sum(round(p.estimated_price * r.quantity)), 0)::integer
    into v_estimated_total
    from secure_order_request r
    join public.products p
      on p.id = r.product_id
     and p.is_active = true;

    if v_estimated_total <= 0 then
        raise exception 'No se pudo calcular el total del pedido.';
    end if;

    v_client_note := nullif(left(trim(coalesce(p_client_note, '')), 500), '');

    insert into public.orders (
        client_id,
        source_order_id,
        status,
        client_note,
        estimated_total
    ) values (
        v_client_id,
        p_source_order_id,
        'pendiente',
        v_client_note,
        v_estimated_total
    )
    returning id into v_order_id;

    insert into public.order_items (
        order_id,
        product_id,
        product_name,
        quantity,
        estimated_price,
        estimated_total
    )
    select
        v_order_id,
        p.id,
        p.name,
        r.quantity,
        p.estimated_price,
        round(p.estimated_price * r.quantity)::integer
    from secure_order_request r
    join public.products p
      on p.id = r.product_id
     and p.is_active = true
    order by p.name;

    return v_order_id;
end;
$$;

revoke all on function public.create_secure_order(jsonb, bigint, text) from public;
grant execute on function public.create_secure_order(jsonb, bigint, text) to authenticated;

comment on function public.create_secure_order(jsonb, bigint, text)
is 'Creates an order for the authenticated client using active product prices from Supabase.';