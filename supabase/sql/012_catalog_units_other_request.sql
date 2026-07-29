-- Weekly catalog, unit selection and custom requests for GitHub Pages.
-- Generated from: Lista de frutas y verduras 01-08-2026.xlsx
-- Run in Supabase SQL Editor after 009_github_pages_auth.sql.

alter table public.orders
    add column if not exists client_note text;

alter table public.orders
    add column if not exists other_request text;

alter table public.order_items
    add column if not exists requested_unit text not null default 'unidad';

alter table public.order_items
    drop constraint if exists order_items_requested_unit_check;

alter table public.order_items
    add constraint order_items_requested_unit_check
    check (requested_unit in ('unidad', 'kg'));

comment on column public.orders.client_note is 'Observaciones enviadas por la clienta al crear el pedido.';
comment on column public.orders.other_request is 'Texto libre para pedir algo que no aparece en el catalogo activo.';
comment on column public.order_items.requested_unit is 'Unidad elegida por la clienta para la linea: unidad o kg.';

drop policy if exists "orders_client_insert" on public.orders;
drop policy if exists "order_items_client_insert" on public.order_items;

revoke insert on public.orders from anon, authenticated;
revoke insert on public.order_items from anon, authenticated;

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
        coalesce(nullif(lower(trim(requested_unit)), ''), 'unidad')
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
        p.name,
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
is 'Creates an order using active product prices, requested units and optional custom request text.';

