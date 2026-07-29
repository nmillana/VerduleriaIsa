-- Product classification and presentation cleanup.
-- Run after 013_client_registration_repair.sql.

alter table public.products
    add column if not exists display_name text;

alter table public.products
    add column if not exists presentation text not null default '';

alter table public.products
    drop constraint if exists products_category_check;

with classification(legacy_name, display_name, presentation, category) as (
    values
        ('Chirimoya Kg', 'Chirimoya', '1 kg', 'frutas'),
        ('Frutillas Kg', 'Frutillas', '1 kg', 'frutas'),
        ('Kiwi Kg', 'Kiwi', '1 kg', 'frutas'),
        ('Mandarinas', 'Mandarinas', '1 kg', 'frutas'),
        ('Mango Unidad', 'Mango', 'Unidad', 'frutas'),
        ('Manzanas Pink Lady Kg', 'Manzanas Pink Lady', '1 kg', 'frutas'),
        ('Manzanas Fuji Kg', 'Manzanas Fuji', '1 kg', 'frutas'),
        ('Manzanas Verdes Kg', 'Manzanas Verdes', '1 kg', 'frutas'),
        ('Naranjas Kg', 'Naranjas', '1 kg', 'frutas'),
        ('Paltas Kg', 'Paltas', '1 kg', 'verduras_hortalizas'),
        ('Peras', 'Peras', '', 'frutas'),
        ('Piña Unidad', 'Piña', 'Unidad', 'frutas'),
        ('Piña Pelada', 'Piña', 'Pelada', 'frutas'),
        ('Plátanos Kg', 'Plátanos', '1 kg', 'frutas'),
        ('Uva sin pepa', 'Uvas sin pepa', '1 kg', 'frutas'),
        ('Acelga Paquete Grande', 'Acelga', 'Paquete grande', 'hojas_ensaladas'),
        ('Alcachofa', 'Alcachofa', '', 'verduras_hortalizas'),
        ('Ajo malla 5 unidades', 'Ajo', '5 unidades', 'verduras_hortalizas'),
        ('Beterraga Paquete 5 unidades', 'Betarraga', '5 unidades', 'verduras_hortalizas'),
        ('Brocolí Unidad', 'Brócoli', 'Unidad', 'verduras_hortalizas'),
        ('Brucelas 1/4', 'Bruselas', '250 g', 'verduras_hortalizas'),
        ('Brotes de Alfalfa Bandeja', 'Brotes de Alfalfa', 'Bandeja', 'hojas_ensaladas'),
        ('Camote Kg', 'Camote', '1 kg', 'verduras_hortalizas'),
        ('Cebolla morada Unidad', 'Cebolla Morada', 'Unidad', 'verduras_hortalizas'),
        ('Cebollas Kg', 'Cebollas', '1 kg', 'verduras_hortalizas'),
        ('champiñon 1/4', 'Champiñones', '250 g', 'verduras_hortalizas'),
        ('Coliflor Unidad', 'Coliflor', 'Unidad', 'verduras_hortalizas'),
        ('Choclo americano Unidad', 'Choclo Americano', 'Unidad', 'verduras_hortalizas'),
        ('Espinacas Paquete 1/2 Kg.', 'Espinacas', '500 g', 'hojas_ensaladas'),
        ('Lechuga Escarola Unidad', 'Lechuga escarola', 'Unidad', 'hojas_ensaladas'),
        ('Lechuga Costina', 'Lechuga costina', 'Unidad', 'hojas_ensaladas'),
        ('Lechuga Milanesa Unidad', 'Lechuga milanesa', 'Unidad', 'hojas_ensaladas'),
        ('Lechugas Española Unidad', 'Lechuga española', 'Unidad', 'hojas_ensaladas'),
        ('Lechugas Marina Unidad', 'Lechuga marina', 'Unidad', 'hojas_ensaladas'),
        ('Limones Kg', 'Limones', '1 kg', 'hierbas_alinos'),
        ('Mata de apio Unidad', 'Apio', 'Unidad', 'hojas_ensaladas'),
        ('Mizuna 1/4', 'Mizuna', '250 g', 'hojas_ensaladas'),
        ('Papas Kg', 'Papas', '1 kg', 'verduras_hortalizas'),
        ('Pepinos Unidad', 'Pepinos', 'Unidad', 'verduras_hortalizas'),
        ('Pimentón rojo Unidad', 'Pimentón rojo', 'Unidad', 'verduras_hortalizas'),
        ('Pimentón verde Unidad', 'Pimentón verde', 'Unidad', 'verduras_hortalizas'),
        ('Pimentón amarillo Unidad', 'Pimentón amarillo', 'Unidad', 'verduras_hortalizas'),
        ('Porotos verdes Kg', 'Porotos verdes', '1 kg', 'verduras_hortalizas'),
        ('Rabanos Paquete', 'Rábanos', 'Paquete', 'hojas_ensaladas'),
        ('Repollo Verde', 'Repollo verde', 'Unidad', 'verduras_hortalizas'),
        ('Repollo Morado', 'Repollo morado', 'Unidad', 'verduras_hortalizas'),
        ('Repollo Picado Bolsa', 'Repollo Picado', 'Bolsa', 'listos_cocinar'),
        ('Apio Picado Bolsa', 'Apio Picado', 'Bolsa', 'listos_cocinar'),
        ('Tomates Cherry 1/4 Kg', 'Tomate cherry', '250 g', 'verduras_hortalizas'),
        ('Tomates Kg', 'Tomates', '1 kg', 'verduras_hortalizas'),
        ('Zanahorias Kg', 'Zanahorias', '1 kg', 'verduras_hortalizas'),
        ('Zapallo Camote Trozo 1/2 Kilo', 'Zapallo Camote', '500 g', 'verduras_hortalizas'),
        ('Zapallos italianos Unidad', 'Zapallos Italianos', 'Unidad', 'verduras_hortalizas'),
        ('Zapallo Butternut (unidad)', 'Zapallo Butternut', 'Unidad', 'verduras_hortalizas'),
        ('Champiñones picados', 'Champiñones picados', 'Bolsa', 'listos_cocinar'),
        ('Bolsa de Cazuela (Trozo de zapallo amarillo, Italiano, zanahoria, pimentón, poroto verde, choclo para 3 personasa)', 'Bolsa de cazuela', 'Bolsa', 'listos_cocinar'),
        ('Carbonada (Zapallo amarillo, italiano, zanahoria y espinaca)', 'Carbonada', 'Bolsa', 'listos_cocinar'),
        ('Porotos verdes picados (bandeja con 200grs. Aprox.)', 'Porotos verdes picados', 'Bandeja 200 g aprox.', 'listos_cocinar'),
        ('Arverjas desgranadas 130 grs.', 'Arvejas desgranadas', '130 g', 'listos_cocinar'),
        ('Habas desgranadas 130 grs.', 'Habas desgranadas', '130 g', 'listos_cocinar'),
        ('Chapsui de verduras', 'Chapsui de verduras', 'Bolsa', 'listos_cocinar'),
        ('Mongoliana (Dientes de dragon, Cebollín, Pimentón y Champiñon)', 'Mongoliana', 'Bolsa', 'listos_cocinar'),
        ('Dientes de dragón', 'Dientes de dragón', 'Bolsa', 'listos_cocinar'),
        ('Ají verde Unidad', 'Ají Verde', 'Unidad', 'hierbas_alinos'),
        ('Cebollín 3 unidades', 'Cebollín', '3 unidades', 'hierbas_alinos'),
        ('Ciboulette', 'Ciboulette', '', 'hierbas_alinos'),
        ('Cilantro', 'Cilantro', '', 'hierbas_alinos'),
        ('Perejil', 'Perejil', '', 'hierbas_alinos'),
        ('Puerros Unidad', 'Puerros', 'Unidad', 'hierbas_alinos'),
        ('Garbanzos 1/2', 'Garbanzos', '500 g', 'legumbres_frutos_aceitunas'),
        ('Lentejas 1/2', 'Lentejas', '500 g', 'legumbres_frutos_aceitunas'),
        ('Piñones Kg.', 'Piñones', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Poroto Burro 1/2', 'Poroto burro', '500 g', 'legumbres_frutos_aceitunas'),
        ('Poroto Pelado 1/2', 'Poroto pelado', '500 g', 'legumbres_frutos_aceitunas'),
        ('Poroto Payar 1/2', 'Poroto payar', '500 g', 'legumbres_frutos_aceitunas'),
        ('Aceitunas (1/2 Kilo)', 'Aceitunas', '500 g', 'legumbres_frutos_aceitunas'),
        ('Aceitunas Moradas Amargas (1/2 Kilo)', 'Aceitunas moradas amargas', '500 g', 'legumbres_frutos_aceitunas'),
        ('Aceitunas Verdes (1/2)', 'Aceitunas verdes', '500 g', 'legumbres_frutos_aceitunas'),
        ('Alemendras Confitadas 100 grs.', 'Almendras confitadas', '100 g', 'legumbres_frutos_aceitunas'),
        ('Almendras 500grs.', 'Almendras', '500 g', 'legumbres_frutos_aceitunas'),
        ('Nueces 500 grs.', 'Nueces', '500 g', 'legumbres_frutos_aceitunas'),
        ('Maní Tostado 250 grs.', 'Maní tostado', '250 g', 'legumbres_frutos_aceitunas'),
        ('Maní Confitado 250 grs.', 'Maní confitado', '250 g', 'legumbres_frutos_aceitunas'),
        ('Bolsas de basura Municipal 10 Unidades', 'Bolsas de basura municipal', '10 unidades', 'huevos_despensa'),
        ('Cebolla en escabeche 500 grs.', 'Cebolla en escabeche', '500 g', 'huevos_despensa'),
        ('Genjibre 100 grs.', 'Jengibre', '100 g', 'hierbas_alinos'),
        ('Huevos de Codorniz 24 Unidades', 'Huevos de codorniz', '24 unidades', 'huevos_despensa'),
        ('Huevos blancos extra unidad', 'Huevos blancos extra', 'Unidad', 'huevos_despensa'),
        ('Huevos de campo 12 unidaes', 'Huevos de campo', '12 unidades', 'huevos_despensa'),
        ('Huevos de color extra (c/u)', 'Huevos de color extra', 'Unidad', 'huevos_despensa'),
        ('Huevos de color super extra (c/u)', 'Huevos de color super extra', 'Unidad', 'huevos_despensa'),
        ('Huevos Jumbo (c/u)', 'Huevos jumbo', 'Unidad', 'huevos_despensa'),
        ('Locos Cocidos (2 a 3 unidades)', 'Locos cocidos', '2 a 3 unidades', 'huevos_despensa'),
        ('Mermelada 420 grs. Mora', 'Mermelada de mora', '420 g', 'huevos_despensa'),
        ('Mermelada 420 grs. Damásco', 'Mermelada de damasco', '420 g', 'huevos_despensa'),
        ('Mermelada 420 grs. Frutilla', 'Mermelada de frutilla', '420 g', 'huevos_despensa'),
        ('Mermelada 420 grs. Papaya', 'Mermelada de papaya', '420 g', 'huevos_despensa'),
        ('Miel Kg', 'Miel', '1 kg', 'huevos_despensa'),
        ('Miel 500 grs.', 'Miel', '500 g', 'huevos_despensa'),
        ('Queque Casero', 'Queque casero', 'Unidad', 'huevos_despensa'),
        ('Alfajor Oreo Manjar', 'Alfajor Oreo Manjar', 'Unidad', 'huevos_despensa'),
        ('Alfajor Frambuesa Manjar', 'Alfajor Frambuesa Manjar', 'Unidad', 'huevos_despensa'),
        ('Alfajor Bon o bon', 'Alfajor Bon o Bon', 'Unidad', 'huevos_despensa'),
        ('Alfajor Manjar', 'Alfajor Manjar', 'Unidad', 'huevos_despensa'),
        ('Cuchufli 4*1000', 'Cuchuflí', '4 unidades', 'huevos_despensa'),
        ('Arándanos 1/4', 'Arándanos', '250 g', 'frutas'),
        ('Ciruelas', 'Ciruelas', '', 'frutas'),
        ('Durazno Nectarin Kg', 'Durazno nectarín', '1 kg', 'frutas'),
        ('Durazno Plátano Kg', 'Durazno plátano', '1 kg', 'frutas'),
        ('Frambuesas 1/4', 'Frambuesas', '250 g', 'frutas'),
        ('Manzanas Roja Kg', 'Manzanas rojas', '1 kg', 'frutas'),
        ('Melón Tuna', 'Melón Tuna', '', 'frutas'),
        ('Pepino dulce Kg', 'Pepino dulce', '1 kg', 'frutas'),
        ('Sandía x Trozo (Precio x Kg)', 'Sandía por trozo', '1 kg', 'frutas'),
        ('Tunas Kg', 'Tunas', '1 kg', 'frutas'),
        ('Bolsa de Porotos granados', 'Porotos granados', 'Bolsa', 'verduras_hortalizas'),
        ('Cebollas Nuevas Kg', 'Cebollas Nuevas', '1 kg', 'verduras_hortalizas'),
        ('Choclo Grande', 'Choclo Grande', '', 'verduras_hortalizas'),
        ('Espinacas Kg', 'Espinacas', '1 kg', 'hojas_ensaladas'),
        ('Mata de Acelga', 'Acelga', 'Mata', 'hojas_ensaladas'),
        ('Porotos Granados Kg', 'Porotos granados', '1 kg', 'verduras_hortalizas'),
        ('Repollo Unidad', 'Repollo', 'Unidad', 'verduras_hortalizas'),
        ('Zapallo Camote 1/2', 'Zapallo Camote', '500 g', 'verduras_hortalizas'),
        ('Albahaca Mata', 'Albahaca', 'Mata', 'hierbas_alinos'),
        ('Garbanzos Kg', 'Garbanzos', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Genjibre (100 grs.)', 'Jengibre', '100 g', 'hierbas_alinos'),
        ('Huevos de color extra (Unidad)', 'Huevos de color extra', 'Unidad', 'huevos_despensa'),
        ('Huevos Jumbo (Unidad)', 'Huevos jumbo', 'Unidad', 'huevos_despensa'),
        ('Lentejas Kg', 'Lentejas', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Longanizas Ahumadas (Al vacío Kg)', 'Longanizas ahumadas', '1 kg', 'huevos_despensa'),
        ('Mermeladas 420 grs. Hermanas de Quilvo 100% caseras. 2*11.000', 'Mermeladas Hermanas de Quilvo', '420 g', 'huevos_despensa'),
        ('Poroto Burro Kg', 'Poroto burro', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Poroto Payar Kg', 'Poroto payar', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Poroto Pelado Kg', 'Poroto pelado', '1 kg', 'legumbres_frutos_aceitunas'),
        ('Pulpa de Tomate 370 grs. Hermanas de Quilvo 100% caseras. 2*6000', 'Pulpa de tomate Hermanas de Quilvo', '370 g', 'huevos_despensa')
)
update public.products p
set
    display_name = c.display_name,
    presentation = c.presentation,
    category = c.category,
    updated_at = timezone('utc', now())
from classification c
where lower(trim(p.name)) = lower(trim(c.legacy_name));

update public.products
set
    display_name = coalesce(nullif(display_name, ''), name),
    category = case
        when category in ('frutas', 'verduras_hortalizas', 'hojas_ensaladas', 'hierbas_alinos', 'listos_cocinar', 'legumbres_frutos_aceitunas', 'huevos_despensa') then category
        when category = 'frutas' then 'frutas'
        when category = 'verduras' then 'verduras_hortalizas'
        when category = 'hierbas y complementos' then 'hierbas_alinos'
        when category = 'legumbres y otros' then 'huevos_despensa'
        else 'huevos_despensa'
    end,
    updated_at = timezone('utc', now())
where display_name is null
   or display_name = ''
   or category not in ('frutas', 'verduras_hortalizas', 'hojas_ensaladas', 'hierbas_alinos', 'listos_cocinar', 'legumbres_frutos_aceitunas', 'huevos_despensa');

alter table public.products
    add constraint products_category_check
    check (category in ('frutas', 'verduras_hortalizas', 'hojas_ensaladas', 'hierbas_alinos', 'listos_cocinar', 'legumbres_frutos_aceitunas', 'huevos_despensa'));

comment on column public.products.display_name is 'Nombre visible y limpio para clientas y pedidos nuevos.';
comment on column public.products.presentation is 'Formato de venta visible, por ejemplo 1 kg, Unidad, 250 g o 12 unidades.';

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



-- Verification:
-- select category, count(*) from public.products group by category order by category;
-- select name, display_name, presentation, category from public.products order by category, display_name;
