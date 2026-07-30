-- Product images and pending order editing.
-- Run after 014_product_classification_presentation.sql.

alter table public.products
    add column if not exists image_url text;

comment on column public.products.image_url is 'Editable real product image URL used by the static catalog. Leave null to use the public photo fallback.';

alter table public.order_items
    alter column requested_unit set default 'kg';

-- Keep new order creation aligned with the app default: kilograms unless the client explicitly picks unidad.
drop function if exists public.create_secure_order(jsonb, bigint, text);

create or replace function public.create_secure_order(
    p_items jsonb,
    p_source_order_id bigint default null,
    p_client_note text default null,
    p_other_request text default null
)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_client_id bigint;
    v_order_id bigint;
    v_estimated_total integer := 0;
    v_invalid_count integer;
    v_missing_count integer;
    v_item_count integer := 0;
    v_client_note text;
    v_other_request text;
    v_items jsonb;
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

    v_client_note := nullif(left(trim(coalesce(p_client_note, '')), 500), '');
    v_other_request := nullif(left(trim(coalesce(p_other_request, '')), 500), '');
    v_items := coalesce(p_items, '[]'::jsonb);

    if jsonb_typeof(v_items) <> 'array' then
        raise exception 'El pedido contiene productos invalidos.';
    end if;

    if jsonb_array_length(v_items) = 0 and v_other_request is null then
        raise exception 'Selecciona al menos un producto o completa el campo Otro.';
    end if;

    if jsonb_array_length(v_items) > 150 then
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
        quantity numeric,
        requested_unit text
    ) on commit drop;

    insert into secure_order_raw (product_id, quantity, requested_unit)
    select
        product_id,
        quantity,
        coalesce(nullif(lower(trim(requested_unit)), ''), 'kg')
    from jsonb_to_recordset(v_items) as item(product_id bigint, quantity numeric, requested_unit text);

    select count(*)
    into v_invalid_count
    from secure_order_raw
    where product_id is null
       or quantity is null
       or quantity <= 0
       or quantity > 999
       or quantity <> round(quantity, 2)
       or requested_unit not in ('unidad', 'kg');

    if v_invalid_count > 0 then
        raise exception 'El pedido contiene productos, cantidades o unidades invalidas.';
    end if;

    create temp table secure_order_request on commit drop as
    select product_id, requested_unit, sum(quantity)::numeric(10, 2) as quantity
    from secure_order_raw
    group by product_id, requested_unit;

    select count(*)
    into v_item_count
    from secure_order_request;

    if v_item_count > 0 then
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
    end if;

    insert into public.orders (
        client_id,
        source_order_id,
        status,
        client_note,
        other_request,
        estimated_total
    ) values (
        v_client_id,
        p_source_order_id,
        'pendiente',
        v_client_note,
        v_other_request,
        v_estimated_total
    )
    returning id into v_order_id;

    insert into public.order_items (
        order_id,
        product_id,
        product_name,
        quantity,
        requested_unit,
        estimated_price,
        estimated_total
    )
    select
        v_order_id,
        p.id,
        coalesce(nullif(p.display_name, ''), p.name),
        r.quantity,
        r.requested_unit,
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

revoke all on function public.create_secure_order(jsonb, bigint, text, text) from public;
grant execute on function public.create_secure_order(jsonb, bigint, text, text) to authenticated;

comment on function public.create_secure_order(jsonb, bigint, text, text)
is 'Creates an order using active product prices, requested units, display names and optional custom request text.';

drop function if exists public.replace_pending_order(bigint, jsonb, text, text);

create or replace function public.replace_pending_order(
    p_order_id bigint,
    p_items jsonb,
    p_client_note text default null,
    p_other_request text default null
)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_client_id bigint;
    v_estimated_total integer := 0;
    v_invalid_count integer;
    v_missing_count integer;
    v_item_count integer := 0;
    v_client_note text;
    v_other_request text;
    v_items jsonb;
