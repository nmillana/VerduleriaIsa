-- Client registration repair for GitHub Pages + Supabase Auth.
-- Run after 009_github_pages_auth.sql and 012_catalog_units_other_request.sql.

alter table public.clients
    add column if not exists billing_type text not null default 'semanal';

alter table public.clients
    drop constraint if exists clients_billing_type_check;

alter table public.clients
    add constraint clients_billing_type_check
    check (billing_type in ('semanal', 'mensual'));

create index if not exists idx_clients_billing_type
    on public.clients(billing_type);

comment on column public.clients.billing_type is 'Tipo de pago de la clienta: semanal o mensual.';

create or replace function public.create_client_profile_from_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_email text;
    v_name text;
    v_phone text;
    v_address text;
    v_billing_type text;
begin
    if coalesce(new.raw_user_meta_data ->> 'role', '') <> 'client' then
        return new;
    end if;

    v_email := lower(trim(coalesce(new.email, '')));
    v_name := nullif(left(trim(coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'full_name', '')), 120), '');
    v_phone := nullif(left(trim(coalesce(new.raw_user_meta_data ->> 'phone', '')), 40), '');
    v_address := nullif(left(trim(coalesce(new.raw_user_meta_data ->> 'address', '')), 255), '');
    v_billing_type := case when new.raw_user_meta_data ->> 'billing_type' = 'mensual' then 'mensual' else 'semanal' end;

    if v_email = '' or v_name is null or v_phone is null or v_address is null then
        return new;
    end if;

    insert into public.clients (auth_user_id, name, email, phone, address, billing_type)
    values (new.id, v_name, v_email, v_phone, v_address, v_billing_type)
    on conflict (email) do update
        set auth_user_id = excluded.auth_user_id;

    return new;
end;
$$;

drop trigger if exists create_client_profile_after_auth_signup on auth.users;
create trigger create_client_profile_after_auth_signup
after insert on auth.users
for each row
execute function public.create_client_profile_from_auth_user();

insert into public.clients (auth_user_id, name, email, phone, address, billing_type)
select
    u.id,
    left(trim(coalesce(u.raw_user_meta_data ->> 'name', u.raw_user_meta_data ->> 'full_name', split_part(u.email, '@', 1))), 120) as name,
    lower(trim(u.email)) as email,
    left(trim(coalesce(u.raw_user_meta_data ->> 'phone', '')), 40) as phone,
    left(trim(coalesce(u.raw_user_meta_data ->> 'address', '')), 255) as address,
    case when u.raw_user_meta_data ->> 'billing_type' = 'mensual' then 'mensual' else 'semanal' end as billing_type
from auth.users u
where coalesce(u.raw_user_meta_data ->> 'role', '') = 'client'
  and u.email is not null
  and nullif(trim(coalesce(u.raw_user_meta_data ->> 'phone', '')), '') is not null
  and nullif(trim(coalesce(u.raw_user_meta_data ->> 'address', '')), '') is not null
on conflict (email) do update
    set auth_user_id = excluded.auth_user_id;
