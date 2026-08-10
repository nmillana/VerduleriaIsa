-- Admin-created manual clients.
-- Run after 016_admin_email_allowlist.sql.
-- Allows Isabel/Natalia admins to create client records without Supabase Auth access.

create schema if not exists private;

grant select, insert, update on public.clients to authenticated;
grant usage, select on all sequences in schema public to authenticated;

drop policy if exists clients_admin_insert on public.clients;
create policy clients_admin_insert
on public.clients
for insert
to authenticated
with check (
    (select private.is_admin_user())
    and auth_user_id is null
);

comment on policy clients_admin_insert on public.clients
is 'Administradoras permitidas pueden crear clientas manuales sin auth_user_id.';

-- Verification while logged in as Isabel/Natalia:
-- select private.is_admin_user() as admin_ok;
