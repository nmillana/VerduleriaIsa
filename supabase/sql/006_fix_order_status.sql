-- Migración: Cambiar estados de pedidos
-- De: 'pendiente', 'comprado', 'cancelado'
-- A: 'pendiente', 'comprado', 'pagado'

-- Primero, actualizar any existing 'cancelado' a 'pendiente' (default)
UPDATE public.orders SET status = 'pendiente' WHERE status = 'cancelado';

-- Modificar constraint en tabla orders
ALTER TABLE public.orders
  DROP CONSTRAINT orders_status_check;

ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
  CHECK (status in ('pendiente', 'comprado', 'pagado'));

COMMENT ON COLUMN public.orders.status IS 'Estado del pedido: pendiente (nuevo), comprado (admin compró), pagado (cliente pagó)';
