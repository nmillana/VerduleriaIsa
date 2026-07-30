-- Restrict administrator access to the approved Verduleria Isa emails.
-- Run after 015_product_images_and_order_edit.sql.

create schema if not exists private;

create or replace function private.is_allowed_admin_email(p_email text)
returns boolean
language sql
immutable
as $$
    select lower(coalesce(p_email, '')) in (
        'isabelsoledadster@gmail.com',
        'nataliamillanassler@gmail.com'
    );
$$;

create or replace function private.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public, private
as $$
    select exists (
        select 1
        from public.admins
        where auth_user_id = (select auth.uid())
          and private.is_allowed_admin_email(email)
    );
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_allowed_admin_email(text) to authenticated;
grant execute on function private.is_admin_user() to authenticated;

drop policy if exists "admins_self_select" on public.admins;
drop policy if exists "admins_self_claim" on public.admins;

create policy "admins_self_select"
on public.admins
for select
to authenticated
using (
    private.is_allowed_admin_email(email)
    and (
        auth_user_id = (select auth.uid())
        or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
);

create policy "admins_self_claim"
on public.admins
for update
to authenticated
using (
    private.is_allowed_admin_email(email)
    and (
        auth_user_id = (select auth.uid())
        or lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
    )
)
with check (
    private.is_allowed_admin_email(email)
    and auth_user_id = (select auth.uid())
    and lower(email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
);

comment on function private.is_allowed_admin_email(text)
is 'Verduleria Isa administrator allowlist: Isabel and Natalia only.';

-- Verification:
-- select private.is_allowed_admin_email('isabelsoledadster@gmail.com') as isabel_ok,
--        private.is_allowed_admin_email('nataliamillanassler@gmail.com') as natalia_ok,
--        private.is_allowed_admin_email('otro@example.com') as other_blocked;
