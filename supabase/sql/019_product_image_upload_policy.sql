-- Allow approved administrators to upload product images from the static app.
-- Run after 018_add_seafood_category.sql.
-- Requires an existing public Storage bucket named product-images.

grant select, insert, update on storage.objects to authenticated;

drop policy if exists product_images_admin_select on storage.objects;
drop policy if exists product_images_admin_insert on storage.objects;
drop policy if exists product_images_admin_update on storage.objects;

create policy product_images_admin_select
on storage.objects
for select
to authenticated
using (
    bucket_id = 'product-images'
    and (select private.is_admin_user())
);

create policy product_images_admin_insert
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'product-images'
    and (select private.is_admin_user())
    and lower(name) ~ '\.(jpg|jpeg|png|webp)$'
);

create policy product_images_admin_update
on storage.objects
for update
to authenticated
using (
    bucket_id = 'product-images'
    and (select private.is_admin_user())
)
with check (
    bucket_id = 'product-images'
    and (select private.is_admin_user())
    and lower(name) ~ '\.(jpg|jpeg|png|webp)$'
);

comment on policy product_images_admin_insert on storage.objects
is 'Verduleria Isa admins can upload JPG, PNG and WebP product images to product-images.';

-- Verification while logged in as Isabel/Natalia:
-- select private.is_admin_user() as admin_ok;
