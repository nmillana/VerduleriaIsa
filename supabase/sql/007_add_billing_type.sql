-- Migración: Agregar tipo de pago en clientes
-- Valores: 'semanal' (default) o 'mensual'

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS billing_type text NOT NULL DEFAULT 'semanal';

-- Agregar constraint para validar valores
ALTER TABLE public.clients
  ADD CONSTRAINT clients_billing_type_check
  CHECK (billing_type in ('semanal', 'mensual'));

COMMENT ON COLUMN public.clients.billing_type IS 'Tipo de pago del cliente: semanal (defecto) o mensual';

-- Crear índice para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_clients_billing_type
  ON public.clients(billing_type);
