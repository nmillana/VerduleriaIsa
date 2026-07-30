const CATEGORY_CHOICES = [
    ["frutas", "Frutas"],
    ["verduras_hortalizas", "Verduras y hortalizas"],
    ["hojas_ensaladas", "Hojas y ensaladas"],
    ["hierbas_alinos", "Hierbas y aliños"],
    ["listos_cocinar", "Listos para cocinar"],
    ["legumbres_frutos_aceitunas", "Legumbres, frutos secos y aceitunas"],
    ["huevos_despensa", "Huevos y despensa"],
];

const CATEGORY_LABELS = Object.fromEntries(CATEGORY_CHOICES);
const STATUS_LABELS = {
    pendiente: "Pendiente",
    comprado: "Comprado",
    pagado: "Pagado",
};
const DELIVERY_FEE = 5000;
const APP_NAME = "Verduleria Isa";
const CART_STORAGE_PREFIX = "verduleriaisa.cart.v1";
const ROLE_STORAGE_KEY = "verduleriaisa.role.v1";
const MAX_CLIENT_NOTE_LENGTH = 500;
const MAX_OTHER_REQUEST_LENGTH = 500;
const MAX_QUANTITY = 999;
const UNIT_CHOICES = [["unidad", "Unidad"], ["kg", "Kg"]];
const PRODUCT_PHOTO_BASE = 'https://www.themealdb.com/images/ingredients';
const PRODUCT_PHOTO_VARIANT = '-medium';
const PROMO_IMAGE_URL = 'https://images.unsplash.com/photo-1418669112725-fb499fb61127?auto=format&fit=crop&w=1200&q=80';
const CATEGORY_PHOTO_TERMS = {
    frutas: 'Apples',
    verduras_hortalizas: 'Carrots',
    hojas_ensaladas: 'Lettuce',
    hierbas_alinos: 'Parsley',
    listos_cocinar: 'Mixed Peppers',
    legumbres_frutos_aceitunas: 'Chickpeas',
    huevos_despensa: 'Eggs',
};
const PRODUCT_PHOTO_TERMS = [
    [/chirimoya|cherimoya/, 'Pears'],
    [/frutilla|strawberry/, 'Strawberries'],
    [/kiwi/, 'Kiwi'],
    [/mandarina|tangerine/, 'Orange'],
    [/mango/, 'Mango'],
    [/manzana verde/, 'Bramley Apples'],
    [/manzana|apple/, 'Apples'],
    [/naranja|orange/, 'Orange'],
    [/palta|avocado/, 'Avocado'],
    [/pera|pear/, 'Pears'],
    [/pina|pineapple/, 'Pineapple Chunks'],
    [/platano|banana/, 'Banana'],
    [/uva|grape/, 'Raisins'],
    [/arandano|blueberry/, 'Blueberries'],
    [/ciruela|plum/, 'Plum Jam'],
    [/durazno|nectarin|peach/, 'Peaches'],
    [/frambuesa|raspberry/, 'Raspberries'],
    [/melon/, 'Orange'],
    [/pepino dulce/, 'Pears'],
    [/sandia|watermelon/, 'Orange'],
    [/tuna/, 'Pears'],
    [/acelga|chard/, 'Spinach'],
    [/alcachofa|artichoke/, 'Jerusalem Artichokes'],
    [/ajo|garlic/, 'Garlic'],
    [/betarraga|beterraga|beet/, 'Beetroot'],
    [/brocoli|broccoli/, 'Broccoli'],
    [/bruselas|brucelas|brussels/, 'Brussels Sprouts'],
    [/brotes de alfalfa|alfalfa/, 'Bean Sprouts'],
    [/camote|sweet potato/, 'Sweet Potatoes'],
    [/cebolla en escabeche/, 'Onion'],
    [/cebolla morada/, 'Red Onions'],
    [/cebolla|onion/, 'Onion'],
    [/champinon|champinones|mushroom/, 'Mushrooms'],
    [/coliflor|cauliflower/, 'Cabbage'],
    [/choclo|corn/, 'Sweetcorn'],
    [/espinaca|spinach/, 'Spinach'],
    [/lechuga|lettuce/, 'Lettuce'],
    [/limon|lemon/, 'Lemon'],
    [/mizuna/, 'Rocket'],
    [/apio picado/, 'Celery'],
    [/apio|celery/, 'Celery'],
    [/\bpapa\b|\bpapas\b|potato/, 'Potatoes'],
    [/pepino|cucumber/, 'Cucumber'],
    [/pimenton rojo|red pepper/, 'Red Pepper'],
    [/pimenton verde|green pepper/, 'Green Pepper'],
    [/pimenton amarillo|yellow pepper/, 'Yellow Pepper'],
    [/porotos verdes picados/, 'Green Beans'],
    [/porotos verdes|green beans/, 'Green Beans'],
    [/rabano|radish/, 'Radish'],
    [/repollo picado/, 'Cabbage'],
    [/repollo morado/, 'Red Cabbage'],
    [/repollo|cabbage/, 'Cabbage'],
    [/pulpa de tomate/, 'Tomato Puree'],
    [/tomate cherry/, 'Grape Tomatoes'],
    [/tomate|tomato/, 'Tomato'],
    [/zanahoria|carrot/, 'Carrots'],
    [/zapallo butternut|butternut/, 'Butternut Squash'],
    [/zapallo italiano|zucchini/, 'Courgettes'],
    [/zapallo|squash/, 'Squash'],
    [/cazuela/, 'Carrots'],
    [/carbonada/, 'Mixed Peppers'],
    [/arveja|pea/, 'Peas'],
    [/haba|broad beans/, 'Broad Beans'],
    [/chapsui|chop suey/, 'Mixed Peppers'],
    [/mongoliana/, 'Bean Sprouts'],
    [/dientes de dragon|bean sprouts/, 'Bean Sprouts'],
    [/aji verde|green chili/, 'Green Chilli'],
    [/cebollin|spring onion/, 'Spring Onions'],
    [/ciboulette|chives/, 'Chives'],
    [/cilantro|coriander/, 'Cilantro Leaves'],
    [/perejil|parsley/, 'Parsley'],
    [/puerro|leek/, 'Leek'],
    [/albahaca|basil/, 'Fresh Basil'],
    [/jengibre|genjibre|ginger/, 'Ginger'],
    [/garbanzo|chickpea/, 'Chickpeas'],
    [/lenteja|lentil/, 'Lentils'],
    [/pinon|pine nuts/, 'Pine Nuts'],
    [/poroto granado/, 'Pinto Beans'],
    [/poroto|bean/, 'Pinto Beans'],
    [/aceituna verde/, 'Green Olives'],
    [/aceituna|olive/, 'Black Olives'],
    [/almendra|almond/, 'Almonds'],
    [/nuez|nueces|walnut/, 'Walnuts'],
    [/mani|peanut/, 'Peanuts'],
    [/huevo de codorniz|quail egg/, 'Eggs'],
    [/huevo|egg/, 'Eggs'],
    [/miel|honey/, 'Honey'],
    [/mermelada.*frutilla/, 'Raspberry Jam'],
    [/mermelada.*damasco/, 'Apricot Jam'],
    [/mermelada|jam/, 'Jam'],
    [/loco cocido|seafood/, 'Clams'],
    [/queque|cake/, 'Shortcrust Pastry'],
    [/alfajor/, 'Shortcrust Pastry'],
    [/cuchufli/, 'Shortcrust Pastry'],
    [/bolsa de basura/, 'Cabbage'],
    [/longaniza|sausage/, 'Sausages'],
];
const TEMP_ADMIN_PASSWORD = "verduleria";
const SUPABASE_TIMEOUT_MS = 20000;

const state = {
    client: null,
    session: null,
    role: null,
    profile: null,
    profiles: { admin: null, client: null },
    route: { path: "/", query: new URLSearchParams() },
    flash: null,
    initialized: false,
};

const appRoot = document.getElementById("app");

document.addEventListener("DOMContentLoaded", () => {
    void startApplication();
});

async function startApplication() {
    bindDomEvents();

    if (!window.supabase?.createClient) {
        renderStandalone("Configuracion", renderSetupPanel("No se pudo cargar la libreria de Supabase."));
        return;
    }

    const config = window.VERDULERIA_CONFIG || {};
    if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY || /REEMPLAZAR/i.test(config.SUPABASE_ANON_KEY)) {
        renderStandalone("Configurar", renderSetupPanel());
        return;
    }

    state.client = window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    });

    try {
        const { data, error } = await withSupabaseTimeout(
            state.client.auth.getSession(),
            "Supabase no respondió al abrir la sesión guardada. Revisa la conexión e intenta recargar."
        );
        if (error) {
            throw error;
        }
        state.session = data.session || null;
        await syncIdentity();

        state.client.auth.onAuthStateChange((event, session) => {
            state.session = session;
            void handleAuthChange(event);
        });
    } catch (error) {
        renderStandalone("Configuracion", renderErrorView(error));
        return;
    }

    state.initialized = true;
    if (!window.location.hash) {
        navigate("/", true);
        return;
    }
    onRouteChange();
}

function bindDomEvents() {
    window.addEventListener("hashchange", onRouteChange);
    document.addEventListener("submit", (event) => {
        void handleSubmit(event);
    });
    document.addEventListener("click", (event) => {
        void handleClick(event);
    });
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleInput);
}

async function handleAuthChange(event) {
    try {
        await syncIdentity(event);
    } catch (error) {
        console.error(error);
        state.flash = { tone: "error", message: friendlyError(error) };
    }

    if (event === "SIGNED_OUT") {
        writePreferredRole("");
        state.flash = { tone: "notice", message: "Sesion cerrada." };
        navigate("/", true);
        return;
    }

    await renderCurrentRoute();
}

function onRouteChange() {
    state.route = parseHashRoute();
    if (state.initialized) {
        void renderCurrentRoute();
    }
}

async function renderCurrentRoute() {
    const route = state.route || parseHashRoute();
    renderShell("Cargando", renderLoadingCard("Cargando vista..."));

    try {
        const view = await resolveRoute(route);
        if (view.redirectTo) {
            if (view.flash) {
                state.flash = view.flash;
            }
            navigate(view.redirectTo, true);
            return;
        }
        renderShell(view.title, view.content);
        afterRender(route);
    } catch (error) {
        console.error(error);
        renderShell("Problema", renderErrorView(error));
    }
}

function afterRender(route) {
    if (route.path === "/cliente/pedido/nuevo" || route.path === "/cliente/dashboard") {
        refreshOrderSummary();
        filterOrderRows();
    }
}

async function resolveRoute(route) {
    const month = validMonth(route.query.get("month")) || currentMonthValue();

    if (route.path === "/") {
        if (state.role === "admin") {
            const target = state.profile?.must_reset_password ? "/admin/cambiar-clave" : "/admin/dashboard";
            return redirectView(target, "", "notice", "Abriendo panel administrador...");
        }
        if (state.role === "client") {
            return redirectView("/cliente/pedido/nuevo", "", "notice", "Abriendo catálogo...");
        }
        return { title: "Acceso", content: renderHomePage() };
    }

    if (route.path === "/registro") {
        if (state.role === "client") {
            return redirectView("/cliente/pedido/nuevo", "", "notice", "Abriendo catálogo...");
        }
        return { title: "Registro", content: renderClientRegisterPage() };
    }

    if (route.path === "/login-cliente") {
        if (state.role === "client") {
            return redirectView("/cliente/pedido/nuevo", "", "notice", "Abriendo catálogo...");
        }
        return { title: "Ingreso clienta", content: renderClientLoginPage() };
    }

    if (route.path === "/admin/login") {
        if (state.role === "admin") {
            const target = state.profile?.must_reset_password ? "/admin/cambiar-clave" : "/admin/dashboard";
            return redirectView(target, "", "notice", "Abriendo panel administrador...");
        }
        return { title: "Ingreso administrador", content: renderAdminLoginPage() };
    }

    if (route.path === "/admin/cambiar-clave") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        return { title: "Nueva clave", content: renderAdminPasswordResetPage(state.profile) };
    }

    if (route.path.startsWith("/admin/")) {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        if (state.profile?.must_reset_password) {
            return redirectView("/admin/cambiar-clave", "Primero define una nueva contraseña.", "notice");
        }
    }

    if (route.path === "/cliente/dashboard") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const [orders, products] = await Promise.all([
            fetchOrders({
                clientId: state.profile.id,
                month,
                includeItems: true,
            }),
            fetchProducts(),
        ]);
        return {
            title: "Tu panel",
            content: renderClientDashboardPage(state.profile, buildClientDashboard(orders), month, products, readOrderDraft()),
        };
    }

    if (route.path === "/cliente/perfil") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        return {
            title: "Mi perfil",
            content: renderClientProfilePage(state.profile),
        };
    }

    if (route.path === "/cliente/pedido/nuevo") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const products = await fetchProducts();
        const sourceId = Number(route.query.get("source") || 0);
        const sourceOrder = sourceId ? await fetchOrderById(sourceId, { clientId: state.profile.id }) : null;
        const draft = sourceOrder
            ? {
                selections: buildRepeatSelections(sourceOrder),
                client_note: sourceOrder.client_note || "",
                other_request: sourceOrder.other_request || "",
            }
            : readOrderDraft();
        return {
            title: "Nuevo pedido",
            content: renderClientOrderFormPage(products, draft, sourceOrder),
        };
    }

    if (/^\/cliente\/pedido\/\d+$/.test(route.path)) {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const orderId = Number(route.path.split("/").pop());
        const order = await fetchOrderById(orderId, { clientId: state.profile.id });
        if (!order) {
            return { title: "No encontrado", content: renderNotFound("No encontré ese pedido.") };
        }
        return {
            title: `Pedido #${order.id}`,
            content: renderClientOrderDetailPage(order),
        };
    }

    if (route.path === "/admin/dashboard") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const orders = await fetchOrders({ month, includeItems: true, includeClients: true });
        return {
            title: "Panel administrador",
            content: renderAdminDashboardPage(buildAdminDashboard(orders), orders.slice(0, 8), month),
        };
    }

    if (route.path === "/admin/pedidos") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const status = route.query.get("status") || "";
        const orders = await fetchOrders({
            month,
            status: status || null,
            includeClients: true,
        });
        return {
            title: "Pedidos",
            content: renderAdminOrdersPage(orders, month, status),
        };
    }

    if (/^\/admin\/pedido\/\d+$/.test(route.path)) {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const orderId = Number(route.path.split("/").pop());
        const order = await fetchOrderById(orderId, { includeClient: true });
        if (!order) {
            return { title: "No encontrado", content: renderNotFound("No encontré ese pedido.") };
        }
        return {
            title: `Pedido #${order.id}`,
            content: renderAdminOrderDetailPage(order),
        };
    }

    if (route.path === "/admin/productos") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const products = await fetchProducts({ includeInactive: true });
        return {
            title: "Productos",
            content: renderAdminProductsPage(products),
        };
    }

    if (route.path === "/admin/clientes") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const clients = await fetchClientsWithOrderCounts();
        return {
            title: "Clientas",
            content: renderAdminClientsPage(clients),
        };
    }

    if (route.path === "/admin/consolidado") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const orders = await fetchOrders({ month, includeItems: true });
        return {
            title: "Consolidado",
            content: renderAdminConsolidationPage(buildConsolidation(orders), month),
        };
    }

    return {
        title: "No encontrado",
        content: renderNotFound("La vista que buscas no existe en esta version de GitHub Pages."),
    };
}

