-- Add pescados/mariscos as a supported product category.
-- Run after 017_admin_manual_clients.sql.

alter table public.products
    drop constraint if exists products_category_check;

alter table public.products
    add constraint products_category_check
    check (category in (
        'frutas',
        'verduras_hortalizas',
        'hojas_ensaladas',
        'hierbas_alinos',
        'listos_cocinar',
        'legumbres_frutos_aceitunas',
        'huevos_despensa',
        'pescados_mariscos'
    ));

comment on constraint products_category_check on public.products
is 'Supported catalog categories, including pescados/mariscos.';

-- Verification:
-- select conname, pg_get_constraintdef(oid)
-- from pg_constraint
-- where conrelid = 'public.products'::regclass
--   and conname = 'products_category_check';
