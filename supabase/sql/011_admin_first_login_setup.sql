-- Admin first-login setup for GitHub Pages.
-- Run after 009_github_pages_auth.sql and 010_secure_order_creation.sql.
-- Create the matching Auth users in Supabase Dashboard with the temporary
-- password, then run this migration to link and force password change.

alter table public.admins
    add column if not exists must_reset_password boolean not null default false;

alter table public.admins
    add column if not exists password_reset_at timestamptz;

comment on column public.admins.must_reset_password is 'Forces the admin to set a new password before opening the admin panel.';
comment on column public.admins.password_reset_at is 'Last time the admin completed the first-login password reset.';

with seed_admins(name, email) as (
    values
        ('Isabel', 'isabelsoledadster@gmail.com'),
        ('Natalia', 'nataliamillanassler@gmail.com')
), linked_admins as (
    select
        s.name,
        lower(s.email) as email,
        u.id as auth_user_id
    from seed_admins s
    left join auth.users u
      on lower(u.email) = lower(s.email)
)
insert into public.admins (
    name,
    email,
    password_salt,
    password_hash,
    auth_user_id,
    must_reset_password,
    password_reset_at
)
select
    name,
    email,
    'supabase-auth',
    'supabase-auth',
    auth_user_id,
    true,
    null
from linked_admins
on conflict (email) do update
set
    name = excluded.name,
    auth_user_id = coalesce(excluded.auth_user_id, public.admins.auth_user_id),
    must_reset_password = true,
    password_reset_at = null;

-- Verification query after running this file:
-- select id, name, email, auth_user_id, must_reset_password
-- from public.admins
-- where email in ('isabelsoledadster@gmail.com', 'nataliamillanassler@gmail.com')
-- order by email;