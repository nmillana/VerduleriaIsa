import { createClient } from 'npm:@supabase/supabase-js@2';

const ADMIN_EMAILS = new Set([
  'isabelsoledadster@gmail.com',
  'nataliamillanassler@gmail.com',
]);
const MAX_ITEMS = 150;
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return json({ ok: true });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Metodo no permitido.' }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: 'Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en secretos de la funcion.' }, 500);
    }

    const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
    if (!token) {
      return json({ error: 'Falta sesion administradora.' }, 401);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    await assertAdminRequester(adminClient, token);

    const body = await req.json().catch(() => ({}));
    const clientId = Number(body.client_id || 0);
    const clientNote = sanitizeText(body.client_note, 500) || null;
    const otherRequest = sanitizeText(body.other_request, 500) || null;
    const items = normalizeItems(body.items);

    if (!clientId) {
      return json({ error: 'Falta client_id.' }, 400);
    }
    if (!items.length && !otherRequest) {
      return json({ error: 'Selecciona productos o completa el campo Otro.' }, 400);
    }

    const { data: client, error: clientError } = await adminClient
      .from('clients')
      .select('id,name,email,phone,address')
      .eq('id', clientId)
      .maybeSingle();
    if (clientError) {
      throw clientError;
    }
    if (!client) {
      return json({ error: 'No encontre la clienta.' }, 404);
    }

    const productIds = [...new Set(items.map((item) => item.product_id))];
    const productsById = new Map<number, any>();
    if (productIds.length) {
      const { data: products, error: productsError } = await adminClient
        .from('products')
        .select('id,name,display_name,estimated_price,is_active')
        .in('id', productIds);
      if (productsError) {
        throw productsError;
      }
      for (const product of products || []) {
        productsById.set(Number(product.id), product);
      }
    }

    const orderItems = items.map((item) => {
      const product = productsById.get(item.product_id);
      if (!product || product.is_active !== true) {
        throw new Error('Uno o mas productos no estan activos.');
      }
      const estimatedPrice = Math.max(0, Math.round(Number(product.estimated_price) || 0));
      const estimatedTotal = Math.round(estimatedPrice * item.quantity);
      return {
        product_id: item.product_id,
        product_name: String(product.display_name || product.name || ''),
        quantity: item.quantity,
        requested_unit: item.requested_unit,
        estimated_price: estimatedPrice,
        estimated_total: estimatedTotal,
      };
    });
    const estimatedTotal = orderItems.reduce((sum, item) => sum + item.estimated_total, 0);

    const { data: order, error: orderError } = await adminClient
      .from('orders')
      .insert({
        client_id: client.id,
        status: 'pendiente',
        client_note: clientNote,
        other_request: otherRequest,
        estimated_total: estimatedTotal,
      })
      .select('id')
      .single();
    if (orderError) {
      throw orderError;
    }
    if (!order?.id) {
      throw new Error('Supabase no devolvio el pedido creado.');
    }
    const orderId = Number(order.id);

    if (orderItems.length) {
      const { error: itemsError } = await adminClient
        .from('order_items')
        .insert(orderItems.map((item) => ({ ...item, order_id: orderId })));
      if (itemsError) {
        await adminClient.from('orders').delete().eq('id', orderId);
        throw itemsError;
      }
    }

    return json({
      ok: true,
      order_id: orderId,
      client_id: client.id,
      estimated_total: estimatedTotal,
    });
  } catch (error) {
    console.error(error);
    const status = error instanceof ResponseError ? error.status : 500;
    return json({ error: error instanceof Error ? error.message : 'No pude crear el pedido manual.' }, status);
  }
});

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

async function assertAdminRequester(adminClient: ReturnType<typeof createClient>, token: string) {
  const { data: authData, error: authError } = await adminClient.auth.getUser(token);
  const requester = authData?.user;
  if (authError || !requester) {
    throw new ResponseError('Sesion administradora invalida.', 401);
  }

  const requesterEmail = normalizeEmail(requester.email);
  if (!ADMIN_EMAILS.has(requesterEmail)) {
    throw new ResponseError('Este correo no puede crear pedidos manuales.', 403);
  }

  const { data: adminRows, error: adminError } = await adminClient
    .from('admins')
    .select('id,email,auth_user_id')
    .or(`auth_user_id.eq.${requester.id},email.eq.${requesterEmail}`)
    .limit(2);
  if (adminError) {
    throw adminError;
  }
  const admin = (adminRows || []).find((row) => ADMIN_EMAILS.has(normalizeEmail(row.email)));
  if (!admin) {
    throw new ResponseError('No encontre la administradora en la tabla admins.', 403);
  }
}

function normalizeItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  if (value.length > MAX_ITEMS) {
    throw new ResponseError('El pedido tiene demasiadas lineas.', 400);
  }

  const grouped = new Map<string, { product_id: number; quantity: number; requested_unit: string }>();
  for (const raw of value) {
    const productId = Number((raw as any)?.product_id || 0);
    const quantity = normalizeQuantity((raw as any)?.quantity);
    const requestedUnit = normalizeUnit((raw as any)?.requested_unit);
    if (!productId || quantity <= 0) {
      continue;
    }
    const key = `${productId}:${requestedUnit}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.quantity = normalizeQuantity(existing.quantity + quantity);
    } else {
      grouped.set(key, { product_id: productId, quantity, requested_unit: requestedUnit });
    }
  }
  return [...grouped.values()];
}

function normalizeQuantity(value: unknown) {
  const quantity = Number(String(value || '').replace(',', '.'));
  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 999) {
    return 0;
  }
  return Math.round(quantity * 100) / 100;
}

function normalizeUnit(value: unknown) {
  return String(value || '').trim().toLowerCase() === 'unidad' ? 'unidad' : 'kg';
}

function normalizeEmail(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

function sanitizeText(value: unknown, maxLength: number) {
  return String(value || '').trim().slice(0, maxLength);
}

class ResponseError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