function requireRole(role, redirectPath, message) {
    if (state.role === role) {
        return null;
    }
    return redirectView(redirectPath, message, "error");
}

function redirectView(redirectTo, message = "", tone = "notice", loading = "Redirigiendo...") {
    return {
        title: "Redirigiendo",
        content: renderLoadingCard(loading),
        redirectTo,
        flash: message ? { tone, message } : null,
    };
}

async function syncIdentity(event = "", options = {}) {
    if (!state.session?.user) {
        state.role = null;
        state.profile = null;
        state.profiles = { admin: null, client: null };
        return;
    }

    const user = state.session.user;
    const preferredRole = normalizeRole(options.preferredRole || preferredRoleFromRoute() || readPreferredRole());
    const strictRole = normalizeRole(options.strictRole || "");
    const admin = await linkAndFetchAdmin(user);
    const client = await linkAndFetchClient(user);
    state.profiles = { admin, client };

    let selectedRole = "";
    let selectedProfile = null;

    if (strictRole) {
        selectedRole = strictRole;
        selectedProfile = strictRole === "client" ? client : admin;
    } else if (preferredRole === "client" && client) {
        selectedRole = "client";
        selectedProfile = client;
    } else if (preferredRole === "admin" && admin) {
        selectedRole = "admin";
        selectedProfile = admin;
    } else if (admin) {
        selectedRole = "admin";
        selectedProfile = admin;
    } else if (client) {
        selectedRole = "client";
        selectedProfile = client;
    }

    if (selectedProfile) {
        state.role = selectedRole;
        state.profile = selectedProfile;
        writePreferredRole(selectedRole);
        if (selectedRole === "client" && event === "SIGNED_IN") {
            await touchClientLogin(selectedProfile.id);
        }
        return;
    }

    state.role = null;
    state.profile = null;
}

function setActiveProfile(role, profile) {
    state.role = role;
    state.profile = profile;
    state.profiles = { ...state.profiles, [role]: profile };
    writePreferredRole(role);
}

async function linkAndFetchAdmin(user) {
    const email = normalizeEmail(user.email);
    const fields = "id,name,email,auth_user_id,must_reset_password,password_reset_at";

    let admin = await fetchSingleRow(
        state.client.from("admins").select(fields).eq("auth_user_id", user.id)
    );
    if (admin) {
        return normalizeAdmin(admin);
    }

    if (!email) {
        return null;
    }

    admin = await fetchSingleRow(
        state.client.from("admins").select(fields).eq("email", email)
    );
    if (!admin) {
        return null;
    }

    if (admin.auth_user_id !== user.id) {
        const updatedRows = await runQuery(
            state.client.from("admins").update({ auth_user_id: user.id }).eq("id", admin.id).select(fields)
        );
        return normalizeAdmin(updatedRows[0] || { ...admin, auth_user_id: user.id });
    }

    return normalizeAdmin(admin);
}

async function linkAndFetchClient(user) {
    const email = normalizeEmail(user.email);
    const fields = clientProfileFields();

    let client = await fetchSingleRow(
        state.client.from("clients").select(fields).eq("auth_user_id", user.id)
    );
    if (client) {
        return normalizeClient(client);
    }

    if (email) {
        client = await fetchSingleRow(
            state.client.from("clients").select(fields).eq("email", email)
        );
        if (client) {
            if (client.auth_user_id !== user.id) {
                const updatedRows = await runQuery(
                    state.client
                        .from("clients")
                        .update({ auth_user_id: user.id })
                        .eq("id", client.id)
                        .select(fields)
                );
                return normalizeClient(updatedRows[0] || { ...client, auth_user_id: user.id });
            }
            return normalizeClient(client);
        }
    }

    const meta = user.user_metadata || {};
    const payload = {
        auth_user_id: user.id,
        name: sanitizeText(meta.name || meta.full_name || deriveNameFromEmail(email), 120),
        email,
        phone: sanitizeText(meta.phone, 40),
        address: sanitizeText(meta.address, 255),
        billing_type: meta.billing_type === "mensual" ? "mensual" : "semanal",
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.address) {
        return null;
    }

    const inserted = await runQuery(state.client.from("clients").insert(payload).select(fields));
    return normalizeClient(inserted[0]);
}

async function touchClientLogin(clientId) {
    await runQuery(
        state.client
            .from("clients")
            .update({ last_login_at: new Date().toISOString() })
            .eq("id", clientId)
            .select("id")
    );
}

async function fetchProducts(options = {}) {
    let query = state.client
        .from("products")
        .select("id,name,display_name,presentation,category,estimated_price,is_active,created_at,updated_at")
        .order("display_name");

    if (!options.includeInactive) {
        query = query.eq("is_active", true);
    }

    const rows = await runQuery(query);
    return rows.map(normalizeProduct).sort((a, b) => compareProducts(a, b));
}

async function fetchClientsWithOrderCounts() {
    const clients = (await runQuery(
        state.client
            .from("clients")
            .select("id,name,email,phone,address,billing_type,auth_user_id,created_at,updated_at,last_login_at")
            .order("name")
    )).map(normalizeClient);

    const orders = await runQuery(state.client.from("orders").select("id,client_id"));
    const counts = new Map();
    for (const row of orders) {
        const key = Number(row.client_id);
        counts.set(key, (counts.get(key) || 0) + 1);
    }

    return clients.map((client) => ({
        ...client,
        order_count: counts.get(client.id) || 0,
    }));
}

async function fetchOrders(options = {}) {
    let query = state.client
        .from("orders")
        .select("id,client_id,source_order_id,status,admin_note,client_note,other_request,estimated_total,actual_total,created_at,updated_at,purchased_at")
        .order("created_at", { ascending: false });

    if (options.clientId) {
        query = query.eq("client_id", options.clientId);
    }

    if (options.month) {
        const range = monthRange(options.month);
        query = query.gte("created_at", range.start).lt("created_at", range.end);
    }

    if (options.status) {
        query = query.eq("status", options.status);
    }

    const orders = (await runQuery(query)).map((row) => decorateOrderTotals(normalizeOrder(row)));
    const orderIds = orders.map((order) => order.id);

    let itemsByOrder = new Map();
    let clientsById = new Map();

    if (options.includeItems && orderIds.length) {
        itemsByOrder = await fetchOrderItemsByOrderIds(orderIds);
    }

    if (options.includeClients && orderIds.length) {
        clientsById = await fetchClientsByIds(orders.map((order) => order.client_id));
    }

    return orders.map((order) => {
        const client = clientsById.get(order.client_id);
        return {
            ...order,
            items: itemsByOrder.get(order.id) || [],
            client_name: client?.name || "",
            client_email: client?.email || "",
            client_phone: client?.phone || "",
            client_address: client?.address || "",
        };
    });
}

async function fetchOrderById(orderId, options = {}) {
    let query = state.client
        .from("orders")
        .select("id,client_id,source_order_id,status,admin_note,client_note,other_request,estimated_total,actual_total,created_at,updated_at,purchased_at")
        .eq("id", orderId);

    if (options.clientId) {
        query = query.eq("client_id", options.clientId);
    }

    const row = await fetchSingleRow(query);
    if (!row) {
        return null;
    }

    const order = decorateOrderTotals(normalizeOrder(row));
    const itemsByOrder = await fetchOrderItemsByOrderIds([order.id]);
    const items = itemsByOrder.get(order.id) || [];
    let client = null;

    if (options.clientId) {
        client = state.profile;
    } else if (options.includeClient) {
        client = (await fetchClientsByIds([order.client_id])).get(order.client_id) || null;
    }

    return {
        ...order,
        items,
        client_name: client?.name || "",
        client_email: client?.email || "",
        client_phone: client?.phone || "",
        client_address: client?.address || "",
    };
}

async function fetchClientsByIds(clientIds) {
    const uniqueIds = [...new Set(clientIds.map(Number).filter(Boolean))];
    if (!uniqueIds.length) {
        return new Map();
    }

    const rows = await runQuery(
        state.client
            .from("clients")
            .select("id,name,email,phone,address,billing_type,auth_user_id,created_at,updated_at,last_login_at")
            .in("id", uniqueIds)
    );

    return new Map(rows.map((row) => {
        const client = normalizeClient(row);
        return [client.id, client];
    }));
}

async function fetchOrderItemsByOrderIds(orderIds) {
    const uniqueIds = [...new Set(orderIds.map(Number).filter(Boolean))];
    if (!uniqueIds.length) {
        return new Map();
    }

    const rows = await runQuery(
        state.client
            .from("order_items")
            .select("id,order_id,product_id,product_name,quantity,requested_unit,estimated_price,estimated_total,actual_price,actual_total,item_note,was_missing")
            .in("order_id", uniqueIds)
            .order("order_id", { ascending: true })
            .order("product_name", { ascending: true })
    );

    const map = new Map(uniqueIds.map((id) => [id, []]));
    for (const row of rows) {
        const item = normalizeOrderItem(row);
        if (!map.has(item.order_id)) {
            map.set(item.order_id, []);
        }
        map.get(item.order_id).push(item);
    }
    return map;
}

async function createOrder(selections, sourceOrderId, clientNote, otherRequest) {
    const items = buildSecureOrderItems(selections);
    const cleanOtherRequest = sanitizeText(otherRequest, MAX_OTHER_REQUEST_LENGTH);
    if (!items.length && !cleanOtherRequest) {
        throw new Error("Selecciona productos o completa el campo Otro.");
    }

    const { data, error } = await state.client.rpc("create_secure_order", {
        p_items: items,
        p_source_order_id: sourceOrderId || null,
        p_client_note: sanitizeText(clientNote, MAX_CLIENT_NOTE_LENGTH) || null,
        p_other_request: cleanOtherRequest || null,
    });

    if (error) {
        throw error;
    }

    const orderId = Number(data);
    if (!orderId) {
        throw new Error("Supabase no devolvió el número del pedido creado.");
    }
    return orderId;
}

async function updateClientProfile(values) {
    const payload = {
        name: sanitizeText(values.name, 120),
        phone: sanitizeText(values.phone, 40),
        address: sanitizeText(values.address, 255),
        billing_type: values.billing_type === "mensual" ? "mensual" : "semanal",
    };

    if (!payload.name || !payload.phone || !payload.address) {
        throw new Error("Completa nombre, teléfono y dirección.");
    }

    const fields = clientProfileFields();
    const updatedRows = await runQuery(
        state.client
            .from("clients")
            .update(payload)
            .eq("id", state.profile.id)
            .select(fields)
    );

    const client = normalizeClient(updatedRows[0] || { ...state.profile, ...payload });
    setActiveProfile("client", client);
}

async function upsertClientProfileForCurrentUser(values) {
    const user = state.session?.user;
    if (!user) {
        throw new Error("Debes ingresar con ese correo antes de crear el perfil de clienta.");
    }

    const authEmail = normalizeEmail(user.email);
    const email = normalizeEmail(values.email);
    const payload = {
        auth_user_id: user.id,
        name: sanitizeText(values.name, 120),
        email,
        phone: sanitizeText(values.phone, 40),
        address: sanitizeText(values.address, 255),
        billing_type: values.billing_type === "mensual" ? "mensual" : "semanal",
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.address) {
        throw new Error("Completa nombre, teléfono y dirección.");
    }
    if (payload.email !== authEmail) {
        throw new Error("Para crear la ficha de clienta usa el mismo correo con el que ingresaste.");
    }

    const rows = await runQuery(
        state.client
            .from("clients")
            .upsert(payload, { onConflict: "email" })
            .select(clientProfileFields())
    );
    return normalizeClient(rows[0] || payload);
}

async function saveProduct(values) {
    const displayName = sanitizeText(values.display_name || values.name, 120);
    const presentation = sanitizeText(values.presentation, 80);
    const payload = {
        display_name: displayName,
        presentation,
        category: CATEGORY_LABELS[values.category] ? values.category : "verduras_hortalizas",
        estimated_price: Math.max(0, Math.round(Number(values.estimated_price) || 0)),
        is_active: values.is_active === true,
    };

    if (!displayName) {
        throw new Error("El nombre visible del producto es obligatorio.");
    }

    if (values.id) {
        await runQuery(
            state.client
                .from("products")
                .update(payload)
                .eq("id", values.id)
                .select("id")
        );
        return;
    }

    payload.name = displayName;
    await runQuery(state.client.from("products").insert(payload).select("id"));
}

async function updateOrderActuals(orderId, status, adminNote, itemUpdates) {
    for (const item of itemUpdates) {
        const actualPrice = item.actual_price === "" ? null : Math.round(Number(item.actual_price));
        const actualTotal = actualPrice === null ? null : Math.round(actualPrice * Number(item.quantity));
        await runQuery(
            state.client
                .from("order_items")
                .update({
                    actual_price: actualPrice,
                    actual_total: actualTotal,
                    item_note: sanitizeText(item.item_note, 255),
                    was_missing: Boolean(item.was_missing),
                })
                .eq("id", item.id)
                .eq("order_id", orderId)
                .select("id")
        );
    }

    const updatedItems = (await fetchOrderItemsByOrderIds([orderId])).get(orderId) || [];
    const estimatedTotal = updatedItems.reduce((sum, item) => sum + item.estimated_total, 0);
    const displayTotal = updatedItems.reduce(
        (sum, item) => sum + (item.actual_total ?? item.estimated_total),
        0
    );

    await runQuery(
        state.client
            .from("orders")
            .update({
                status,
                admin_note: sanitizeText(adminNote, 500),
                estimated_total: estimatedTotal,
                actual_total: displayTotal,
                purchased_at: status === "comprado" || status === "pagado" ? new Date().toISOString() : null,
            })
            .eq("id", orderId)
            .select("id")
    );
}