with catalog(name, category, estimated_price) as (
    values
        ('Chirimoya Kg', 'frutas', 6900),
        ('Frutillas Kg', 'frutas', 5990),
        ('Kiwi Kg', 'frutas', 1590),
        ('Mandarinas', 'frutas', 1490),
        ('Mango Unidad', 'frutas', 1990),
        ('Manzanas Pink Lady Kg', 'frutas', 1490),
        ('Manzanas Fuji Kg', 'frutas', 1490),
        ('Manzanas Verdes Kg', 'frutas', 1490),
        ('Naranjas Kg', 'frutas', 1490),
        ('Paltas Kg', 'frutas', 4390),
        ('Peras', 'frutas', 1490),
        ('Piña Unidad', 'frutas', 3500),
        ('Piña Pelada', 'frutas', 4000),
        ('Plátanos Kg', 'frutas', 1590),
        ('Uva sin pepa', 'frutas', 2990),
        ('Acelga Paquete Grande', 'verduras', 1500),
        ('Alcachofa', 'verduras', 990),
        ('Ajo malla 5 unidades', 'verduras', 1200),
        ('Beterraga Paquete 5 unidades', 'verduras', 1490),
        ('Brocolí Unidad', 'verduras', 1390),
        ('Brucelas 1/4', 'verduras', 1500),
        ('Brotes de Alfalfa Bandeja', 'verduras', 1600),
        ('Camote Kg', 'verduras', 2490),
        ('Cebolla morada Unidad', 'verduras', 350),
        ('Cebollas Kg', 'verduras', 1200),
        ('champiñon 1/4', 'verduras', 2000),
        ('Coliflor Unidad', 'verduras', 1300),
        ('Choclo americano Unidad', 'verduras', 1200),
        ('Espinacas Paquete 1/2 Kg.', 'verduras', 1400),
        ('Lechuga Escarola Unidad', 'verduras', 1290),
        ('Lechuga Costina', 'verduras', 1490),
        ('Lechuga Milanesa Unidad', 'verduras', 650),
        ('Lechugas Española Unidad', 'verduras', 1290),
        ('Lechugas Marina Unidad', 'verduras', 1290),
        ('Limones Kg', 'verduras', 790),
        ('Mata de apio Unidad', 'verduras', 1590),
        ('Mizuna 1/4', 'verduras', 1790),
        ('Papas Kg', 'verduras', 1200),
        ('Pepinos Unidad', 'verduras', 600),
        ('Pimentón rojo Unidad', 'verduras', 400),
        ('Pimentón verde Unidad', 'verduras', 350),
        ('Pimentón amarillo Unidad', 'verduras', 990),
        ('Porotos verdes Kg', 'verduras', 3300),
        ('Rabanos Paquete', 'verduras', 1300),
        ('Repollo Verde', 'verduras', 3300),
        ('Repollo Morado', 'verduras', 1500),
        ('Repollo Picado Bolsa', 'verduras', 1000),
        ('Apio Picado Bolsa', 'verduras', 1000),
        ('Tomates Cherry 1/4 Kg', 'verduras', 1200),
        ('Tomates Kg', 'verduras', 1590),
        ('Zanahorias Kg', 'verduras', 1500),
        ('Zapallo Camote Trozo 1/2 Kilo', 'verduras', 1500),
        ('Zapallos italianos Unidad', 'verduras', 890),
        ('Zapallo Butternut (unidad)', 'verduras', 3490),
        ('Champiñones picados', 'verduras', 1500),
        ('Bolsa de Cazuela (Trozo de zapallo amarillo, Italiano, zanahoria, pimentón, poroto verde, choclo para 3 personasa)', 'verduras', 1500),
        ('Carbonada (Zapallo amarillo, italiano, zanahoria y espinaca)', 'verduras', 1500),
        ('Porotos verdes picados (bandeja con 200grs. Aprox.)', 'verduras', 1500),
        ('Arverjas desgranadas 130 grs.', 'verduras', 1300),
        ('Habas desgranadas 130 grs.', 'verduras', 1500),
        ('Chapsui de verduras', 'verduras', 1500),
        ('Mongoliana (Dientes de dragon, Cebollín, Pimentón y Champiñon)', 'verduras', 1500),
        ('Dientes de dragón', 'verduras', 1500),
        ('Ají verde Unidad', 'hierbas y complementos', 200),
        ('Cebollín 3 unidades', 'hierbas y complementos', 990),
        ('Ciboulette', 'hierbas y complementos', 600),
        ('Cilantro', 'hierbas y complementos', 990),
        ('Perejil', 'hierbas y complementos', 790),
        ('Puerros Unidad', 'hierbas y complementos', 1200),
        ('Garbanzos 1/2', 'legumbres y otros', 1500),
        ('Lentejas 1/2', 'legumbres y otros', 1500),
        ('Piñones Kg.', 'legumbres y otros', 3000),
        ('Poroto Burro 1/2', 'legumbres y otros', 1800),
        ('Poroto Pelado 1/2', 'legumbres y otros', 1800),
        ('Poroto Payar 1/2', 'legumbres y otros', 1800),
        ('Aceitunas (1/2 Kilo)', 'legumbres y otros', 4500),
        ('Aceitunas Moradas Amargas (1/2 Kilo)', 'legumbres y otros', 4500),
        ('Aceitunas Verdes (1/2)', 'legumbres y otros', 4500),
        ('Alemendras Confitadas 100 grs.', 'legumbres y otros', 2500),
        ('Almendras 500grs.', 'legumbres y otros', 7000),
        ('Nueces 500 grs.', 'legumbres y otros', 6000),
        ('Maní Tostado 250 grs.', 'legumbres y otros', 1750),
        ('Maní Confitado 250 grs.', 'legumbres y otros', 2000),
        ('Bolsas de basura Municipal 10 Unidades', 'legumbres y otros', 2500),
        ('Cebolla en escabeche 500 grs.', 'legumbres y otros', 2000),
        ('Genjibre 100 grs.', 'legumbres y otros', 1000),
        ('Huevos de Codorniz 24 Unidades', 'legumbres y otros', 3200),
        ('Huevos blancos extra unidad', 'legumbres y otros', 260),
        ('Huevos de campo 12 unidaes', 'legumbres y otros', 4200),
        ('Huevos de color extra (c/u)', 'legumbres y otros', 300),
        ('Huevos de color super extra (c/u)', 'legumbres y otros', 340),
        ('Huevos Jumbo (c/u)', 'legumbres y otros', 430),
        ('Locos Cocidos (2 a 3 unidades)', 'legumbres y otros', 15000),
        ('Mermelada 420 grs. Mora', 'legumbres y otros', 6000),
        ('Mermelada 420 grs. Damásco', 'legumbres y otros', 6000),
        ('Mermelada 420 grs. Frutilla', 'legumbres y otros', 6000),
        ('Mermelada 420 grs. Papaya', 'legumbres y otros', 6000),
        ('Miel Kg', 'legumbres y otros', 8000),
        ('Miel 500 grs.', 'legumbres y otros', 4500),
        ('Queque Casero', 'legumbres y otros', 5000),
        ('Alfajor Oreo Manjar', 'legumbres y otros', 750),
        ('Alfajor Frambuesa Manjar', 'legumbres y otros', 750),
        ('Alfajor Bon o bon', 'legumbres y otros', 750),
        ('Alfajor Manjar', 'legumbres y otros', 750),
        ('Cuchufli 4*1000', 'legumbres y otros', 1000)
), updated as (
    update public.products p
    set
        category = c.category,
        estimated_price = c.estimated_price,
        is_active = true,
        updated_at = timezone('utc', now())
    from catalog c
    where lower(trim(p.name)) = lower(trim(c.name))
    returning p.id
), inserted as (
    insert into public.products (name, category, estimated_price, is_active)
    select c.name, c.category, c.estimated_price, true
    from catalog c
    where not exists (
        select 1
        from public.products p
        where lower(trim(p.name)) = lower(trim(c.name))
    )
    returning id
)
update public.products p
set is_active = false,
    updated_at = timezone('utc', now())
where not exists (
    select 1
    from catalog c
    where lower(trim(c.name)) = lower(trim(p.name))
);

-- Verification:
-- select count(*) filter (where is_active) as active_products,
--        count(*) filter (where not is_active) as inactive_products
-- from public.products;
