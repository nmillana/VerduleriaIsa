-- GitHub Pages + Supabase Auth + RLS
-- Esta migracion mueve la seguridad al lado de Supabase para que la app
-- pueda vivir en un frontend estatico sin exponer la service role key.

create schema if not exists private;

alter table public.admins
    add column if not exists auth_user_id uuid references auth.users(id) on delete set null;

alter table public.clients
    add column if not exists auth_user_id uuid references auth.users(id) on delete set null;

create unique index if not exists idx_admins_auth_user_id on public.admins(auth_user_id);
create unique index if not exists idx_clients_auth_user_id on public.clients(auth_user_id);

comment on column public.admins.auth_user_id is 'Usuario de Supabase Auth ligado al admin.';
comment on column public.clients.auth_user_id is 'Usuario de Supabase Auth ligado a la clienta.';

create or replace function private.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.admins
        where auth_user_id = (select auth.uid())
    );
$$;

grant usage on schema public to anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.is_admin_user() to authenticated;

grant usage, select on all sequences in schema public to authenticated;

grant select on public.products to anon, authenticated;
grant select, insert, update on public.products to authenticated;
grant select, update on public.admins to authenticated;
grant select, insert, update on public.clients to authenticated;
grant select, insert, update on public.orders to authenticated;
grant select, insert, update on public.order_items to authenticated;

alter table public.products enable row level security;
alter table public.admins enable row level security;
alter table public.clients enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "products_public_select" on public.products;
drop policy if exists "products_admin_select" on public.products;
drop policy if exists "products_admin_insert" on public.products;
drop policy if exists "products_admin_update" on public.products;

create policy "products_public_select"
on public.products
for select
to anon, authenticated
using (is_active = true);

create policy "products_admin_select"
on public.products
for select
to authenticated
using ((select private.is_admin_user()));

create policy "products_admin_insert"
on public.products
for insert
to authenticated
with check ((select private.is_admin_user()));

create policy "products_admin_update"
on public.products
for update
to authenticated
using ((select private.is_admin_user()))
with check ((select private.is_admin_user()));

drop policy if exists "admins_self_select" on public.admins;
drop policy if exists "admins_self_claim" on public.admins;

create policy "admins_self_select"
on public.admins
for select
to authenticated
using (
    auth_user_id = (select auth.uid())
    or (
        auth_user_id is null
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
);

create policy "admins_self_claim"
on public.admins
for update
to authenticated
using (
    auth_user_id = (select auth.uid())
    or (
        auth_user_id is null
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
)
with check (
    auth_user_id = (select auth.uid())
    and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
);

drop policy if exists "clients_self_or_admin_select" on public.clients;
drop policy if exists "clients_self_insert" on public.clients;
drop policy if exists "clients_self_or_admin_update" on public.clients;

create policy "clients_self_or_admin_select"
on public.clients
for select
to authenticated
using (
    auth_user_id = (select auth.uid())
    or (
        auth_user_id is null
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
    or (select private.is_admin_user())
);

create policy "clients_self_insert"
on public.clients
for insert
to authenticated
with check (
    auth_user_id = (select auth.uid())
    and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
);

create policy "clients_self_or_admin_update"
on public.clients
for update
to authenticated
using (
    auth_user_id = (select auth.uid())
    or (
        auth_user_id is null
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
    or (select private.is_admin_user())
)
with check (
    (select private.is_admin_user())
    or (
        auth_user_id = (select auth.uid())
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
);

drop policy if exists "orders_client_or_admin_select" on public.orders;
drop policy if exists "orders_client_insert" on public.orders;
drop policy if exists "orders_admin_update" on public.orders;

create policy "orders_client_or_admin_select"
on public.orders
for select
to authenticated
using (
    client_id in (
        select id
        from public.clients
        where auth_user_id = (select auth.uid())
    )
    or (select private.is_admin_user())
);

create policy "orders_client_insert"
on public.orders
for insert
to authenticated
with check (
    client_id in (
        select id
        from public.clients
        where auth_user_id = (select auth.uid())
    )
);

create policy "orders_admin_update"
on public.orders
for update
to authenticated
using ((select private.is_admin_user()))
with check ((select private.is_admin_user()));

drop policy if exists "order_items_client_or_admin_select" on public.order_items;
drop policy if exists "order_items_client_insert" on public.order_items;
drop policy if exists "order_items_admin_update" on public.order_items;

create policy "order_items_client_or_admin_select"
on public.order_items
for select
to authenticated
using (
    order_id in (
        select o.id
        from public.orders o
        join public.clients c on c.id = o.client_id
        where c.auth_user_id = (select auth.uid())
    )
    or (select private.is_admin_user())
);

create policy "order_items_client_insert"
on public.order_items
for insert
to authenticated
with check (
    order_id in (
        select o.id
        from public.orders o
        join public.clients c on c.id = o.client_id
        where c.auth_user_id = (select auth.uid())
    )
);

create policy "order_items_admin_update"
on public.order_items
for update
to authenticated
using ((select private.is_admin_user()))
with check ((select private.is_admin_user()));
