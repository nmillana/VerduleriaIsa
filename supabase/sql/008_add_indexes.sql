-- Migración: Agregar índices para optimizar performance

-- Índice para buscar pedidos por estado de un cliente
CREATE INDEX IF NOT EXISTS idx_orders_client_status_created
  ON public.orders(client_id, status, created_at DESC);

-- Índice para buscar order_items rápidamente por producto y fecha
CREATE INDEX IF NOT EXISTS idx_order_items_product_created
  ON public.order_items(product_id, created_at DESC);

-- Índice para filtros de status en admin dashboard
CREATE INDEX IF NOT EXISTS idx_orders_status_created
  ON public.orders(status, created_at DESC);

-- Índice para searches por month-year en dashboard
CREATE INDEX IF NOT EXISTS idx_orders_created_month
  ON public.orders(DATE_TRUNC('month', created_at)::date);

COMMENT ON INDEX idx_orders_client_status_created IS 'Optimiza queries de pedidos por cliente y estado';
COMMENT ON INDEX idx_order_items_product_created IS 'Optimiza queries de items por producto';
COMMENT ON INDEX idx_orders_status_created IS 'Optimiza dashboard admin filtrado por estado';