begin
    if auth.uid() is null then
        raise exception 'Debes iniciar sesion para editar un pedido.';
    end if;

    select c.id
    into v_client_id
    from public.clients c
    where c.auth_user_id = auth.uid()
    limit 1;

    if v_client_id is null then
        raise exception 'No hay una clienta asociada a esta sesion.';
    end if;

    if not exists (
        select 1
        from public.orders o
        where o.id = p_order_id
          and o.client_id = v_client_id
          and o.status = 'pendiente'
    ) then
        raise exception 'Solo puedes editar pedidos pendientes de tu cuenta.';
    end if;

    v_client_note := nullif(left(trim(coalesce(p_client_note, '')), 500), '');
    v_other_request := nullif(left(trim(coalesce(p_other_request, '')), 500), '');
    v_items := coalesce(p_items, '[]'::jsonb);

    if jsonb_typeof(v_items) <> 'array' then
        raise exception 'El pedido contiene productos invalidos.';
    end if;

    if jsonb_array_length(v_items) = 0 and v_other_request is null then
        raise exception 'Selecciona al menos un producto o completa el campo Otro.';
    end if;

    if jsonb_array_length(v_items) > 150 then
        raise exception 'El pedido tiene demasiadas lineas.';
    end if;

    drop table if exists pg_temp.secure_order_raw;
    drop table if exists pg_temp.secure_order_request;

    create temp table secure_order_raw (
        product_id bigint,
        quantity numeric,
        requested_unit text
    ) on commit drop;

    insert into secure_order_raw (product_id, quantity, requested_unit)
    select
        product_id,
        quantity,
        coalesce(nullif(lower(trim(requested_unit)), ''), 'kg')
    from jsonb_to_recordset(v_items) as item(product_id bigint, quantity numeric, requested_unit text);

    select count(*)
    into v_invalid_count
    from secure_order_raw
    where product_id is null
       or quantity is null
       or quantity <= 0
       or quantity > 999
       or quantity <> round(quantity, 2)
       or requested_unit not in ('unidad', 'kg');

    if v_invalid_count > 0 then
        raise exception 'El pedido contiene productos, cantidades o unidades invalidas.';
    end if;

    create temp table secure_order_request on commit drop as
    select product_id, requested_unit, sum(quantity)::numeric(10, 2) as quantity
    from secure_order_raw
    group by product_id, requested_unit;

    select count(*)
    into v_item_count
    from secure_order_request;

    if v_item_count > 0 then
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
    end if;

    update public.orders
    set
        client_note = v_client_note,
        other_request = v_other_request,
        estimated_total = v_estimated_total,
        actual_total = null,
        admin_note = null,
        purchased_at = null,
        updated_at = timezone('utc', now())
    where id = p_order_id
      and client_id = v_client_id
      and status = 'pendiente';

    delete from public.order_items
    where order_id = p_order_id;

    insert into public.order_items (
        order_id,
        product_id,
        product_name,
        quantity,
        requested_unit,
        estimated_price,
        estimated_total
    )
    select
        p_order_id,
        p.id,
        coalesce(nullif(p.display_name, ''), p.name),
        r.quantity,
        r.requested_unit,
        p.estimated_price,
        round(p.estimated_price * r.quantity)::integer
    from secure_order_request r
    join public.products p
      on p.id = r.product_id
     and p.is_active = true
    order by p.name;

    return p_order_id;
end;
$$;

revoke all on function public.replace_pending_order(bigint, jsonb, text, text) from public;
grant execute on function public.replace_pending_order(bigint, jsonb, text, text) to authenticated;

comment on function public.replace_pending_order(bigint, jsonb, text, text)
is 'Replaces products and notes on a pending order owned by the logged-in client using current active product prices.';

-- Verification:
-- select column_name from information_schema.columns where table_schema = 'public' and table_name = 'products' and column_name = 'image_url';
-- select proname from pg_proc where proname = 'replace_pending_order';