async function handleSubmit(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) {
        return;
    }

    const kind = form.dataset.form;
    if (!kind) {
        return;
    }

    event.preventDefault();

    if (form.dataset.busy === "1") {
        return;
    }

    if (kind === "client-dashboard-filter") {
        const month = validMonth(new FormData(form).get("month")) || currentMonthValue();
        navigate(`/cliente/dashboard?month=${month}`);
        return;
    }

    if (kind === "admin-dashboard-filter") {
        const month = validMonth(new FormData(form).get("month")) || currentMonthValue();
        navigate(`/admin/dashboard?month=${month}`);
        return;
    }

    if (kind === "admin-orders-filter") {
        const formData = new FormData(form);
        const month = validMonth(formData.get("month")) || currentMonthValue();
        const status = sanitizeText(formData.get("status"), 40);
        navigate(`/admin/pedidos?month=${month}&status=${encodeURIComponent(status)}`);
        return;
    }

    if (kind === "admin-consolidation-filter") {
        const month = validMonth(new FormData(form).get("month")) || currentMonthValue();
        navigate(`/admin/consolidado?month=${month}`);
        return;
    }

    setFormBusy(form, true);
    setInlineStatus(form, "Procesando...", "notice");
    try {
        switch (kind) {
            case "client-register":
                await submitClientRegister(form);
                break;
            case "client-login":
                await submitClientLogin(form);
                break;
            case "admin-login":
                await submitAdminLogin(form);
                break;
            case "admin-password-reset":
                await submitAdminPasswordReset(form);
                break;
            case "client-profile-update":
                await submitClientProfile(form);
                break;
            case "client-order-create":
                await submitClientOrder(form);
                break;
            case "admin-product-create":
            case "admin-product-update":
                await submitProductSave(form);
                break;
            case "admin-order-update":
                await submitAdminOrderUpdate(form);
                break;
            default:
                break;
        }
    } catch (error) {
        const message = friendlyError(error);
        setInlineStatus(form, message, "error");
        state.flash = { tone: "error", message };
        if (!hasInlineStatus(form)) {
            await renderCurrentRoute();
        }
    } finally {
        setFormBusy(form, false);
    }
}

async function handleClick(event) {
    const actionNode = event.target.closest("[data-action]");
    if (!actionNode) {
        return;
    }

    event.preventDefault();
    const action = actionNode.dataset.action;

    try {
        switch (action) {
            case "logout":
                await state.client.auth.signOut();
                break;
            case "print-order":
                await printCurrentOrder(Number(actionNode.dataset.orderId), state.role === "admin");
                break;
            case "print-month":
                await printMonthlySummary(actionNode.dataset.month || currentMonthValue());
                break;
            case "export-consolidation":
                await exportConsolidationCsv(actionNode.dataset.month || currentMonthValue());
                break;
            case "open-whatsapp":
                await openWhatsAppForOrder(Number(actionNode.dataset.orderId));
                break;
            case "focus-category":
                document.getElementById(actionNode.dataset.target || "")?.scrollIntoView({ behavior: "smooth", block: "start" });
                break;
            case "focus-search":
                document.querySelector(actionNode.dataset.target || "[data-product-search]")?.focus();
                break;
            case "add-product":
            case "increment-product":
            case "decrement-product":
                updateProductQuantity(actionNode, action);
                break;
            case "switch-role":
                await switchRole(actionNode.dataset.role);
                break;
            default:
                break;
        }
    } catch (error) {
        state.flash = { tone: "error", message: friendlyError(error) };
        await renderCurrentRoute();
    }
}

function handleInput(event) {
    if (event.target.matches("[data-quantity-input], [data-unit-input]")) {
        refreshOrderSummary();
        const form = event.target.closest("[data-order-form]");
        if (form) {
            persistOrderDraft(form);
        }
    }
    if (event.target.matches("[data-client-note], [data-other-request]")) {
        const form = event.target.closest("[data-order-form]");
        if (form) {
            persistOrderDraft(form);
        }
    }
    if (event.target.matches("[data-product-search]")) {
        filterOrderRows();
    }
}

function updateProductQuantity(actionNode, action) {
    const productId = Number(actionNode.dataset.productId || 0);
    const form = actionNode.closest("[data-order-form]");
    if (!productId || !form) {
        return;
    }

    const input = form.querySelector(`[name="qty_${productId}"]`);
    if (!input) {
        return;
    }

    const current = normalizeQuantity(String(input.value || "").replace(",", "."));
    const unitNode = form.querySelector(`[name="unit_${productId}"]`);
    const step = normalizeUnit(unitNode?.value) === "kg" ? 0.5 : 1;
    let next = current;

    if (action === "decrement-product") {
        next = Math.max(0, current - step);
    } else if (current > 0) {
        next = Math.min(MAX_QUANTITY, current + step);
    } else {
        next = step;
    }

    input.value = next > 0 ? formatQuantityInputValue(next) : "";
    refreshOrderSummary();
    persistOrderDraft(form);
}

function formatQuantityInputValue(value) {
    const rounded = Math.round(Number(value || 0) * 100) / 100;
    return String(rounded).replace(/\.0$/, "");
}

async function submitClientRegister(form) {
    const formData = new FormData(form);
    const name = sanitizeText(formData.get("name"), 120);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");
    const phone = sanitizeText(formData.get("phone"), 40);
    const address = sanitizeText(formData.get("address"), 255);
    const billingType = formData.get("billing_type") === "mensual" ? "mensual" : "semanal";

    if (!name || !email || !phone || !address) {
        throw new Error("Completa todos los datos del registro.");
    }
    if (password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
    }
    if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden.");
    }

    if (state.session?.user && normalizeEmail(state.session.user.email) === email) {
        setInlineStatus(form, "Creando ficha de clienta para tu usuario actual...", "notice");
        const client = await upsertClientProfileForCurrentUser({ name, email, phone, address, billing_type: billingType });
        setActiveProfile("client", client);
        await touchClientLogin(client.id);
        state.flash = { tone: "notice", message: "Perfil de clienta creado. Ya puedes hacer tu pedido." };
        navigate("/cliente/pedido/nuevo", true);
        return;
    }

    setInlineStatus(form, "Creando tu cuenta...", "notice");

    const { data, error } = await withSupabaseTimeout(
        state.client.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: currentAppUrl(),
                data: {
                    role: "client",
                    name,
                    phone,
                    address,
                    billing_type: billingType,
                },
            },
        }),
        "Supabase no respondió al registrar la cuenta. Revisa la conexión e intenta nuevamente."
    );

    if (error) {
        throw error;
    }

    if (data.session) {
        state.session = data.session;
        await syncIdentity("SIGNED_IN", { preferredRole: "client", strictRole: "client" });
        if (state.role !== "client") {
            throw new Error("Tu cuenta se creó, pero no pude crear la ficha de clienta. Ejecuta supabase/sql/013_client_registration_repair.sql en Supabase y vuelve a ingresar.");
        }
        state.flash = { tone: "notice", message: "Registro completado. Ya puedes hacer tu pedido." };
        navigate("/cliente/pedido/nuevo", true);
        return;
    }

    const existingEmail = data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0;
    if (existingEmail) {
        setInlineStatus(form, "Ese correo ya existe. Verificando tu contraseña para crear la ficha de clienta...", "notice");
        const { data: loginData, error: loginError } = await withSupabaseTimeout(
            state.client.auth.signInWithPassword({ email, password }),
            "Supabase no respondió al verificar ese correo. Revisa la conexión e intenta nuevamente."
        );
        if (!loginError && loginData.session) {
            state.session = loginData.session;
            const client = await upsertClientProfileForCurrentUser({ name, email, phone, address, billing_type: billingType });
            setActiveProfile("client", client);
            await touchClientLogin(client.id);
            state.flash = { tone: "notice", message: "Perfil de clienta creado. Ya puedes hacer tu pedido." };
            navigate("/cliente/pedido/nuevo", true);
            return;
        }
    }

    state.flash = {
        tone: "notice",
        message: existingEmail
            ? "Ese correo ya existe en Supabase. Si también quieres usarlo como clienta, entra a Registro con la misma contraseña actual."
            : "Registro creado. Revisa tu correo para confirmar la cuenta y luego ingresa.",
    };
    navigate("/login-cliente", true);
}

async function submitClientLogin(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    setInlineStatus(form, "Validando tus datos...", "notice");

    const { data, error } = await withSupabaseTimeout(
        state.client.auth.signInWithPassword({ email, password }),
        "Supabase no respondió al ingresar. Revisa la conexión e intenta nuevamente."
    );
    if (error) {
        throw error;
    }

    state.session = data.session;
    writePreferredRole("client");
    await syncIdentity("SIGNED_IN", { preferredRole: "client", strictRole: "client" });
    if (state.role !== "client") {
        await state.client.auth.signOut();
        throw new Error(buildRoleLinkError("client", email));
    }

    state.flash = { tone: "notice", message: "Bienvenida de vuelta." };
    navigate("/cliente/pedido/nuevo", true);
}

async function submitAdminLogin(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    if (!email) {
        throw new Error("Escribe el correo administrador completo.");
    }
    if (!password) {
        throw new Error("Escribe la contraseña. Para primer ingreso usa la temporal verduleria.");
    }

    setInlineStatus(form, "Conectando con Supabase...", "notice");
    const { data, error } = await withSupabaseTimeout(
        state.client.auth.signInWithPassword({ email, password }),
        "Supabase no respondió al ingresar como administradora. Revisa la conexión e intenta nuevamente."
    );
    if (error) {
        throw error;
    }

    setInlineStatus(form, "Credenciales aceptadas. Verificando administradora...", "notice");
    state.session = data.session;
    writePreferredRole("admin");
    await syncIdentity("SIGNED_IN", { preferredRole: "admin", strictRole: "admin" });
    if (state.role !== "admin") {
        await state.client.auth.signOut();
        throw new Error(buildRoleLinkError("admin", email));
    }

    if (state.profile?.must_reset_password) {
        setInlineStatus(form, "Administradora validada. Abriendo cambio de contraseña...", "notice");
        state.flash = { tone: "notice", message: "Define una nueva contraseña para activar el panel." };
        navigate("/admin/cambiar-clave", true);
        return;
    }

    setInlineStatus(form, "Administradora validada. Abriendo panel...", "notice");
    state.flash = { tone: "notice", message: "Ingreso administrador correcto." };
    navigate("/admin/dashboard", true);
}

async function submitAdminPasswordReset(form) {
    const formData = new FormData(form);
    const password = String(formData.get("new_password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (password.length < 8) {
        throw new Error("La nueva contraseña debe tener al menos 8 caracteres.");
    }
    if (password.toLowerCase() === TEMP_ADMIN_PASSWORD) {
        throw new Error("Elige una contraseña distinta a la temporal.");
    }
    if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden.");
    }

    const updatedRows = await runQuery(
        state.client
            .from("admins")
            .update({ must_reset_password: false, password_reset_at: new Date().toISOString() })
            .eq("id", state.profile.id)
            .select("id,name,email,auth_user_id,must_reset_password,password_reset_at")
    );

    const { error } = await withSupabaseTimeout(
        state.client.auth.updateUser({ password }),
        "Supabase no respondió al actualizar la contraseña. Revisa la conexión e intenta nuevamente."
    );
    if (error) {
        try {
            await runQuery(
                state.client
                    .from("admins")
                    .update({ must_reset_password: true, password_reset_at: null })
                    .eq("id", state.profile.id)
                    .select("id")
            );
        } catch (resetError) {
            console.error(resetError);
        }
        throw error;
    }

    state.profile = normalizeAdmin(updatedRows[0] || { ...state.profile, must_reset_password: false });
    state.flash = { tone: "notice", message: "Contraseña actualizada. Ya puedes administrar la verdulería." };
    navigate("/admin/dashboard", true);
}

