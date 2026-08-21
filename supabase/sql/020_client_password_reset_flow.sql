-- Client password reset flow for GitHub Pages + Supabase Auth.
-- Run after 017_admin_manual_clients.sql.

alter table public.clients
    add column if not exists must_reset_password boolean not null default false;

alter table public.clients
    add column if not exists password_reset_at timestamptz;

comment on column public.clients.must_reset_password
is 'When true, the client can sign in only to create a new password.';

comment on column public.clients.password_reset_at
is 'Timestamp of the last successful client password change after an admin reset.';

grant select, update on public.clients to authenticated;
