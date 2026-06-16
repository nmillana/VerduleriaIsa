-- GitHub Pages + Supabase Auth
-- Permite recuperar el vínculo cuando el correo sigue siendo el mismo,
-- pero el auth_user_id quedó apuntando a un usuario antiguo de Auth.

drop policy if exists "admins_self_select" on public.admins;
drop policy if exists "admins_self_claim" on public.admins;

create policy "admins_self_select"
on public.admins
for select
to authenticated
using (
    auth_user_id = (select auth.uid())
    or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
);

create policy "admins_self_claim"
on public.admins
for update
to authenticated
using (
    auth_user_id = (select auth.uid())
    or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
)
with check (
    auth_user_id = (select auth.uid())
    and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
);

drop policy if exists "clients_self_or_admin_select" on public.clients;
drop policy if exists "clients_self_or_admin_update" on public.clients;

create policy "clients_self_or_admin_select"
on public.clients
for select
to authenticated
using (
    auth_user_id = (select auth.uid())
    or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    or (select private.is_admin_user())
);

create policy "clients_self_or_admin_update"
on public.clients
for update
to authenticated
using (
    auth_user_id = (select auth.uid())
    or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    or (select private.is_admin_user())
)
with check (
    (select private.is_admin_user())
    or (
        auth_user_id = (select auth.uid())
        and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
);