async function submitClientProfile(form) {
    const formData = new FormData(form);
    await updateClientProfile({
        name: formData.get("name"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        billing_type: formData.get("billing_type"),
    });
    state.flash = { tone: "notice", message: "Datos actualizados." };
    navigate("/cliente/dashboard", true);
}

async function submitClientOrder(form) {
    const formData = new FormData(form);
    const selections = collectOrderSelections(form);
    const sourceOrderId = Number(form.querySelector('input[name="source_order_id"]')?.value || 0);
    const clientNote = sanitizeText(formData.get("client_note"), MAX_CLIENT_NOTE_LENGTH);
    const otherRequest = sanitizeText(formData.get("other_request"), MAX_OTHER_REQUEST_LENGTH);
    const orderId = await createOrder(selections, sourceOrderId || null, clientNote, otherRequest);
    clearOrderDraft();
    state.flash = { tone: "notice", message: "Pedido guardado. El total fue calculado en Supabase." };
    navigate(`/cliente/pedido/${orderId}`, true);
}

async function submitProductSave(form) {
    const formData = new FormData(form);
    await saveProduct({
        id: Number(formData.get("product_id") || 0) || null,
        name: formData.get("name"),
        display_name: formData.get("display_name"),
        presentation: formData.get("presentation"),
        category: formData.get("category"),
        estimated_price: formData.get("estimated_price"),
        is_active: formData.get("is_active") === "1",
    });
    state.flash = { tone: "notice", message: "Producto guardado." };
    await renderCurrentRoute();
}

async function switchRole(role) {
    const targetRole = normalizeRole(role);
    if (!targetRole) {
        return;
    }

    await syncIdentity("", { preferredRole: targetRole, strictRole: targetRole });
    if (state.role !== targetRole) {
        throw new Error(targetRole === "client" ? buildRoleLinkError("client", state.session?.user?.email) : buildRoleLinkError("admin", state.session?.user?.email));
    }

    const target = targetRole === "client"
        ? "/cliente/dashboard"
        : (state.profile?.must_reset_password ? "/admin/cambiar-clave" : "/admin/dashboard");
    state.flash = { tone: "notice", message: targetRole === "client" ? "Modo clienta activo." : "Modo administrador activo." };
    navigate(target, true);
}

async function submitAdminOrderUpdate(form) {
    const formData = new FormData(form);
    const orderId = Number(form.dataset.orderId || 0);
    const itemUpdates = [];

    for (const row of form.querySelectorAll("[data-item-row]")) {
        itemUpdates.push({
            id: Number(row.dataset.itemId || 0),
            quantity: Number(row.dataset.quantity || 0),
            actual_price: formData.get(`actual_${row.dataset.itemId}`),
            item_note: formData.get(`note_${row.dataset.itemId}`),
            was_missing: formData.get(`missing_${row.dataset.itemId}`) === "1",
        });
    }

    const status = sanitizeText(formData.get("status"), 40) || "pendiente";
    await updateOrderActuals(orderId, status, formData.get("admin_note"), itemUpdates);
    state.flash = { tone: "notice", message: "Pedido actualizado." };
    await renderCurrentRoute();
}

async function printCurrentOrder(orderId, isAdmin) {
    const order = await fetchOrderById(orderId, isAdmin ? { includeClient: true } : { clientId: state.profile.id });
    if (!order) {
        throw new Error("No encontré el pedido para imprimir.");
    }
    openPrintWindow(buildOrderPrintMarkup(order, isAdmin));
}

async function printMonthlySummary(month) {
    const orders = await fetchOrders({
        clientId: state.profile.id,
        month,
        includeItems: true,
    });
    openPrintWindow(buildMonthlyPrintMarkup(state.profile, month, orders));
}

async function exportConsolidationCsv(month) {
    const orders = await fetchOrders({ month, includeItems: true });
    const consolidation = buildConsolidation(orders);
    const lines = [["semana", "producto", "cantidad", "unidad", "precio_unitario", "total"]];

    for (const week of consolidation) {
        for (const product of week.products) {
            lines.push([
                week.label,
                product.product_name,
                formatQty(product.cantidad),
                unitLabel(product.requested_unit),
                String(product.precio_unitario),
                String(product.total),
            ]);
        }
    }

    const csv = lines
        .map((line) => line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    downloadFile(`consolidado_${month}.csv`, "text/csv;charset=utf-8", csv);
}

async function openWhatsAppForOrder(orderId) {
    const order = await fetchOrderById(orderId, { includeClient: true });
    if (!order) {
        throw new Error("No encontré el pedido.");
    }

    const phone = formatPhoneInternational(order.client_phone || "");
    if (!phone) {
        throw new Error("La clienta no tiene un número válido para WhatsApp.");
    }

    const itemLines = order.items.map((item) => `- ${item.product_name} x ${formatOrderItemQuantity(item)}`);
    if (order.other_request) {
        itemLines.push(`- Otro: ${order.other_request}`);
    }

    const lines = [
        `Hola ${order.client_name || ""},`,
        `te comparto el resumen del pedido #${order.id}.`,
        "",
        ...itemLines,
        "",
        `Total actual/proyectado: ${formatCurrency(order.display_total)}`,
    ];

    const text = encodeURIComponent(lines.join("\n").trim());
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener");
}

function renderShell(title, content) {
    document.title = `${title} | ${APP_NAME}`;
    if (!appRoot) {
        return;
    }

    const flash = state.flash;
    state.flash = null;

    const shellClass = [
        "page-shell",
        state.role === "client" ? "client-shell" : "",
        state.role ? `role-${state.role}` : "public-shell",
    ].filter(Boolean).join(" ");

    appRoot.innerHTML = `
        <div class="${shellClass}">
            <header class="topbar">
                <a class="brand" href="#/">
                    <span class="brand-mark">
                        <img class="brand-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                    </span>
                    <span class="brand-copy">
                        <span class="brand-name">${e(APP_NAME)}</span>
                        <span class="brand-tagline">Tu feria personal</span>
                    </span>
                </a>
                <nav class="nav-links">
                    ${renderNavigation()}
                </nav>
            </header>
            <main class="content-shell">
                ${flash ? renderFlash(flash) : ""}
                ${content}
            </main>
            ${state.role === "client" ? renderClientBottomNav(clientBottomNavActive()) : ""}
        </div>
    `;
}

function renderStandalone(title, content) {
    document.title = `${title} | ${APP_NAME}`;
    if (appRoot) {
        appRoot.innerHTML = `
            <div class="page-shell">
                <main class="content-shell">
                    ${content}
                </main>
            </div>
        `;
    }
}

function renderNavigation() {
    if (state.role === "client") {
        return [
            `<a href="#/cliente/dashboard">Mi panel</a>`,
            `<a href="#/cliente/pedido/nuevo">Nuevo pedido</a>`,
            `<a href="#/cliente/perfil">Mi perfil</a>`,
            state.profiles.admin ? `<button type="button" data-action="switch-role" data-role="admin">Administrador</button>` : "",
            `<button type="button" data-action="logout">Salir</button>`,
        ].filter(Boolean).join("");
    }

    if (state.role === "admin") {
        if (state.profile?.must_reset_password) {
            return [
                `<a href="#/admin/cambiar-clave">Nueva clave</a>`,
                state.profiles.client ? `<button type="button" data-action="switch-role" data-role="client">Clienta</button>` : "",
                `<button type="button" data-action="logout">Salir</button>`,
            ].filter(Boolean).join("");
        }
        return [
            `<a href="#/admin/dashboard">Panel</a>`,
            `<a href="#/admin/pedidos">Pedidos</a>`,
            `<a href="#/admin/consolidado">Consolidado</a>`,
            `<a href="#/admin/productos">Productos</a>`,
            `<a href="#/admin/clientes">Clientas</a>`,
            state.profiles.client ? `<button type="button" data-action="switch-role" data-role="client">Clienta</button>` : "",
            `<button type="button" data-action="logout">Salir</button>`,
        ].filter(Boolean).join("");
    }

    return [
        `<button type="button" data-action="focus-category" data-target="landing-how">¿Cómo funciona?</button>`,
        `<button type="button" data-action="focus-category" data-target="landing-catalog">Catálogo</button>`,
        `<button type="button" data-action="focus-category" data-target="landing-about">Sobre nosotros</button>`,
        `<a class="nav-login-button" href="#/login-cliente">Ingresar</a>`,
    ].join("");
}

function clientBottomNavActive() {
    const path = state.route?.path || "";
    if (path.includes("perfil")) {
        return "perfil";
    }
    if (path.includes("pedido/nuevo")) {
        return "categorias";
    }
    if (path.includes("pedido/")) {
        return "pedidos";
    }
    return "inicio";
}

function renderFlash(flash) {
    const boxClass = flash.tone === "error" ? "error-box" : "notice-banner";
    return `<div class="${boxClass}"><p>${e(flash.message)}</p></div>`;
}

function renderHomePage() {
    return `
        <section class="landing-page">
            <section class="landing-hero">
                <figure class="landing-hero__image" aria-hidden="true">
                    <img src="${e(PROMO_IMAGE_URL)}" alt="Canasta con verduras frescas">
                </figure>
                <article class="landing-hero__card">
                    <img class="landing-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                    <p class="eyebrow">Tu feria personal</p>
                    <h1>Frescura directo a tu casa.</h1>
                    <p class="lead">Ingresa para armar tu pedido semanal de frutas, verduras y productos seleccionados.</p>
                    <div class="landing-actions">
                        <a class="button primary" href="#/login-cliente">Ingresar</a>
                        <button class="button ghost" type="button" data-action="focus-category" data-target="landing-catalog">Ver catálogo</button>
                    </div>
                    <p class="landing-proof">Productos frescos y seleccionados cada semana</p>
                </article>
            </section>

            <section class="landing-band" id="landing-how">
                <h2>¿Cómo funciona?</h2>
                <p>Entras, eliges tus productos por unidad o kg y envías tu pedido semanal para revisión.</p>
            </section>

            <section class="landing-band" id="landing-catalog">
                <h2>Catálogo seleccionado</h2>
                <div class="landing-preview-grid">
                    <article><span>Frutas</span><strong>Manzanas, plátanos, naranjas</strong></article>
                    <article><span>Verduras</span><strong>Tomates, zanahorias, brócoli</strong></article>
                    <article><span>Listos</span><strong>Bolsa de cazuela, chapsui</strong></article>
                </div>
            </section>

            <section class="landing-band" id="landing-about">
                <h2>Verduleria Isa</h2>
                <p>Tu feria personal para pedir productos frescos de forma simple desde el celular.</p>
            </section>
        </section>
    `;
}

function renderClientRegisterPage() {
    return `
        <section class="form-panel narrow auth-panel">
            <div class="access-card__logo-wrap compact">
                <img class="access-card__logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            </div>
            <p class="eyebrow">Nueva clienta</p>
            <h1>Crear cuenta</h1>
            <p class="muted">Completa tus datos de entrega para dejar tu cuenta lista y hacer pedidos.</p>
            <form class="stacked-form" data-form="client-register">
                <div class="split-grid">
                    <label>Nombre
                        <input type="text" name="name" autocomplete="name" required>
                    </label>
                    <label>Correo
                        <input type="email" name="email" autocomplete="email" required>
                    </label>
                    <label>Contraseña
                        <input type="password" name="password" minlength="8" autocomplete="new-password" required>
                    </label>
                    <label>Confirmar contraseña
                        <input type="password" name="confirm_password" minlength="8" autocomplete="new-password" required>
                    </label>
                    <label>Teléfono
                        <input type="tel" name="phone" autocomplete="tel" required>
                    </label>
                    <label>Tipo de pago
                        <select name="billing_type">
                            <option value="semanal">Semanal</option>
                            <option value="mensual">Mensual</option>
                        </select>
                    </label>
                </div>
                <label>Dirección
                    <textarea name="address" rows="3" autocomplete="street-address" required></textarea>
                </label>
                <p class="field-note" data-inline-status>Al guardar, Supabase creará tu usuario y la ficha de clienta.</p>
                <button class="button primary" type="submit" data-busy-text="Registrando...">Guardar registro</button>
            </form>
            <p class="muted">¿Ya tienes cuenta? <a href="#/login-cliente">Ingresa aquí</a></p>
        </section>
    `;
}

function renderClientLoginPage() {
    return `
        <section class="form-panel narrow auth-panel">
            <div class="access-card__logo-wrap compact">
                <img class="access-card__logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            </div>
            <p class="eyebrow">Ingreso clienta</p>
            <h1>Hola de nuevo</h1>
            <p class="muted">Ingresa con tu correo y contraseña.</p>
            <form class="stacked-form" data-form="client-login">
                <label>Correo
                    <input type="email" name="email" autocomplete="email" required>
                </label>
                <label>Contraseña
                    <input type="password" name="password" autocomplete="current-password" required>
                </label>
                <p class="field-note" data-inline-status>Si ya existías con este correo, la app intentará volver a enlazarte automáticamente.</p>
                <button class="button primary" type="submit" data-busy-text="Entrando...">Entrar</button>
            </form>
            <p class="muted">¿Aún no estás registrada? <a href="#/registro">Crear registro</a></p>
        </section>
    `;
}

function renderAdminLoginPage() {
    return `
        <section class="form-panel narrow">
            <h1>Ingreso administrador</h1>
            <p class="muted">Usa el correo administrador registrado. Si es primer ingreso, entra con la clave temporal entregada y la app pedirá crear una nueva.</p>
            <form class="stacked-form" data-form="admin-login" novalidate>
                <label>Correo
                    <input type="email" name="email" autocomplete="email" placeholder="nataliamillanassler@gmail.com" required>
                </label>
                <label>Contraseña
                    <input type="password" name="password" autocomplete="current-password" placeholder="Clave temporal o tu nueva clave" required>
                </label>
                <p class="field-note" data-admin-login-status>Proyecto Supabase: ${e(currentSupabaseProjectLabel())}</p>
                <button class="button primary" type="submit" data-busy-text="Ingresando...">Ingresar</button>
            </form>
        </section>
    `;
}

function renderAdminPasswordResetPage(admin) {
    return `
        <section class="form-panel narrow">
            <p class="eyebrow">Primer ingreso</p>
            <h1>Crea tu contraseña</h1>
            <p class="muted">${e(admin.email)} debe cambiar la clave temporal antes de abrir el panel.</p>
            <form class="stacked-form" data-form="admin-password-reset">
                <label>Nueva contraseña
                    <input type="password" name="new_password" minlength="8" autocomplete="new-password" required>
                </label>
                <label>Confirmar contraseña
                    <input type="password" name="confirm_password" minlength="8" autocomplete="new-password" required>
                </label>
                <button class="button primary" type="submit">Guardar nueva contraseña</button>
            </form>
        </section>
    `;
}

function renderClientDashboardPage(client, dashboard, month, products = [], draft = {}) {
    const firstName = firstWord(client.name) || "clienta";
    const selections = draft.selections || {};
    const clientNote = draft.client_note || "";
    const otherRequest = draft.other_request || "";
    const activeProducts = products.filter((product) => product.is_active !== false);
    const featuredProducts = selectFeaturedProducts(activeProducts);
    const quickCategories = CATEGORY_CHOICES.filter(([category]) => activeProducts.some((product) => product.category === category)).slice(0, 5);
    const weeks = dashboard.weeks.length
        ? dashboard.weeks.map((week, index) => `
            <details class="week-card" ${index === 0 ? "open" : ""}>
                <summary>
                    <div>
                        <strong>${e(week.label)}</strong>
                        <span>${week.orders.length} pedido(s)</span>
                    </div>
                    <strong>${formatCurrency(week.total)}</strong>
                </summary>
                <div class="details-stack">
                    ${week.orders.map((order) => renderClientOrderCard(order)).join("")}
                </div>
            </details>
        `).join("")
        : `<p class="muted">Todavía no hay pedidos en este mes.</p>`;
    const featuredMarkup = featuredProducts.length
        ? featuredProducts.map((product) => renderClientProductCard(product, selectionForProduct(selections, product.id), { category: product.category })).join("")
        : `<section class="empty-state"><p class="eyebrow">Catálogo</p><h2>Sin productos activos</h2><p class="muted">Puedes usar el campo Otro mientras la administradora actualiza el catálogo.</p></section>`;

    return `
        <section class="mobile-shop-home">
            <section class="shop-greeting">
                <div>
                    <h1>Hola, ${e(firstName)}.</h1>
                    <p>¿Qué frutas y verduras frescas vas a pedir hoy?</p>
                </div>
            </section>

            <div class="shop-searchbar mobile-searchbar">
                <input type="search" data-product-search placeholder="Buscar frutas, verduras y más..." aria-label="Buscar producto">
            </div>

            <nav class="category-tabs mobile-category-tabs" aria-label="Categorías principales">
                ${quickCategories.map(([value, label], index) => `<a class="category-chip ${index === 0 ? "is-active" : ""}" href="#/cliente/pedido/nuevo">${e(label)}</a>`).join("")}
            </nav>

            <section class="market-promo mobile-market-promo">
                <div class="market-promo__copy">
                    <p class="eyebrow">Selección semanal</p>
                    <h2>Frescura que se siente</h2>
                    <p>Productos escogidos para llegar directo a tu casa.</p>
                    <button class="promo-cta" type="button" data-action="focus-category" data-target="featured-products">Ver productos</button>
                </div>
                <figure class="promo-produce" aria-hidden="true">
                    <img class="promo-basket" src="${e(PROMO_IMAGE_URL)}" alt="Canasta con verduras frescas">
                </figure>
            </section>

            <form id="client-home-order-form" class="mobile-shop-order" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
                <input type="hidden" name="source_order_id" value="">
                <section class="featured-section product-columns" id="featured-products">
                    <div class="featured-heading">
                        <h2>Productos destacados</h2>
                        <a href="#/cliente/pedido/nuevo">Ver todos</a>
                    </div>
                    <p class="empty-search" data-product-search-empty hidden>No hay productos con esa búsqueda.</p>
                    <div class="product-table mobile-product-grid">
                        ${featuredMarkup}
                    </div>
                </section>

                <details class="home-notes-card">
                    <summary>Otro producto u observaciones</summary>
                    <label>Otro
                        <textarea name="other_request" rows="3" maxlength="${MAX_OTHER_REQUEST_LENGTH}" data-other-request placeholder="Pide aquí algo que no esté en el listado.">${e(otherRequest)}</textarea>
                    </label>
                    <label>Observaciones
                        <textarea name="client_note" rows="3" maxlength="${MAX_CLIENT_NOTE_LENGTH}" data-client-note>${e(clientNote)}</textarea>
                    </label>
                </details>

                <p class="field-note mobile-order-status" data-inline-status>Agrega productos y envía el pedido cuando esté listo.</p>

                <div class="floating-cart" data-floating-cart hidden>
                    <div class="floating-cart__summary">
                        <span data-selected-count>0</span>
                        <div>
                            <strong>Ver carrito</strong>
                            <small><span data-subtotal-estimated>${formatCurrency(0)}</span> en productos</small>
                        </div>
                    </div>
                    <strong data-estimated-total>${formatCurrency(DELIVERY_FEE)}</strong>
                    <button class="floating-cart__submit" type="submit" data-busy-text="Enviando..." aria-label="Enviar pedido">Enviar</button>
                </div>
            </form>

        </section>

        <section class="client-month-panel" id="client-orders">
            <div class="section-head compact-heading">
                <div>
                    <p class="eyebrow">Mis pedidos</p>
                    <h2>Resumen del mes</h2>
                    <p class="muted">${e(client.email)} | ${e(client.address)}</p>
                </div>
                <div class="hero-actions">
                    <form class="month-filter" data-form="client-dashboard-filter">
                        <input type="month" name="month" value="${e(month)}">
                        <button class="button ghost" type="submit">Ver mes</button>
                    </form>
                    <button class="button ghost" type="button" data-action="print-month" data-month="${e(month)}">Imprimir resumen</button>
                </div>
            </div>

            <section class="grid three-up">
                <article class="stat-card">
                    <span class="stat-value">${formatCurrency(dashboard.summary.monthly_total)}</span>
                    <span class="stat-label">gasto del mes</span>
                </article>
                <article class="stat-card">
                    <span class="stat-value">${dashboard.summary.order_count}</span>
                    <span class="stat-label">pedidos del mes</span>
                </article>
                <article class="stat-card">
                    <span class="stat-value">${formatCurrency(dashboard.summary.average_ticket)}</span>
                    <span class="stat-label">ticket promedio</span>
                </article>
            </section>

            <section class="panel">
                <h2>Desglose semanal</h2>
                ${weeks}
            </section>
        </section>
    `;
}

function renderClientProfilePage(client) {
    return `
        <section class="form-panel narrow">
            <p class="eyebrow">Cuenta clienta</p>
            <h1>Mi perfil</h1>
            <p class="muted">Correo: ${e(client.email)}</p>
            <form class="stacked-form" data-form="client-profile-update">
                <label>Nombre
                    <input type="text" name="name" value="${e(client.name)}" required>
                </label>
                <label>Teléfono
                    <input type="tel" name="phone" value="${e(client.phone)}" required>
                </label>
                <label>Dirección
                    <textarea name="address" rows="3" required>${e(client.address)}</textarea>
                </label>
                <label>Tipo de pago
                    <select name="billing_type">
                        <option value="semanal" ${client.billing_type === "semanal" ? "selected" : ""}>Semanal</option>
                        <option value="mensual" ${client.billing_type === "mensual" ? "selected" : ""}>Mensual</option>
                    </select>
                </label>
                <div class="hero-actions">
                    <button class="button primary" type="submit">Guardar datos</button>
                    <a class="button ghost" href="#/cliente/dashboard">Volver</a>
                </div>
            </form>
        </section>
    `;
}

function renderClientOrderCard(order) {
    const itemLines = order.items.length
        ? order.items.map((item) => `<li>${e(item.product_name)} x ${e(formatOrderItemQuantity(item))}</li>`).join("")
        : `<li>${order.other_request ? "Solicitud en Otro" : "Pedido sin productos del catálogo"}</li>`;
    return `
        <article class="order-card">
            <div class="order-card__top">
                <div>
                    <h3>Pedido #${order.id}</h3>
                    <p class="muted">${e(formatDateTime(order.created_at))} | ${e(statusLabel(order.status))}</p>
                </div>
                <div class="hero-actions">
                    <a class="button ghost" href="#/cliente/pedido/${order.id}">Ver detalle</a>
                    <a class="button ghost" href="#/cliente/pedido/nuevo?source=${order.id}">Repetir pedido</a>
                </div>
            </div>
            <ul class="simple-list">
                ${itemLines}
            </ul>
            ${order.other_request ? `<p class="muted">Otro: ${e(order.other_request)}</p>` : ""}
            <p class="order-total">Total: ${formatCurrency(order.display_total)}</p>
        </article>
    `;
}

function renderReadOnlyOrderItemRows(items, emptyColspan = 5) {
    return items.length
        ? items.map((item) => `
            <tr>
                <td>${e(item.product_name)}</td>
                <td>${e(formatOrderItemQuantity(item))}</td>
                <td>${formatCurrency(item.estimated_total)}</td>
                <td>${item.actual_total === null ? "-" : formatCurrency(item.actual_total)}</td>
                <td>${e(item.item_note || "-")}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="${emptyColspan}">Sin productos del catálogo. Revisa el campo Otro.</td></tr>`;
}

function renderAdminOrderItemEditRows(items) {
    return items.length
        ? items.map((item) => `
            <tr data-item-row data-item-id="${item.id}" data-quantity="${item.quantity}">
                <td>${e(item.product_name)}</td>
                <td>${e(formatOrderItemQuantity(item))}</td>
                <td>${formatCurrency(item.estimated_price)}</td>
                <td><input type="number" min="0" name="actual_${item.id}" value="${item.actual_price === null ? "" : e(String(item.actual_price))}"></td>
                <td>
                    <label class="checkbox-inline">
                        <input type="checkbox" name="missing_${item.id}" value="1" ${item.was_missing ? "checked" : ""}>
                        sí
                    </label>
                </td>
                <td><input type="text" name="note_${item.id}" value="${e(item.item_note || "")}" placeholder="Ej. se reemplazó, faltó, cambió precio"></td>
            </tr>
        `).join("")
        : `<tr><td colspan="6">Sin productos del catálogo. Revisa el campo Otro.</td></tr>`;
}

function renderProductThumb(product, className = 'product-thumb') {
    return `<img class='${e(className)}' src='${e(productImageSrc(product))}' alt='${e(productDisplayName(product))}' loading='lazy' referrerpolicy='no-referrer' data-fallback='${e(productFallbackImageSrc(product))}' onerror='this.onerror=null;this.src=this.dataset.fallback'>`;
}

function productImageSrc(product) {
    return productPhotoUrl(productPhotoTerms(product));
}

function productFallbackImageSrc(product) {
    const category = CATEGORY_LABELS[product.category] ? product.category : 'verduras_hortalizas';
    return productPhotoUrl(CATEGORY_PHOTO_TERMS[category] || 'Carrots');
}

function productPhotoTerms(product) {
    const haystack = normalizePhotoText([product.name, product.display_name, product.presentation].filter(Boolean).join(' '));
    const match = PRODUCT_PHOTO_TERMS.find(([pattern]) => pattern.test(haystack));
    return match ? match[1] : CATEGORY_PHOTO_TERMS[product.category] || 'Carrots';
}

function productPhotoUrl(terms) {
    const cleanTerms = String(terms || 'Carrots').trim() || 'Carrots';
    return `${PRODUCT_PHOTO_BASE}/${encodeURIComponent(cleanTerms)}${PRODUCT_PHOTO_VARIANT}.png`;
}

function normalizePhotoText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function productDisplayName(product) {
    return product.display_name || product.name;
}

function productSearchText(product) {
    return [product.name, product.display_name, product.presentation].filter(Boolean).join(' ').toLowerCase();
}

function productImageSlug(value) {
    return String(value || 'producto')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'producto';
}



function renderClientAppHeader(title = "Catálogo") {
    return `
        <header class="client-app-header">
            <a class="app-back-button" href="#/cliente/dashboard" aria-label="Volver al panel"></a>
            <img class="client-app-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            <button class="app-cart-button" type="button" data-action="focus-category" data-target="client-order-notes" aria-label="Ver carrito">
                <span class="app-cart-icon" aria-hidden="true"></span>
                <span data-selected-count>0</span>
            </button>
        </header>
    `;
}

function renderCatalogSupportChips() {
    return `
        <div class="catalog-support-chips" aria-label="Filtros rápidos">
            <button type="button">Temporada</button>
            <button type="button">A granel</button>
            <button type="button">Listos para cocinar</button>
            <button type="button">Oferta</button>
        </div>
    `;
}

function selectFeaturedProducts(products) {
    const preferred = [
        /manzana/,
        /platano|banana/,
        /naranja/,
        /tomate/,
        /lechuga/,
        /zanahoria/,
        /palta|aguacate/,
        /brocoli/,
    ];
    const chosen = [];
    const seen = new Set();

    for (const pattern of preferred) {
        const match = products.find((product) => !seen.has(product.id) && pattern.test(normalizePhotoText(productDisplayName(product))));
        if (match) {
            chosen.push(match);
            seen.add(match.id);
        }
    }

    for (const product of products) {
        if (chosen.length >= 8) {
            break;
        }
        if (!seen.has(product.id)) {
            chosen.push(product);
            seen.add(product.id);
        }
    }

    return chosen;
}

function selectionForProduct(selections, productId) {
    return selections?.[productId] || selections?.[String(productId)] || {};
}

function renderClientProductCard(product, selection = {}, options = {}) {
    const displayName = productDisplayName(product);
    const category = options.category || product.category || "";
    const selectedUnit = normalizeUnit(selection.requested_unit || selection.unit || "unidad");
    const quantity = normalizeQuantity(selection.quantity);
    const hasQuantity = quantity > 0;
    const quantityValue = hasQuantity ? formatQuantityInputValue(quantity) : "";

    return `
        <div class="product-row mobile-product-card ${hasQuantity ? "is-selected" : ""}" data-product-id="${product.id}" data-product-name="${e(productSearchText(product))}" data-product-category="${e(category)}">
            <button class="favorite-button" type="button" aria-label="Guardar ${e(displayName)} como favorito">&#9825;</button>
            <div class="product-info">
                ${renderProductThumb(product)}
                <div class="product-copy">
                    <strong>${e(displayName)}</strong>
                    ${product.presentation ? `<span class="product-presentation">${e(product.presentation)}</span>` : ""}
                    <span class="product-price">${formatCurrency(product.estimated_price)} <small>referencia</small></span>
                </div>
            </div>
            <div class="product-controls compact-product-controls">
                <button class="product-add-button" type="button" data-action="add-product" data-product-id="${product.id}" data-add-product ${hasQuantity ? "hidden" : ""}>Agregar</button>
                <div class="quantity-selector" data-quantity-selector ${hasQuantity ? "" : "hidden"}>
                    <button class="quantity-step" type="button" data-action="decrement-product" data-product-id="${product.id}" aria-label="Quitar ${e(displayName)}">-</button>
                    <input
                        type="number"
                        step="0.25"
                        min="0"
                        max="${MAX_QUANTITY}"
                        inputmode="decimal"
                        name="qty_${product.id}"
                        aria-label="Cantidad ${e(displayName)}"
                        value="${e(quantityValue)}"
                        data-price="${product.estimated_price}"
                        placeholder="0"
                        data-quantity-input
                    >
                    <button class="quantity-step" type="button" data-action="increment-product" data-product-id="${product.id}" aria-label="Agregar ${e(displayName)}">+</button>
                </div>
                <select name="unit_${product.id}" aria-label="Unidad ${e(displayName)}" data-unit-input>
                    ${UNIT_CHOICES.map(([value, label]) => `<option value="${value}" ${selectedUnit === value ? "selected" : ""}>${label}</option>`).join("")}
                </select>
            </div>
        </div>
    `;
}

function renderClientBottomNav(active = "inicio") {
    const item = (key, href, label, iconClass, disabled = false) => {
        const activeClass = active === key ? " active" : "";
        const icon = `<span class="nav-icon ${iconClass}" aria-hidden="true"></span>`;
        if (disabled) {
            return `<button class="${activeClass.trim()}" type="button" disabled>${icon}<span>${label}</span></button>`;
        }
        return `<a class="${activeClass.trim()}" href="${href}">${icon}<span>${label}</span></a>`;
    };
    return `
        <nav class="mobile-bottom-nav" aria-label="Navegación clienta">
            ${item("inicio", "#/cliente/dashboard", "Inicio", "nav-icon-home")}
            ${item("categorias", "#/cliente/pedido/nuevo", "Categorías", "nav-icon-grid")}
            ${item("pedidos", "#/cliente/dashboard", "Pedidos", "nav-icon-bag")}
            ${item("favoritos", "#", "Favoritos", "nav-icon-heart", true)}
            ${item("perfil", "#/cliente/perfil", "Perfil", "nav-icon-user")}
        </nav>
    `;
}

function renderClientOrderFormPage(products, draft, sourceOrder) {
    const selections = draft.selections || {};
    const clientNote = draft.client_note || "";
    const otherRequest = draft.other_request || "";
    const groupedProducts = groupProducts(products);
    const groupsMarkup = CATEGORY_CHOICES
        .map(([category, label]) => {
            const items = groupedProducts.get(category) || [];
            if (!items.length) {
                return "";
            }
            return `
                <div class="panel product-group" id="cat-${e(productImageSlug(category))}" data-product-group data-category="${e(category)}">
                    <h2>${e(label)}</h2>
                    <div class="product-table">
                        ${items.map((product) => renderClientProductCard(product, selectionForProduct(selections, product.id), { category })).join("")}
                    </div>
                </div>
            `;
        })
        .join("");

    return `
        <form class="catalog-app mobile-shop-order" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
            <input type="hidden" name="source_order_id" value="${sourceOrder?.id || ""}">
            ${renderClientAppHeader("Catálogo")}

            <section class="catalog-title-row">
                <h1>Catálogo</h1>
                ${sourceOrder ? `<div class="badge-block">Basado en el pedido #${sourceOrder.id}</div>` : ""}
            </section>

            <section class="catalog-toolbar">
                <div class="shop-searchbar catalog-search">
                    <input type="search" data-product-search placeholder="Buscar frutas, verduras y más..." aria-label="Buscar producto">
                </div>
                <button class="catalog-filter-button" type="button">Filtros</button>
                <button class="catalog-sort-button" type="button">Más pedidos</button>
            </section>

            <nav class="category-tabs catalog-category-tabs" aria-label="Categorías del catálogo">
                ${CATEGORY_CHOICES.map(([value, label]) => `<button class="category-chip" type="button" data-action="focus-category" data-target="cat-${e(productImageSlug(value))}" data-category-nav="${e(value)}">${e(label)}</button>`).join("")}
            </nav>

            ${renderCatalogSupportChips()}

            <section class="catalog-week-banner">
                <span aria-hidden="true"></span>
                <strong>Verduras frescas seleccionadas para esta semana</strong>
                <img src="${e(PROMO_IMAGE_URL)}" alt="Canasta con verduras frescas">
            </section>

            <section class="product-columns catalog-products" id="catalog-products">
                <p class="empty-search" data-product-search-empty hidden>No hay productos con esa búsqueda.</p>
                ${groupsMarkup || `<section class="empty-state"><p class="eyebrow">Catálogo</p><h2>Sin productos activos</h2><p class="muted">Puedes usar el campo Otro mientras la administradora actualiza el catálogo.</p></section>`}
            </section>

            <details class="home-notes-card catalog-notes-card" id="client-order-notes">
                <summary>Otro producto u observaciones</summary>
                <label>Otro
                    <textarea name="other_request" rows="3" maxlength="${MAX_OTHER_REQUEST_LENGTH}" data-other-request placeholder="Pide aquí algo que no esté en el listado.">${e(otherRequest)}</textarea>
                </label>
                <label>Observaciones
                    <textarea name="client_note" rows="3" maxlength="${MAX_CLIENT_NOTE_LENGTH}" data-client-note>${e(clientNote)}</textarea>
                </label>
            </details>

            <p class="field-note mobile-order-status" data-inline-status>Carrito guardado en este dispositivo. El campo Otro se revisa manualmente y no suma precio estimado.</p>

            <div class="floating-cart" data-floating-cart hidden>
                <div class="floating-cart__summary">
                    <span data-selected-count>0</span>
                    <div>
                        <strong>Ver carrito</strong>
                        <small><span data-subtotal-estimated>${formatCurrency(0)}</span> en productos</small>
                    </div>
                </div>
                <strong data-estimated-total>${formatCurrency(DELIVERY_FEE)}</strong>
                <button class="floating-cart__submit" type="submit" data-busy-text="Enviando..." aria-label="Enviar pedido">Enviar</button>
            </div>
        </form>
    `;
}

function renderClientOrderDetailPage(order) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Detalle</p>
                <h1>Pedido #${order.id}</h1>
                <p class="muted">${e(formatDateTime(order.created_at))} | Estado: ${e(statusLabel(order.status))}</p>
            </div>
            <div class="hero-actions">
                <button class="button ghost" type="button" data-action="print-order" data-order-id="${order.id}">Imprimir / PDF</button>
                <a class="button ghost" href="#/cliente/pedido/nuevo?source=${order.id}">Repetir pedido</a>
                <a class="button ghost" href="#/cliente/dashboard">Volver al panel</a>
            </div>
        </section>

        <section class="panel">
            <div class="grid three-up">
                <article class="stat-card">
                    <span class="stat-value">${formatCurrency(order.display_subtotal)}</span>
                    <span class="stat-label">${e(order.display_subtotal_label)}</span>
                </article>
                <article class="stat-card">
                    <span class="stat-value">${formatCurrency(order.delivery_fee)}</span>
                    <span class="stat-label">despacho fijo</span>
                </article>
                <article class="stat-card">
                    <span class="stat-value">${formatCurrency(order.display_total)}</span>
                    <span class="stat-label">total final o proyectado</span>
                </article>
            </div>
        </section>

        ${order.client_note ? `
            <section class="panel">
                <h2>Observaciones</h2>
                <p>${e(order.client_note)}</p>
            </section>
        ` : ""}

        ${order.other_request ? `
            <section class="panel">
                <h2>Otro</h2>
                <p>${e(order.other_request)}</p>
            </section>
        ` : ""}

        <section class="panel">
            <h2>Productos</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal estimado</th>
                        <th>Subtotal real</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderReadOnlyOrderItemRows(order.items)}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminDashboardPage(dashboard, recentOrders, month) {
    const topRows = dashboard.top_products.length
        ? dashboard.top_products.map((item) => `
            <tr>
                <td>${e(item.product_name)}</td>
                <td>${item.request_count}</td>
                <td>${e(formatQtyUnit(item.total_quantity, item.requested_unit))}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="3">Todavía no hay pedidos este mes.</td></tr>`;

    const lowRows = dashboard.low_products.length
        ? dashboard.low_products.map((item) => `
            <tr>
                <td>${e(item.product_name)}</td>
                <td>${item.request_count}</td>
                <td>${e(formatQtyUnit(item.total_quantity, item.requested_unit))}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="3">${dashboard.top_products.length ? "Aún no hay suficientes productos distintos para separar un ranking inferior." : "Todavía no hay pedidos este mes."}</td></tr>`;

    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Administración</p>
                <h1>Panel mensual</h1>
                <p class="muted">Mes analizado: ${e(month)}</p>
            </div>
            <form class="month-filter" data-form="admin-dashboard-filter">
                <input type="month" name="month" value="${e(month)}">
                <button class="button ghost" type="submit">Actualizar</button>
            </form>
        </section>

        <section class="grid three-up">
            <article class="stat-card">
                <span class="stat-value">${formatCurrency(dashboard.summary.revenue)}</span>
                <span class="stat-label">ingresos del mes con despacho</span>
            </article>
            <article class="stat-card">
                <span class="stat-value">${dashboard.summary.order_count}</span>
                <span class="stat-label">pedidos del mes</span>
            </article>
            <article class="stat-card">
                <span class="stat-value">${dashboard.summary.client_count}</span>
                <span class="stat-label">clientas con pedidos</span>
            </article>
        </section>

        <section class="grid two-up">
            <article class="panel">
                <h2>Top 5 más solicitados</h2>
                <table class="data-table compact">
                    <thead><tr><th>Producto</th><th>Solicitudes</th><th>Cantidad</th></tr></thead>
                    <tbody>${topRows}</tbody>
                </table>
            </article>
            <article class="panel">
                <h2>Top 5 menos solicitados</h2>
                <table class="data-table compact">
                    <thead><tr><th>Producto</th><th>Solicitudes</th><th>Cantidad</th></tr></thead>
                    <tbody>${lowRows}</tbody>
                </table>
            </article>
        </section>

        <section class="panel">
            <div class="section-head small-gap">
                <h2>Pedidos recientes</h2>
                <a class="button ghost" href="#/admin/pedidos?month=${e(month)}">Ver todos</a>
            </div>
            <table class="data-table">
                <thead>
                    <tr><th>Pedido</th><th>Clienta</th><th>Estado</th><th>Total</th><th></th></tr>
                </thead>
                <tbody>
                    ${recentOrders.length ? recentOrders.map((order) => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${e(order.client_name)}</td>
                            <td>${e(statusLabel(order.status))}</td>
                            <td>${formatCurrency(order.display_total)}</td>
                            <td><a href="#/admin/pedido/${order.id}">Abrir</a></td>
                        </tr>
                    `).join("") : `<tr><td colspan="5">Sin pedidos en este mes.</td></tr>`}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminOrdersPage(orders, month, status) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Seguimiento</p>
                <h1>Pedidos</h1>
            </div>
            <form class="inline-form compact-form" data-form="admin-orders-filter">
                <input type="month" name="month" value="${e(month)}">
                <select name="status">
                    <option value="" ${status ? "" : "selected"}>Todos los estados</option>
                    <option value="pendiente" ${status === "pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="comprado" ${status === "comprado" ? "selected" : ""}>Comprado</option>
                    <option value="pagado" ${status === "pagado" ? "selected" : ""}>Pagado</option>
                </select>
                <button class="button ghost" type="submit">Filtrar</button>
            </form>
        </section>

        <section class="panel">
            <table class="data-table">
                <thead>
                    <tr><th>Pedido</th><th>Clienta</th><th>Correo</th><th>Estado</th><th>Total</th><th>Fecha</th><th></th></tr>
                </thead>
                <tbody>
                    ${orders.length ? orders.map((order) => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${e(order.client_name)}</td>
                            <td>${e(order.client_email)}</td>
                            <td>${e(statusLabel(order.status))}</td>
                            <td>${formatCurrency(order.display_total)}</td>
                            <td>${e(formatDateTime(order.created_at))}</td>
                            <td><a href="#/admin/pedido/${order.id}">Abrir</a></td>
                        </tr>
                    `).join("") : `<tr><td colspan="7">No hay pedidos para este filtro.</td></tr>`}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminOrderDetailPage(order) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Ajuste de compra</p>
                <h1>Pedido #${order.id}</h1>
                <p class="muted">${e(order.client_name)} | ${e(order.client_email)} | ${e(order.client_phone)}</p>
            </div>
            <div class="hero-actions">
                <button class="button ghost" type="button" data-action="open-whatsapp" data-order-id="${order.id}">Enviar por WhatsApp</button>
                <button class="button ghost" type="button" data-action="print-order" data-order-id="${order.id}">Imprimir / PDF</button>
                <a class="button ghost" href="#/admin/pedidos">Volver</a>
            </div>
        </section>

        <section class="grid two-up compact-grid">
            <article class="panel">
                <h2>Datos de entrega</h2>
                <p>${e(order.client_address)}</p>
                ${order.client_note ? `<p class="muted">Observaciones: ${e(order.client_note)}</p>` : ""}
                ${order.other_request ? `<p class="muted">Otro: ${e(order.other_request)}</p>` : ""}
                <p class="muted">Creado: ${e(formatDateTime(order.created_at))}</p>
                <p class="muted">Teléfono: ${e(order.client_phone)}</p>
            </article>
            <article class="panel">
                <h2>Totales</h2>
                <div class="metric-line"><span>Subtotal estimado</span><strong>${formatCurrency(order.subtotal_estimated)}</strong></div>
                <div class="metric-line"><span>Subtotal real</span><strong>${order.subtotal_actual === null ? "-" : formatCurrency(order.subtotal_actual)}</strong></div>
                <div class="metric-line"><span>Despacho</span><strong>${formatCurrency(order.delivery_fee)}</strong></div>
                <div class="metric-line"><span>Total final</span><strong>${formatCurrency(order.display_total)}</strong></div>
                <div class="metric-line"><span>Estado actual</span><span class="status-pill" data-status="${e(order.status)}">${e(statusLabel(order.status))}</span></div>
            </article>
        </section>

        <form class="panel stacked-form" data-form="admin-order-update" data-order-id="${order.id}">
            <label>Estado del pedido
                <select name="status">
                    <option value="pendiente" ${order.status === "pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="comprado" ${order.status === "comprado" ? "selected" : ""}>Comprado</option>
                    <option value="pagado" ${order.status === "pagado" ? "selected" : ""}>Pagado</option>
                </select>
            </label>
            <label>Nota general
                <textarea name="admin_note" rows="3">${e(order.admin_note || "")}</textarea>
            </label>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio estimado</th>
                        <th>Precio real unitario</th>
                        <th>Faltó</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderAdminOrderItemEditRows(order.items)}
                </tbody>
            </table>
            <button class="button primary" type="submit">Guardar ajuste real</button>
        </form>
    `;
}

function renderAdminProductsPage(products) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Catálogo</p>
                <h1>Productos y precios</h1>
                <p class="muted">La edición en GitHub Pages ahora se guarda directo en Supabase con RLS.</p>
            </div>
        </section>

        <section class="panel">
            <h2>Agregar nuevo producto</h2>
            <form class="inline-form grid-form" data-form="admin-product-create">
                <input type="hidden" name="product_id" value="">
                <label>Nombre visible
                    <input type="text" name="display_name" required>
                </label>
                <label>Presentación
                    <input type="text" name="presentation" placeholder="1 kg, Unidad, 250 g">
                </label>
                <label>Categoría
                    <select name="category">
                        ${CATEGORY_CHOICES.map(([value, label]) => `<option value="${e(value)}">${e(label)}</option>`).join("")}
                    </select>
                </label>
                <label>Precio estimado
                    <input type="number" name="estimated_price" min="0" required>
                </label>
                <label>Activo
                    <select name="is_active">
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </label>
                <button class="button primary" type="submit">Guardar producto</button>
            </form>
        </section>

        <section class="panel">
            <h2>Editar productos actuales</h2>
            <div class="table-stack">
                ${products.map((product) => `
                    <form class="table-form-row product-admin-row" data-form="admin-product-update">
                        <input type="hidden" name="product_id" value="${product.id}">
                        <input type="hidden" name="name" value="${e(product.name)}">
                        ${renderProductThumb(product, "product-thumb small")}
                        <input type="text" name="display_name" value="${e(productDisplayName(product))}" title="Nombre interno: ${e(product.name)}" required>
                        <input type="text" name="presentation" value="${e(product.presentation)}" placeholder="1 kg">
                        <select name="category">
                            ${CATEGORY_CHOICES.map(([value, label]) => `<option value="${e(value)}" ${product.category === value ? "selected" : ""}>${e(label)}</option>`).join("")}
                        </select>
                        <input type="number" name="estimated_price" min="0" value="${product.estimated_price}" required>
                        <select name="is_active">
                            <option value="1" ${product.is_active ? "selected" : ""}>Activo</option>
                            <option value="0" ${product.is_active ? "" : "selected"}>Inactivo</option>
                        </select>
                        <button class="button ghost" type="submit">Guardar</button>
                    </form>
                `).join("")}
            </div>
        </section>
    `;
}

function renderAdminClientsPage(clients) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Base de clientas</p>
                <h1>Clientas registradas</h1>
            </div>
        </section>

        <section class="panel">
            <table class="data-table">
                <thead>
                    <tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Dirección</th><th>Pedidos</th><th>Pago</th></tr>
                </thead>
                <tbody>
                    ${clients.length ? clients.map((client) => `
                        <tr>
                            <td>${e(client.name)}</td>
                            <td>${e(client.email)}</td>
                            <td>${e(client.phone)}</td>
                            <td>${e(client.address)}</td>
                            <td>${client.order_count}</td>
                            <td>${e(client.billing_type || "semanal")}</td>
                        </tr>
                    `).join("") : `<tr><td colspan="6">Aún no hay clientas registradas.</td></tr>`}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminConsolidationPage(consolidation, month) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Operaciones</p>
                <h1>Consolidado de compras</h1>
                <p class="muted">Agregado de todos los pedidos por semana para lista de compra.</p>
            </div>
            <div class="hero-actions">
                <form class="month-filter" data-form="admin-consolidation-filter">
                    <input type="month" name="month" value="${e(month)}">
                    <button class="button ghost" type="submit">Filtrar mes</button>
                </form>
                <button class="button primary" type="button" data-action="export-consolidation" data-month="${e(month)}">Exportar CSV</button>
                <a class="button ghost" href="#/admin/dashboard">Volver</a>
            </div>
        </section>

        ${consolidation.length ? `
            <section class="panel">
                <h2>Resumen por semana</h2>
                ${consolidation.map((week, index) => `
                    <details class="week-card" ${index === 0 ? "open" : ""}>
                        <summary>
                            <div><strong>${e(week.label)}</strong></div>
                            <strong>${formatCurrency(week.total)}</strong>
                        </summary>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad Total</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${week.products.map((product) => `
                                    <tr>
                                        <td>${e(product.product_name)}</td>
                                        <td>${e(formatQtyUnit(product.cantidad, product.requested_unit))}</td>
                                        <td>${formatCurrency(product.precio_unitario)}</td>
                                        <td>${formatCurrency(product.total)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </details>
                `).join("")}
            </section>
        ` : `
            <section class="panel">
                <p class="muted">No hay pedidos en este período.</p>
            </section>
        `}
    `;
}

function renderLoadingCard(message) {
    return `
        <section class="loading-card">
            <div class="loading-spinner"></div>
            <h2>Cargando</h2>
            <p class="muted">${e(message)}</p>
        </section>
    `;
}

function renderNotFound(message) {
    return `
        <section class="empty-state">
            <p class="eyebrow">Sin coincidencias</p>
            <h1>No encontrado</h1>
            <p class="muted">${e(message)}</p>
        </section>
    `;
}

function renderSetupPanel(extraMessage = "") {
    return `
        <section class="panel setup-panel">
            <p class="eyebrow">Falta configurar</p>
            <h1>GitHub Pages necesita su propia capa pública</h1>
            <p class="muted">La app Flask original se queda intacta, pero esta versión estática necesita el archivo <code>docs/static/config.js</code> con la URL de Supabase y una <code>anon key</code>.</p>
            ${extraMessage ? `<div class="error-box"><p>${e(extraMessage)}</p></div>` : ""}
            <div class="list-grid">
                <p>1. Completa <code>docs/static/config.js</code> con tu <code>SUPABASE_ANON_KEY</code>.</p>
                <p>2. Ejecuta <code>supabase/sql/009_github_pages_auth.sql</code>, <code>supabase/sql/011_admin_first_login_setup.sql</code>, <code>supabase/sql/012_catalog_units_other_request.sql</code>, <code>supabase/sql/013_client_registration_repair.sql</code> y <code>supabase/sql/014_product_classification_presentation.sql</code> en el SQL Editor.</p>
                <p>3. Crea las administradoras en Supabase Auth con la clave temporal acordada.</p>
                <p>4. Publica la carpeta <code>docs/</code> desde GitHub Pages.</p>
            </div>
        </section>
    `;
}

function renderErrorView(error) {
    return `
        <section class="panel setup-panel">
            <p class="eyebrow">No pude abrir la app</p>
            <h1>Falta un paso de configuración</h1>
            <p class="muted">La versión estática depende de Supabase Auth + RLS. Si aún no corriste la migración nueva, esta pantalla es esperable.</p>
            <div class="error-box">
                <p>${e(friendlyError(error))}</p>
            </div>
            <div class="list-grid">
                <p>Archivos clave: <code>supabase/sql/009_github_pages_auth.sql</code>, <code>supabase/sql/011_admin_first_login_setup.sql</code>, <code>supabase/sql/012_catalog_units_other_request.sql</code>, <code>supabase/sql/013_client_registration_repair.sql</code> y <code>supabase/sql/014_product_classification_presentation.sql</code></p>
                <p>Config pública: <code>docs/static/config.js</code></p>
                <p>Publicación: GitHub Pages apuntando a la carpeta <code>docs/</code></p>
            </div>
        </section>
    `;
}

function refreshOrderSummary() {
    const form = document.querySelector("[data-order-form]");
    if (!form) {
        return;
    }

    const inputs = Array.from(form.querySelectorAll("[data-quantity-input]"));
    const totalNodes = Array.from(form.querySelectorAll("[data-estimated-total]"));
    const subtotalNodes = Array.from(form.querySelectorAll("[data-subtotal-estimated]"));
    const countNodes = Array.from(form.querySelectorAll("[data-selected-count]"));
    const deliveryFee = Number(form.dataset.deliveryFee || DELIVERY_FEE);

    let subtotal = 0;
    let selected = 0;
    for (const input of inputs) {
        const quantity = normalizeQuantity(String(input.value || "").replace(",", "."));
        const price = Number(input.dataset.price || 0);
        const row = input.closest(".product-row");
        const isSelected = quantity > 0;
        row?.classList.toggle("is-selected", isSelected);
        const addButton = row?.querySelector("[data-add-product]");
        if (addButton) {
            addButton.hidden = isSelected;
        }
        const quantitySelector = row?.querySelector("[data-quantity-selector]");
        if (quantitySelector) {
            quantitySelector.hidden = !isSelected;
        }
        if (isSelected) {
            selected += 1;
            subtotal += quantity * price;
        }
    }

    for (const node of subtotalNodes) {
        node.textContent = formatCurrency(subtotal);
    }
    for (const node of totalNodes) {
        node.textContent = formatCurrency(subtotal + deliveryFee);
    }
    for (const node of countNodes) {
        node.textContent = String(selected);
    }
    for (const node of form.querySelectorAll("[data-floating-cart]")) {
        node.hidden = selected <= 0;
    }
}

function filterOrderRows() {
    const search = document.querySelector('[data-product-search]');
    if (!search) {
        return;
    }
    const term = normalizePhotoText(search.value.trim());
    let visibleRows = 0;
    const visibleCategories = new Set();

    for (const row of document.querySelectorAll('.product-row')) {
        const name = normalizePhotoText(row.dataset.productName || '');
        const isVisible = !term || name.includes(term);
        row.hidden = !isVisible;
        if (isVisible) {
            visibleRows += 1;
            if (row.dataset.productCategory) {
                visibleCategories.add(row.dataset.productCategory);
            }
        }
    }

    for (const group of document.querySelectorAll('[data-product-group]')) {
        const category = group.dataset.category || '';
        group.hidden = !visibleCategories.has(category);
    }

    for (const button of document.querySelectorAll('[data-category-nav]')) {
        const category = button.dataset.categoryNav || '';
        button.hidden = !visibleCategories.has(category);
    }

    const emptySearch = document.querySelector('[data-product-search-empty]');
    if (emptySearch) {
        emptySearch.hidden = visibleRows > 0;
    }
}

function buildClientDashboard(orders) {
    const monthlyTotal = orders.reduce((sum, order) => sum + order.display_total, 0);
    const orderCount = orders.length;
    const averageTicket = orderCount ? Math.round(monthlyTotal / orderCount) : 0;
    const grouped = new Map();

    for (const order of orders) {
        const weekStart = startOfWeek(new Date(order.created_at));
        const key = weekStart.toISOString().slice(0, 10);
        if (!grouped.has(key)) {
            grouped.set(key, {
                label: `Semana del ${weekStart.toLocaleDateString("es-CL")}`,
                total: 0,
                orders: [],
            });
        }
        const bucket = grouped.get(key);
        bucket.total += order.display_total;
        bucket.orders.push(order);
    }

    return {
        summary: {
            monthly_total: monthlyTotal,
            order_count: orderCount,
            average_ticket: averageTicket,
        },
        weeks: [...grouped.values()],
    };
}

function buildAdminDashboard(orders) {
    const summary = {
        order_count: orders.length,
        client_count: new Set(orders.map((order) => order.client_id)).size,
        revenue: orders.reduce((sum, order) => sum + order.display_total, 0),
    };

    const grouped = new Map();
    for (const order of orders) {
        for (const item of order.items || []) {
            const key = `${item.product_name}||${item.requested_unit}`;
            const bucket = grouped.get(key) || {
                product_name: item.product_name,
                requested_unit: item.requested_unit,
                request_count: 0,
                total_quantity: 0,
                revenue: 0,
            };
            bucket.request_count += 1;
            bucket.total_quantity += item.quantity;
            bucket.revenue += item.actual_total ?? item.estimated_total;
            grouped.set(key, bucket);
        }
    }

    const ranked = [...grouped.values()].sort((a, b) => {
        return (
            b.request_count - a.request_count ||
            b.total_quantity - a.total_quantity ||
            a.product_name.localeCompare(b.product_name, "es")
        );
    });

    const topProducts = ranked.slice(0, 5);
    const topKeys = new Set(topProducts.map((row) => `${row.product_name}||${row.requested_unit}`));
    const lowProducts = [...grouped.values()]
        .filter((row) => !topKeys.has(`${row.product_name}||${row.requested_unit}`))
        .sort((a, b) => {
            return (
                a.request_count - b.request_count ||
                a.total_quantity - b.total_quantity ||
                a.product_name.localeCompare(b.product_name, "es")
            );
        })
        .slice(0, 5);

    return {
        summary,
        top_products: topProducts,
        low_products: lowProducts,
    };
}

function buildConsolidation(orders) {
    const weeks = new Map();

    for (const order of orders) {
        const orderDate = new Date(order.created_at);
        const weekNumber = isoWeekNumber(orderDate);
        const label = `Semana ${String(weekNumber).padStart(2, "0")} (${orderDate.getFullYear()})`;

        if (!weeks.has(label)) {
            weeks.set(label, new Map());
        }

        const products = weeks.get(label);
        for (const item of order.items || []) {
            const key = `${item.product_name}||${item.requested_unit}`;
            const current = products.get(key) || {
                product_name: item.product_name,
                requested_unit: item.requested_unit,
                cantidad: 0,
                precio_unitario: item.actual_price ?? item.estimated_price,
                total: 0,
            };
            const unitPrice = item.actual_price ?? item.estimated_price;
            current.cantidad += item.quantity;
            current.precio_unitario = unitPrice;
            current.total += Math.round(unitPrice * item.quantity);
            products.set(key, current);
        }
    }

    return [...weeks.entries()].map(([label, products]) => ({
        label,
        products: [...products.values()].sort((a, b) => a.product_name.localeCompare(b.product_name, "es")),
        total: [...products.values()].reduce((sum, product) => sum + product.total, 0),
    }));
}

function buildRepeatSelections(order) {
    const values = {};
    for (const item of order.items || []) {
        values[item.product_id] = {
            quantity: item.quantity,
            requested_unit: normalizeUnit(item.requested_unit),
        };
    }
    return values;
}

function readOrderDraft() {
    const emptyDraft = { selections: {}, client_note: "", other_request: "" };
    try {
        const raw = window.localStorage?.getItem(cartStorageKey());
        if (!raw) {
            return emptyDraft;
        }
        return normalizeOrderDraft(JSON.parse(raw));
    } catch (error) {
        return emptyDraft;
    }
}

function persistOrderDraft(form) {
    try {
        const formData = new FormData(form);
        const draft = {
            selections: collectOrderSelections(form, { relaxed: true }),
            client_note: sanitizeText(formData.get("client_note"), MAX_CLIENT_NOTE_LENGTH),
            other_request: sanitizeText(formData.get("other_request"), MAX_OTHER_REQUEST_LENGTH),
        };
        if (!Object.keys(draft.selections).length && !draft.client_note && !draft.other_request) {
            window.localStorage?.removeItem(cartStorageKey());
            return;
        }
        window.localStorage?.setItem(cartStorageKey(), JSON.stringify(draft));
    } catch (error) {
        // localStorage can be unavailable in strict privacy modes.
    }
}

function clearOrderDraft() {
    try {
        window.localStorage?.removeItem(cartStorageKey());
    } catch (error) {
        // localStorage can be unavailable in strict privacy modes.
    }
}

function cartStorageKey() {
    const userId = state.session?.user?.id || state.profile?.id || "anon";
    return `${CART_STORAGE_PREFIX}.${userId}`;
}

function normalizeOrderDraft(raw) {
    const draft = {
        selections: {},
        client_note: sanitizeText(raw?.client_note, MAX_CLIENT_NOTE_LENGTH),
        other_request: sanitizeText(raw?.other_request, MAX_OTHER_REQUEST_LENGTH),
    };

    const rawSelections = raw?.selections || {};
    for (const [rawProductId, rawSelection] of Object.entries(rawSelections)) {
        const productId = Number(rawProductId);
        const quantity = normalizeQuantity(rawSelection?.quantity ?? rawSelection);
        if (productId && quantity > 0) {
            draft.selections[productId] = {
                quantity,
                requested_unit: normalizeUnit(rawSelection?.requested_unit || rawSelection?.unit),
            };
        }
    }

    const legacyQuantities = raw?.quantities || {};
    const legacyUnits = raw?.units || {};
    for (const [rawProductId, rawQuantity] of Object.entries(legacyQuantities)) {
        const productId = Number(rawProductId);
        if (draft.selections[productId]) {
            continue;
        }
        const quantity = normalizeQuantity(rawQuantity);
        if (productId && quantity > 0) {
            draft.selections[productId] = {
                quantity,
                requested_unit: normalizeUnit(legacyUnits[rawProductId]),
            };
        }
    }

    return draft;
}

function collectOrderSelections(form, options = {}) {
    const selections = {};
    for (const input of form.querySelectorAll("[data-quantity-input]")) {
        const productId = Number(input.name.replace("qty_", ""));
        const rawValue = String(input.value || "").replace(",", ".");
        const quantity = normalizeQuantity(rawValue);
        if (!productId || quantity <= 0) {
            continue;
        }
        if (quantity > MAX_QUANTITY) {
            if (options.relaxed) {
                continue;
            }
            throw new Error(`La cantidad máxima por producto es ${MAX_QUANTITY}.`);
        }
        const unitNode = form.querySelector(`[name="unit_${productId}"]`);
        selections[productId] = {
            quantity,
            requested_unit: normalizeUnit(unitNode?.value),
        };
    }
    return selections;
}

function buildSecureOrderItems(selections) {
    return Object.entries(selections)
        .map(([productId, selection]) => ({
            product_id: Number(productId),
            quantity: normalizeQuantity(selection?.quantity ?? selection),
            requested_unit: normalizeUnit(selection?.requested_unit || selection?.unit),
        }))
        .filter((item) => item.product_id && item.quantity > 0 && item.quantity <= MAX_QUANTITY);
}

function normalizeQuantity(value) {
    const quantity = Number(String(value || "").replace(",", "."));
    if (!Number.isFinite(quantity) || quantity <= 0) {
        return 0;
    }
    return Math.round(quantity * 100) / 100;
}

function buildOrderPrintMarkup(order, includeClient) {
    return `
        <div class="print-sheet">
            <h1>Pedido #${order.id}</h1>
            <p>${e(formatDateTime(order.created_at))} | Estado: ${e(statusLabel(order.status))}</p>
            ${includeClient ? `<p>Clienta: ${e(order.client_name)} | ${e(order.client_email)} | ${e(order.client_phone)}</p>` : ""}
            ${order.client_note ? `<p>Observaciones: ${e(order.client_note)}</p>` : ""}
            ${order.other_request ? `<p>Otro: ${e(order.other_request)}</p>` : ""}
            <div class="print-sheet__summary">
                <div class="print-sheet__card">
                    <strong>${formatCurrency(order.display_subtotal)}</strong>
                    <p>${e(order.display_subtotal_label)}</p>
                </div>
                <div class="print-sheet__card">
                    <strong>${formatCurrency(order.delivery_fee)}</strong>
                    <p>Despacho fijo</p>
                </div>
                <div class="print-sheet__card">
                    <strong>${formatCurrency(order.display_total)}</strong>
                    <p>Total final</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Estimado</th>
                        <th>Real</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderReadOnlyOrderItemRows(order.items)}
                </tbody>
            </table>
        </div>
    `;
}

function buildMonthlyPrintMarkup(client, month, orders) {
    const dashboard = buildClientDashboard(orders);
    return `
        <div class="print-sheet">
            <h1>Resumen mensual</h1>
            <p>Clienta: ${e(client.name)} | Mes: ${e(month)}</p>
            <p>${e(client.email)} | ${e(client.address)}</p>
            <div class="print-sheet__summary">
                <div class="print-sheet__card">
                    <strong>${formatCurrency(dashboard.summary.monthly_total)}</strong>
                    <p>Gasto del mes</p>
                </div>
                <div class="print-sheet__card">
                    <strong>${dashboard.summary.order_count}</strong>
                    <p>Pedidos</p>
                </div>
                <div class="print-sheet__card">
                    <strong>${formatCurrency(dashboard.summary.average_ticket)}</strong>
                    <p>Ticket promedio</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map((order) => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${e(formatDateTime(order.created_at))}</td>
                            <td>${e(statusLabel(order.status))}</td>
                            <td>${formatCurrency(order.display_total)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

function openPrintWindow(markup) {
    const popup = window.open("", "_blank", "noopener,noreferrer,width=960,height=720");
    if (!popup) {
        throw new Error("Tu navegador bloqueó la ventana de impresión.");
    }

    popup.document.open();
    popup.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <title>Imprimir | ${e(APP_NAME)}</title>
            <style>
                body { font-family: Aptos, "Segoe UI", Arial, sans-serif; margin: 24px; color: #173127; }
                h1 { margin-bottom: 8px; }
                p { margin: 4px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #d9e2db; }
                .print-sheet__summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
                .print-sheet__card { border: 1px solid #d9e2db; border-radius: 16px; padding: 12px; background: #fafcf9; }
            </style>
        </head>
        <body>${markup}</body>
        </html>
    `);
    popup.document.close();
    popup.focus();
    popup.print();
}

function parseHashRoute() {
    let raw = window.location.hash.replace(/^#/, "") || "/";
    if (!raw.startsWith("/")) {
        raw = `/${raw}`;
    }
    const [pathPart, queryString = ""] = raw.split("?");
    return {
        path: normalizePath(pathPart),
        query: new URLSearchParams(queryString),
    };
}

function navigate(path, replace = false) {
    const target = `#${path.startsWith("/") ? path : `/${path}`}`;
    if (replace) {
        window.history.replaceState(null, "", target);
        onRouteChange();
        return;
    }
    window.location.hash = target;
}

function normalizePath(path) {
    if (!path || path === "/") {
        return "/";
    }
    return path.replace(/\/+$/, "");
}

function monthRange(month) {
    const [year, monthNumber] = month.split("-").map(Number);
    const start = new Date(year, monthNumber - 1, 1);
    const end = new Date(year, monthNumber, 1);
    return {
        start: start.toISOString(),
        end: end.toISOString(),
    };
}

function currentMonthValue() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function validMonth(value) {
    const text = String(value || "");
    return /^\d{4}-\d{2}$/.test(text) ? text : "";
}

function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function firstWord(value) {
    return String(value || "").trim().split(/\s+/)[0] || "";
}

function sanitizeText(value, maxLength = 255) {
    return String(value || "").trim().slice(0, maxLength);
}

function deriveNameFromEmail(email) {
    return email ? email.split("@")[0].replace(/[._-]+/g, " ") : "";
}

function statusLabel(status) {
    return STATUS_LABELS[status] || status || "Pendiente";
}

function formatCurrency(value) {
    return `$${Math.round(Number(value) || 0).toLocaleString("es-CL")}`;
}

function formatQty(value) {
    const number = Number(value || 0);
    if (Number.isInteger(number)) {
        return String(number);
    }
    return number.toFixed(2).replace(/\.?0+$/, "").replace(".", ",");
}

function normalizeUnit(value) {
    return value === "kg" ? "kg" : "unidad";
}

function unitLabel(value) {
    return normalizeUnit(value) === "kg" ? "Kg" : "Unidad";
}

function formatQtyUnit(quantity, requestedUnit) {
    return `${formatQty(quantity)} ${unitLabel(requestedUnit)}`;
}

function formatOrderItemQuantity(item) {
    return formatQtyUnit(item.quantity, item.requested_unit);
}

function formatDateTime(value) {
    if (!value) {
        return "-";
    }
    return new Date(value).toLocaleString("es-CL", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function compareProducts(a, b) {
    const categoryDiff = categoryRank(a.category) - categoryRank(b.category);
    if (categoryDiff !== 0) {
        return categoryDiff;
    }
    return productDisplayName(a).localeCompare(productDisplayName(b), "es");
}

function categoryRank(category) {
    const index = CATEGORY_CHOICES.findIndex(([value]) => value === category);
    return index === -1 ? CATEGORY_CHOICES.length : index;
}

function groupProducts(products) {
    const map = new Map();
    for (const product of products) {
        if (!map.has(product.category)) {
            map.set(product.category, []);
        }
        map.get(product.category).push(product);
    }
    return map;
}

function startOfWeek(date) {
    const copy = new Date(date);
    const day = copy.getDay() || 7;
    copy.setHours(0, 0, 0, 0);
    copy.setDate(copy.getDate() - day + 1);
    return copy;
}

function isoWeekNumber(date) {
    const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = copy.getUTCDay() || 7;
    copy.setUTCDate(copy.getUTCDate() + 4 - dayNumber);
    const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
    return Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
}

function formatPhoneInternational(phone) {
    let digits = String(phone || "").replace(/\D/g, "");
    if (!digits) {
        return "";
    }
    if (digits.startsWith("56")) {
        return digits;
    }
    if (digits.startsWith("0")) {
        digits = digits.slice(1);
    }
    return `56${digits}`;
}

function normalizeAdmin(row) {
    return {
        id: Number(row.id),
        name: String(row.name || ""),
        email: normalizeEmail(row.email),
        auth_user_id: row.auth_user_id || "",
        must_reset_password: Boolean(row.must_reset_password),
        password_reset_at: row.password_reset_at || null,
    };
}

function normalizeClient(row) {
    return {
        id: Number(row.id),
        name: String(row.name || ""),
        email: normalizeEmail(row.email),
        phone: String(row.phone || ""),
        address: String(row.address || ""),
        billing_type: row.billing_type === "mensual" ? "mensual" : "semanal",
        auth_user_id: row.auth_user_id || "",
        created_at: row.created_at || "",
        updated_at: row.updated_at || "",
        last_login_at: row.last_login_at || null,
    };
}

function normalizeProduct(row) {
    const name = String(row.name || "").trim();
    const displayName = sanitizeText(row.display_name || name, 120);
    return {
        id: Number(row.id),
        name,
        display_name: displayName,
        presentation: sanitizeText(row.presentation, 80),
        category: CATEGORY_LABELS[row.category] ? row.category : "verduras_hortalizas",
        estimated_price: Math.round(Number(row.estimated_price) || 0),
        is_active: Boolean(row.is_active),
        created_at: row.created_at || "",
        updated_at: row.updated_at || "",
    };
}

function normalizeOrder(row) {
    return {
        id: Number(row.id),
        client_id: Number(row.client_id),
        source_order_id: row.source_order_id ? Number(row.source_order_id) : null,
        status: String(row.status || "pendiente"),
        admin_note: String(row.admin_note || ""),
        client_note: String(row.client_note || ""),
        other_request: String(row.other_request || ""),
        estimated_total: Math.round(Number(row.estimated_total) || 0),
        actual_total: row.actual_total === null || row.actual_total === undefined ? null : Math.round(Number(row.actual_total)),
        created_at: row.created_at || "",
        updated_at: row.updated_at || "",
        purchased_at: row.purchased_at || null,
    };
}

function normalizeOrderItem(row) {
    return {
        id: Number(row.id),
        order_id: Number(row.order_id),
        product_id: Number(row.product_id),
        product_name: String(row.product_name || ""),
        quantity: Number(row.quantity || 0),
        requested_unit: normalizeUnit(row.requested_unit),
        estimated_price: Math.round(Number(row.estimated_price) || 0),
        estimated_total: Math.round(Number(row.estimated_total) || 0),
        actual_price: row.actual_price === null || row.actual_price === undefined ? null : Math.round(Number(row.actual_price)),
        actual_total: row.actual_total === null || row.actual_total === undefined ? null : Math.round(Number(row.actual_total)),
        item_note: String(row.item_note || ""),
        was_missing: Boolean(row.was_missing),
    };
}

function decorateOrderTotals(order) {
    const subtotalEstimated = order.estimated_total;
    const subtotalActual = order.actual_total;
    const actualBase = subtotalActual === null ? subtotalEstimated : subtotalActual;
    return {
        ...order,
        subtotal_estimated: subtotalEstimated,
        subtotal_actual: subtotalActual,
        display_subtotal: actualBase,
        display_subtotal_label: subtotalActual === null ? "subtotal estimado de productos" : "subtotal real de productos",
        delivery_fee: DELIVERY_FEE,
        estimated_total_with_delivery: subtotalEstimated + DELIVERY_FEE,
        actual_total_with_delivery: actualBase + DELIVERY_FEE,
        display_total: actualBase + DELIVERY_FEE,
    };
}

function clientProfileFields() {
    return "id,name,email,phone,address,billing_type,auth_user_id,created_at,updated_at,last_login_at";
}

function normalizeRole(role) {
    return role === "admin" || role === "client" ? role : "";
}

function preferredRoleFromRoute() {
    const path = state.route?.path || parseHashRoute().path || "";
    if (path.startsWith("/cliente") || path === "/login-cliente" || path === "/registro") {
        return "client";
    }
    if (path.startsWith("/admin")) {
        return "admin";
    }
    return "";
}

function readPreferredRole() {
    try {
        return normalizeRole(window.localStorage?.getItem(ROLE_STORAGE_KEY));
    } catch (error) {
        return "";
    }
}

function writePreferredRole(role) {
    const normalized = normalizeRole(role);
    try {
        if (normalized) {
            window.localStorage?.setItem(ROLE_STORAGE_KEY, normalized);
        } else {
            window.localStorage?.removeItem(ROLE_STORAGE_KEY);
        }
    } catch (error) {
        // localStorage can be unavailable in strict privacy modes.
    }
}

function currentAppUrl() {
    return window.location.href.split("#")[0];
}

function currentSupabaseProjectLabel() {
    const url = String(window.VERDULERIA_CONFIG?.SUPABASE_URL || "");
    if (!url) {
        return "este proyecto";
    }
    try {
        return new URL(url).host.replace(".supabase.co", "");
    } catch (error) {
        return url;
    }
}

function buildRoleLinkError(role, email) {
    const normalizedEmail = normalizeEmail(email) || "ese correo";
    const project = currentSupabaseProjectLabel();

    if (role === "admin") {
        return `Ingresaste en Supabase Auth con ${normalizedEmail}, pero esta app no encontró una administradora asociada en el proyecto ${project}. Revisa la tabla admins, ejecuta supabase/sql/011_admin_first_login_setup.sql después de crear el usuario Auth y confirma que docs/static/config.js apunte al Supabase correcto.`;
    }

    return `Ingresaste en Supabase Auth con ${normalizedEmail}, pero esta app no encontró una clienta asociada en el proyecto ${project}. Si ese correo ya existe como administradora, entra por Registro con el mismo correo y contraseña para crear también la ficha de clienta.`;
}

function setFormBusy(form, busy) {
    form.dataset.busy = busy ? "1" : "";
    for (const button of form.querySelectorAll("button")) {
        if (button.type !== "submit") {
            continue;
        }
        if (busy) {
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.textContent;
            }
            button.textContent = button.dataset.busyText || "Procesando...";
            button.setAttribute("aria-busy", "true");
        } else {
            if (button.dataset.originalText) {
                button.textContent = button.dataset.originalText;
                delete button.dataset.originalText;
            }
            button.removeAttribute("aria-busy");
        }
    }
}

function hasInlineStatus(form) {
    return Boolean(form.querySelector("[data-inline-status], [data-admin-login-status]"));
}

function setInlineStatus(form, message, tone = "notice") {
    const statusNode = form.querySelector("[data-inline-status], [data-admin-login-status]");
    if (!statusNode) {
        return;
    }
    statusNode.textContent = message;
    statusNode.classList.toggle("inline-error", tone === "error");
}

function withSupabaseTimeout(promise, message, timeoutMs = SUPABASE_TIMEOUT_MS) {
    let timeoutId = 0;
    const timeout = new Promise((_, reject) => {
        timeoutId = window.setTimeout(() => reject(new Error(message)), timeoutMs);
    });
    return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
}

async function runQuery(query) {
    const { data, error } = await query;
    if (error) {
        throw error;
    }
    return data || [];
}

async function fetchSingleRow(query) {
    const rows = await runQuery(query.limit(1));
    return rows[0] || null;
}

function friendlyError(error) {
    const raw = typeof error === "string" ? error : error?.message || "Ocurrió un problema inesperado.";
    if (/must_reset_password|password_reset_at/i.test(raw)) {
        return "Falta ejecutar supabase/sql/011_admin_first_login_setup.sql en Supabase para activar el primer ingreso administrador.";
    }
    if (/relation .*admins.* does not exist|public\.admins/i.test(raw)) {
        return "No encontré la tabla admins en Supabase. Revisa que hayas ejecutado el esquema inicial en el SQL Editor.";
    }
    if (/column .*billing_type.*does not exist/i.test(raw)) {
        return "Falta ejecutar supabase/sql/013_client_registration_repair.sql en Supabase para completar el registro de clientas.";
    }
    if (/column .*display_name.*does not exist|column .*presentation.*does not exist|products_category_check|invalid input value .*products/i.test(raw)) {
        return "Falta ejecutar supabase/sql/014_product_classification_presentation.sql en Supabase para activar las categorías nuevas y la presentación limpia.";
    }
    if (/column .*client_note.*does not exist|column .*other_request.*does not exist|column .*requested_unit.*does not exist|function .*create_secure_order/i.test(raw)) {
        return "Falta ejecutar supabase/sql/012_catalog_units_other_request.sql en Supabase. Abre el archivo, copia todo su contenido y pegalo en el SQL Editor; no pegues solo el nombre del archivo.";
    }
    if (/database error saving new user|error saving user|violates row-level security.*clients|new row violates row-level security/i.test(raw)) {
        return "Supabase no pudo completar el registro de clienta. Ejecuta supabase/sql/013_client_registration_repair.sql y vuelve a intentar.";
    }
    if (/security purposes|only request this after/i.test(raw)) {
        return "Supabase está limitando temporalmente ese intento por seguridad. Espera el tiempo indicado y vuelve a probar.";
    }
    if (/failed to fetch|networkerror|load failed|no se puede resolver|err_/i.test(raw)) {
        return "No pude conectar con Supabase. Revisa internet, el proyecto configurado y vuelve a intentar.";
    }
    return raw
        .replace(/row-level security/gi, "permisos RLS")
        .replace(/jwt/gi, "sesión")
        .replace(/invalid login credentials/gi, "Correo o contraseña inválidos.")
        .replace(/duplicate key value violates unique constraint/gi, "Ya existe un registro con esos datos.")
        .replace(/Email not confirmed/gi, "Debes confirmar tu correo antes de ingresar.");
}

function downloadFile(filename, mimeType, contents) {
    const blob = new Blob([contents], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

function e(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
