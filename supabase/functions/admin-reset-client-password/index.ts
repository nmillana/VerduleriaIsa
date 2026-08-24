import { createClient } from "npm:@supabase/supabase-js@2";

const ADMIN_EMAILS = new Set([
  "isabelsoledadster@gmail.com",
  "nataliamillanassler@gmail.com",
]);
const DEFAULT_TEMP_PASSWORD = "verduleria";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return json({ ok: true });
  }
  if (req.method !== "POST") {
    return json({ error: "Metodo no permitido." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: "Falta SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en secretos de la funcion." }, 500);
    }

    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return json({ error: "Falta sesion administradora." }, 401);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: authData, error: authError } = await adminClient.auth.getUser(token);
    const requester = authData?.user;
    if (authError || !requester) {
      return json({ error: "Sesion administradora invalida." }, 401);
    }

    const requesterEmail = normalizeEmail(requester.email);
    if (!ADMIN_EMAILS.has(requesterEmail)) {
      return json({ error: "Este correo no puede resetear contrasenas." }, 403);
    }

    const { data: adminRows, error: adminError } = await adminClient
      .from("admins")
      .select("id,email,auth_user_id")
      .or(`auth_user_id.eq.${requester.id},email.eq.${requesterEmail}`)
      .limit(2);
    if (adminError) {
      throw adminError;
    }
    const admin = (adminRows || []).find((row) => ADMIN_EMAILS.has(normalizeEmail(row.email)));
    if (!admin) {
      return json({ error: "No encontre la administradora en la tabla admins." }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const clientId = Number(body.client_id || 0);
    const temporaryPassword = sanitizePassword(body.temporary_password || DEFAULT_TEMP_PASSWORD);
    if (!clientId) {
      return json({ error: "Falta client_id." }, 400);
    }
    if (temporaryPassword.length < 8) {
      return json({ error: "La clave temporal debe tener al menos 8 caracteres." }, 400);
    }

    const { data: client, error: clientError } = await adminClient
      .from("clients")
      .select("id,name,email,auth_user_id")
      .eq("id", clientId)
      .maybeSingle();
    if (clientError) {
      throw clientError;
    }
    if (!client) {
      return json({ error: "No encontre la clienta." }, 404);
    }

    let authUserId = client.auth_user_id || "";
    if (!authUserId && client.email) {
      authUserId = await findAuthUserIdByEmail(adminClient, client.email);
      if (authUserId) {
        const { error: linkError } = await adminClient
          .from("clients")
          .update({ auth_user_id: authUserId })
          .eq("id", client.id);
        if (linkError) {
          throw linkError;
        }
      }
    }

    let createdAuthUser = false;
    if (!authUserId) {
      authUserId = await createAndLinkClientAuthUser(adminClient, client, temporaryPassword);
      createdAuthUser = true;
    } else {
      const { error: updateUserError } = await adminClient.auth.admin.updateUserById(authUserId, {
        password: temporaryPassword,
        email_confirm: true,
      });
      if (updateUserError) {
        if (isMissingAuthUserError(updateUserError)) {
          authUserId = await createAndLinkClientAuthUser(adminClient, client, temporaryPassword);
          createdAuthUser = true;
        } else {
          throw updateUserError;
        }
      }
    }

    const { error: flagError } = await adminClient
      .from("clients")
      .update({ must_reset_password: true, password_reset_at: null })
      .eq("id", client.id);
    if (flagError) {
      throw flagError;
    }

    return json({
      ok: true,
      client_id: client.id,
      email: client.email,
      temporary_password: temporaryPassword,
      must_reset_password: true,
      created_auth_user: createdAuthUser,
    });
  } catch (error) {
    console.error(error);
    return json({ error: error instanceof Error ? error.message : "No pude resetear la clave." }, 500);
  }
});

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

function sanitizePassword(value: unknown) {
  return String(value || "").trim().slice(0, 128);
}

async function createAndLinkClientAuthUser(adminClient: any, client: any, temporaryPassword: string) {
  const email = normalizeEmail(client.email);
  if (!email) {
    throw new Error("Esta clienta no tiene correo para crear acceso Auth.");
  }

  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: {
      role: "client",
      name: client.name || "",
    },
  });
  if (error) {
    throw error;
  }
  const authUserId = data?.user?.id || "";
  if (!authUserId) {
    throw new Error("Supabase no devolvio el usuario Auth creado.");
  }

  const { error: linkError } = await adminClient
    .from("clients")
    .update({ auth_user_id: authUserId })
    .eq("id", client.id);
  if (linkError) {
    throw linkError;
  }
  return authUserId;
}

function isMissingAuthUserError(error: unknown) {
  const raw = error instanceof Error ? error.message : String(error || "");
  return /not found|user.*not.*exist|no user|404/i.test(raw);
}
async function findAuthUserIdByEmail(adminClient: ReturnType<typeof createClient>, email: string) {
  const target = normalizeEmail(email);
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 100 });
    if (error) {
      throw error;
    }
    const found = (data.users || []).find((user) => normalizeEmail(user.email) === target);
    if (found) {
      return found.id;
    }
    if (!data.users?.length || data.users.length < 100) {
      break;
    }
  }
  return "";
}
