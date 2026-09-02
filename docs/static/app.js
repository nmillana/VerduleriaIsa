const CATEGORY_CHOICES = [
    ["frutas", "Frutas"],
    ["verduras_hortalizas", "Verduras y hortalizas"],
    ["hojas_ensaladas", "Hojas y ensaladas"],
    ["hierbas_alinos", "Hierbas y aliños"],
    ["listos_cocinar", "Listos para cocinar"],
    ["legumbres_frutos_aceitunas", "Legumbres, frutos secos y aceitunas"],
    ["huevos_despensa", "Huevos y despensa"],
    ["pescados_mariscos", "Pescados / mariscos"],
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
const ADMIN_ACCESS_EMAILS = new Set(["isabelsoledadster@gmail.com", "nataliamillanassler@gmail.com"]);
const PRODUCT_BASE_FIELDS = "id,name,display_name,presentation,category,estimated_price,is_active,created_at,updated_at";
const PRODUCT_FIELDS_WITH_IMAGE = `${PRODUCT_BASE_FIELDS},image_url`;
const UNIT_CHOICES = [["kg", "Kg"], ["unidad", "Unidad"]];
const PRODUCT_PHOTO_BASE = 'https://www.themealdb.com/images/ingredients';
const PRODUCT_PHOTO_VARIANT = '-medium';
const PRODUCT_IMAGE_BUCKET = 'product-images';
const PRODUCT_STORAGE_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_PRODUCT_IMAGE_UPLOAD_BYTES = 6 * 1024 * 1024;
const CATEGORY_PHOTO_TERMS = {
    frutas: 'Apples',
    verduras_hortalizas: 'Carrots',
    hojas_ensaladas: 'Lettuce',
    hierbas_alinos: 'Parsley',
    listos_cocinar: 'Mixed Peppers',
    legumbres_frutos_aceitunas: 'Chickpeas',
    huevos_despensa: 'Eggs',
    pescados_mariscos: 'Salmon',
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
    [/pescado|fish|salmon|atun|reineta|merluza|congrio/, 'Salmon'],
    [/marisco|shrimp|camaron|chorito|macha|almeja|ostion|jaiba|locos/, 'Shrimp'],
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
    productImageColumnAvailable: null,
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
        const recoveryOptions = event === "PASSWORD_RECOVERY"
            ? { preferredRole: "client", strictRole: "client" }
            : {};
        await syncIdentity(event, recoveryOptions);
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

    if (event === "PASSWORD_RECOVERY") {
        writePreferredRole("client");
        state.flash = { tone: "notice", message: "Enlace validado. Ahora crea una nueva contraseña." };
        navigate("/cliente/recuperar-clave", true);
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
    if (route.path === "/cliente/pedido/nuevo" || route.path === "/cliente/carrito") {
        refreshOrderSummary();
        filterOrderRows();
    }
    if (route.path === "/cliente/pedido/nuevo" && route.query.get("category")) {
        const target = `cat-${productImageSlug(route.query.get("category"))}`;
        window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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
            const target = state.profile?.must_reset_password ? "/cliente/cambiar-clave" : "/cliente/pedido/nuevo";
            return redirectView(target, "", "notice", "Abriendo catálogo...");
        }
        return { title: "Acceso", content: renderHomePage() };
    }

    if (route.path === "/registro") {
        if (state.role === "client") {
            const target = state.profile?.must_reset_password ? "/cliente/cambiar-clave" : "/cliente/pedido/nuevo";
            return redirectView(target, "", "notice", "Abriendo catálogo...");
        }
        return { title: "Registro", content: renderClientRegisterPage() };
    }

    if (route.path === "/login-cliente") {
        if (state.role === "client") {
            const target = state.profile?.must_reset_password ? "/cliente/cambiar-clave" : "/cliente/pedido/nuevo";
            return redirectView(target, "", "notice", "Abriendo catálogo...");
        }
        return { title: "Ingreso clienta", content: renderClientLoginPage() };
    }

    if (route.path === "/cliente/recuperar-clave") {
        if (state.role === "client") {
            return { title: "Nueva clave", content: renderClientPasswordResetPage(state.profile, { mode: "recovery" }) };
        }
        return { title: "Recuperar clave", content: renderClientPasswordRecoveryPage() };
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

    if (route.path === "/cliente/cambiar-clave") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        return { title: "Nueva clave", content: renderClientPasswordResetPage(state.profile) };
    }

    if (route.path.startsWith("/cliente/") && state.role === "client" && state.profile?.must_reset_password) {
        return redirectView("/cliente/cambiar-clave", "Primero crea una nueva contraseña para continuar.", "notice");
    }

    if (route.path === "/cliente/dashboard") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const orders = await fetchOrders({
            clientId: state.profile.id,
            month,
            includeItems: true,
        });
        return {
            title: "Mis pedidos",
            content: renderClientDashboardPage(state.profile, buildClientDashboard(orders), month),
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

    if (route.path === "/cliente/carrito") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const products = await fetchProducts();
        const draftResult = await resolveOrderDraftFromRoute(route);
        if (draftResult.view) {
            return draftResult.view;
        }
        return {
            title: draftResult.editOrder ? "Editar pedido" : "Carrito",
            content: renderClientCartReviewPage(products, draftResult.draft),
        };
    }

    if (route.path === "/cliente/pedido/nuevo") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const products = await fetchProducts();
        const editId = Number(route.query.get("edit") || 0);
        const sourceId = Number(route.query.get("source") || 0);
        const editOrder = editId ? await fetchOrderById(editId, { clientId: state.profile.id }) : null;
        if (editId && !editOrder) {
            return { title: "No encontrado", content: renderNotFound("No encontré ese pedido para editar.") };
        }
        if (editOrder && editOrder.status !== "pendiente") {
            return redirectView(`/cliente/pedido/${editOrder.id}`, "Solo puedes editar pedidos pendientes.", "error");
        }
        const sourceOrder = !editOrder && sourceId ? await fetchOrderById(sourceId, { clientId: state.profile.id }) : null;
        const latestOrder = !editOrder && !sourceOrder
            ? (await fetchOrders({ clientId: state.profile.id, includeItems: true, limit: 1 }))[0] || null
            : null;
        const baseOrder = editOrder || sourceOrder;
        const draft = baseOrder
            ? draftFromOrderOrCurrent(baseOrder, Boolean(editOrder))
            : readOrderDraft();
        return {
            title: editOrder ? "Editar pedido" : "Nuevo pedido",
            content: renderClientOrderFormPage(products, draft, sourceOrder, editOrder, latestOrder, route),
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
        await refreshPendingOrderPricing(orderId);
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

    if (/^\/admin\/clientes\/\d+\/pedido$/.test(route.path)) {
        const redirect = requireRole('admin', '/admin/login', 'Debes ingresar como administradora.');
        if (redirect) {
            return redirect;
        }
        const clientId = Number(route.path.split('/')[3]);
        const client = await fetchClientById(clientId);
        if (!client) {
            return { title: 'No encontrado', content: renderNotFound('No encontré esa clienta.') };
        }
        const products = await fetchProducts();
        return {
            title: `Pedido manual | ${client.name}`,
            content: renderAdminClientOrderPage(client, products),
        };
    }

    if (route.path === "/admin/cobros-mensuales") {
        const redirect = requireRole("admin", "/admin/login", "Debes ingresar como administradora.");
        if (redirect) {
            return redirect;
        }
        const orders = await fetchOrders({ month, includeClients: true });
        return {
            title: "Cobros mensuales",
            content: renderAdminMonthlyBillingPage(buildMonthlyBilling(orders), month),
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
    if (!isAdminAccessEmail(email)) {
        return null;
    }
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
    const fields = state.productImageColumnAvailable === false ? PRODUCT_BASE_FIELDS : PRODUCT_FIELDS_WITH_IMAGE;
    let rows;
    try {
        rows = await runQuery(buildProductsQuery(fields, options));
        if (fields === PRODUCT_FIELDS_WITH_IMAGE) {
            state.productImageColumnAvailable = true;
        }
    } catch (error) {
        if (!isMissingProductImageColumn(error)) {
            throw error;
        }
        state.productImageColumnAvailable = false;
        rows = await runQuery(buildProductsQuery(PRODUCT_BASE_FIELDS, options));
    }

    return rows.map(normalizeProduct).sort((a, b) => compareProducts(a, b));
}

function buildProductsQuery(fields, options = {}) {
    let query = state.client
        .from("products")
        .select(fields)
        .order("display_name");

    if (!options.includeInactive) {
        query = query.eq("is_active", true);
    }

    return query;
}

async function fetchClientsWithOrderCounts() {
    const clients = (await runQuery(
        state.client
            .from("clients")
            .select(clientProfileFields())
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

    if (options.limit) {
        query = query.limit(Math.max(1, Number(options.limit) || 1));
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
            client_billing_type: client?.billing_type || "semanal",
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
        client_billing_type: client?.billing_type || "semanal",
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
            .select(clientProfileFields())
            .in("id", uniqueIds)
    );

    return new Map(rows.map((row) => {
        const client = normalizeClient(row);
        return [client.id, client];
    }));
}

async function fetchClientById(clientId) {
    const clients = await fetchClientsByIds([clientId]);
    return clients.get(Number(clientId)) || null;
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

async function createManualOrderForClient(clientId, selections, clientNote, otherRequest) {
    if (state.role !== 'admin' || !canShowAdminAccess()) {
        throw new Error('Debes ingresar como administradora para crear pedidos manuales.');
    }
    if (!clientId) {
        throw new Error('No pude identificar la clienta.');
    }
    if (!state.session?.access_token) {
        throw new Error('Debes tener una sesión administradora activa.');
    }

    const items = buildSecureOrderItems(selections);
    const cleanOtherRequest = sanitizeText(otherRequest, MAX_OTHER_REQUEST_LENGTH);
    if (!items.length && !cleanOtherRequest) {
        throw new Error('Selecciona productos o completa el campo Otro.');
    }

    const { data, error } = await withSupabaseTimeout(
        state.client.functions.invoke('admin-create-client-order', {
            body: {
                client_id: clientId,
                items,
                client_note: sanitizeText(clientNote, MAX_CLIENT_NOTE_LENGTH) || null,
                other_request: cleanOtherRequest || null,
            },
        }),
        'Supabase no respondió al crear el pedido manual.'
    );
    if (error) {
        const detail = await functionErrorMessage(error);
        throw new Error(detail || error.message);
    }
    if (!data?.ok || !data?.order_id) {
        throw new Error(data?.error || 'No pude crear el pedido manual.');
    }
    return Number(data.order_id);
}

async function replacePendingOrder(orderId, selections, clientNote, otherRequest) {
    const items = buildSecureOrderItems(selections);
    const cleanOtherRequest = sanitizeText(otherRequest, MAX_OTHER_REQUEST_LENGTH);
    if (!items.length && !cleanOtherRequest) {
        throw new Error("Selecciona productos o completa el campo Otro.");
    }

    const { data, error } = await state.client.rpc("replace_pending_order", {
        p_order_id: orderId,
        p_items: items,
        p_client_note: sanitizeText(clientNote, MAX_CLIENT_NOTE_LENGTH) || null,
        p_other_request: cleanOtherRequest || null,
    });

    if (error) {
        throw error;
    }

    const updatedOrderId = Number(data);
    if (!updatedOrderId) {
        throw new Error("Supabase no devolvió el número del pedido actualizado.");
    }
    return updatedOrderId;
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

async function createManualClient(values) {
    const payload = {
        auth_user_id: null,
        name: sanitizeText(values.name, 120),
        email: normalizeEmail(values.email),
        phone: sanitizeText(values.phone, 40),
        address: sanitizeText(values.address, 255),
        billing_type: values.billing_type === 'mensual' ? 'mensual' : 'semanal',
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.address) {
        throw new Error('Completa nombre, correo, teléfono y dirección. El correo queda como dato de contacto aunque la clienta no use la app.');
    }

    const rows = await runQuery(
        state.client
            .from('clients')
            .insert(payload)
            .select(clientProfileFields())
    );
    return normalizeClient(rows[0] || payload);
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
    const hasImageUrlField = Object.prototype.hasOwnProperty.call(values, "image_url");
    const rawImageUrl = hasImageUrlField ? sanitizeText(values.image_url, 1000) : "";
    const imageUrl = safeProductImageUrl(rawImageUrl);
    if (rawImageUrl && !imageUrl) {
        throw new Error("La imagen debe ser una URL http(s) o una ruta ./static/...");
    }

    const payload = {
        display_name: displayName,
        presentation,
        category: CATEGORY_LABELS[values.category] ? values.category : "verduras_hortalizas",
        estimated_price: Math.max(0, Math.round(Number(values.estimated_price) || 0)),
        is_active: values.is_active === true,
    };
    if (hasImageUrlField) {
        payload.image_url = imageUrl || null;
    }

    if (!displayName) {
        throw new Error("El nombre visible del producto es obligatorio.");
    }

    try {
        await saveProductMutation(values.id, payload, displayName);
    } catch (error) {
        if (!isMissingProductImageColumn(error) || imageUrl || !hasImageUrlField) {
            throw error;
        }
        await saveProductMutation(values.id, withoutImageUrl(payload), displayName);
    }
}

async function saveProductMutation(productId, payload, displayName) {
    if (productId) {
        await runQuery(
            state.client
                .from("products")
                .update(payload)
                .eq("id", productId)
                .select("id")
        );
        return;
    }

    await runQuery(state.client.from("products").insert({ ...payload, name: displayName }).select("id"));
}

function withoutImageUrl(payload) {
    const copy = { ...payload };
    delete copy.image_url;
    return copy;
}

async function updateOrderActuals(orderId, status, adminNote, itemUpdates, extraItems = []) {
    for (const item of itemUpdates) {
        const wasMissing = Boolean(item.was_missing);
        const numericPrice = Math.round(Number(item.actual_price));
        const actualPrice = wasMissing || item.actual_price === "" || !Number.isFinite(numericPrice)
            ? null
            : Math.max(0, numericPrice);
        const actualTotal = wasMissing
            ? 0
            : actualPrice === null
                ? null
                : Math.round(actualPrice * Number(item.quantity));

        await runQuery(
            state.client
                .from("order_items")
                .update({
                    actual_price: actualPrice,
                    actual_total: actualTotal,
                    item_note: sanitizeText(item.item_note, 255),
                    was_missing: wasMissing,
                })
                .eq("id", item.id)
                .eq("order_id", orderId)
                .select("id")
        );
    }

    for (const item of extraItems) {
        const quantity = normalizeQuantity(item.quantity);
        const actualPrice = Math.max(0, Math.round(Number(item.actual_price) || 0));
        const actualTotal = Math.round(actualPrice * quantity);
        await runQuery(
            state.client
                .from("order_items")
                .insert({
                    order_id: orderId,
                    product_id: null,
                    product_name: sanitizeText(item.product_name, 120),
                    quantity,
                    requested_unit: normalizeUnit(item.requested_unit),
                    estimated_price: 0,
                    estimated_total: 0,
                    actual_price: actualPrice,
                    actual_total: actualTotal,
                    item_note: sanitizeText(item.item_note || "Agregado post pedido", 255),
                    was_missing: false,
                })
                .select("id")
        );
    }


    await recalculateOrderTotals(orderId, {
        status,
        admin_note: sanitizeText(adminNote, 500),
        purchased_at: status === "comprado" || status === "pagado" ? new Date().toISOString() : null,
    });
}

async function refreshPendingOrderPricing(orderId) {
    if (!orderId || state.role !== "admin") {
        return;
    }

    const order = await fetchSingleRow(
        state.client
            .from("orders")
            .select("id,status")
            .eq("id", orderId)
    );
    if (!order || String(order.status || "pendiente") !== "pendiente") {
        return;
    }

    const currentItems = (await fetchOrderItemsByOrderIds([orderId])).get(orderId) || [];
    const productIds = [...new Set(currentItems.map((item) => item.product_id).filter(Boolean))];
    if (!productIds.length) {
        await recalculateOrderTotals(orderId);
        return;
    }

    const products = await runQuery(
        state.client
            .from("products")
            .select("id,estimated_price")
            .in("id", productIds)
    );
    const pricesByProductId = new Map(products.map((product) => [
        Number(product.id),
        Math.max(0, Math.round(Number(product.estimated_price) || 0)),
    ]));

    for (const item of currentItems) {
        const currentPrice = pricesByProductId.get(item.product_id);
        if (currentPrice === undefined) {
            continue;
        }
        const currentEstimatedTotal = Math.round(currentPrice * item.quantity);
        if (item.estimated_price === currentPrice && item.estimated_total === currentEstimatedTotal) {
            continue;
        }
        await runQuery(
            state.client
                .from("order_items")
                .update({
                    estimated_price: currentPrice,
                    estimated_total: currentEstimatedTotal,
                })
                .eq("id", item.id)
                .eq("order_id", orderId)
                .select("id")
        );
    }

    await recalculateOrderTotals(orderId);
}

async function recalculateOrderTotals(orderId, orderPatch = {}) {
    const updatedItems = (await fetchOrderItemsByOrderIds([orderId])).get(orderId) || [];
    const estimatedTotal = updatedItems.reduce((sum, item) => sum + item.estimated_total, 0);
    const hasActualValues = updatedItems.some((item) => item.was_missing || item.actual_total !== null);
    const displayTotal = updatedItems.reduce((sum, item) => {
        if (item.was_missing) {
            return sum;
        }
        return sum + (item.actual_total ?? item.estimated_total);
    }, 0);

    await runQuery(
        state.client
            .from("orders")
            .update({
                ...orderPatch,
                estimated_total: estimatedTotal,
                actual_total: hasActualValues ? displayTotal : null,
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


    if (kind === "admin-monthly-billing-filter") {
        const month = validMonth(new FormData(form).get("month")) || currentMonthValue();
        navigate(`/admin/cobros-mensuales?month=${month}`);
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
            case "client-password-recovery":
                await submitClientPasswordRecovery(form);
                break;
            case "admin-login":
                await submitAdminLogin(form);
                break;
            case "admin-password-reset":
                await submitAdminPasswordReset(form);
                break;
            case "client-password-reset":
                await submitClientPasswordReset(form);
                break;
            case "client-profile-update":
                await submitClientProfile(form);
                break;
            case "client-order-create":
                await submitClientOrder(form);
                break;
            case "admin-client-create":
                await submitAdminClientCreate(form);
                break;
            case "admin-client-order-create":
                await submitAdminClientOrder(form);
                break;
            case "admin-product-create":
            case "admin-product-update":
                await submitProductSave(form);
                break;
            case "admin-products-bulk-update":
                await submitProductsBulkSave(form);
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
            case "print-monthly-client":
                await printAdminMonthlyStatement(Number(actionNode.dataset.clientId), actionNode.dataset.month || currentMonthValue());
                break;
            case "open-monthly-whatsapp":
                await openWhatsAppForMonthlyStatement(Number(actionNode.dataset.clientId), actionNode.dataset.month || currentMonthValue());
                break;
            case "close-week":
                await closeWeek(actionNode.dataset.weekStart, actionNode.dataset.weekEnd);
                break;
            case "export-consolidation":
                await exportConsolidationXls(actionNode.dataset.month || currentMonthValue());
                break;
            case "export-products":
                await exportProductsXls();
                break;
            case "reset-client-password":
                await resetClientPassword(Number(actionNode.dataset.clientId), actionNode.dataset.clientName, actionNode.dataset.clientEmail);
                break;
            case "open-whatsapp":
                await openWhatsAppForOrder(Number(actionNode.dataset.orderId));
                break;
            case "focus-category":
                document.getElementById(actionNode.dataset.target || "")?.scrollIntoView({ behavior: "smooth", block: "start" });
                break;
            case "open-cart-review": {
                const form = actionNode.closest("[data-order-form]") || document.querySelector("[data-order-form]");
                if (form) {
                    persistOrderDraft(form);
                }
                navigate("/cliente/carrito");
                break;
            }
            case "cancel-order-edit":
                clearOrderDraft();
                navigate(actionNode.dataset.target || "/cliente/dashboard");
                break;
            case "focus-search":
                document.querySelector(actionNode.dataset.target || "[data-product-search]")?.focus();
                break;
            case "add-product":
            case "increment-product":
            case "decrement-product":
            case "remove-product":
                await updateProductQuantity(actionNode, action);
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

async function updateProductQuantity(actionNode, action) {
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
    const unitNode = form.querySelector(`[name="unit_${productId}"]:checked`) || form.querySelector(`[name="unit_${productId}"]`);
    const step = normalizeUnit(unitNode?.value) === "kg" ? 0.5 : 1;
    let next = current;

    if (action === "remove-product") {
        next = 0;
    } else if (action === "decrement-product") {
        next = Math.max(0, current - step);
    } else if (current > 0) {
        next = Math.min(MAX_QUANTITY, current + step);
    } else {
        next = step;
    }

    input.value = next > 0 ? formatQuantityInputValue(next) : "";
    refreshOrderSummary();
    if (next <= 0) {
        removeProductFromDraft(productId, form);
    } else {
        persistOrderDraft(form);
    }
    if (next <= 0 && form.classList.contains("cart-review-page")) {
        await renderCurrentRoute();
    }
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

    if (state.profile?.must_reset_password) {
        state.flash = { tone: "notice", message: "Ingresa una nueva contraseña para continuar." };
        navigate("/cliente/cambiar-clave", true);
        return;
    }

    state.flash = { tone: "notice", message: "Bienvenida de vuelta." };
    navigate("/cliente/pedido/nuevo", true);
}

async function submitClientPasswordRecovery(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));

    if (!email) {
        throw new Error("Escribe tu correo para enviarte el enlace seguro.");
    }

    setInlineStatus(form, "Enviando enlace seguro...", "notice");
    const redirectTo = `${appBaseUrl()}#/cliente/recuperar-clave`;
    const { error } = await withSupabaseTimeout(
        state.client.auth.resetPasswordForEmail(email, { redirectTo }),
        "Supabase no respondió al enviar el enlace de recuperación. Revisa la conexión e intenta nuevamente."
    );
    if (error) {
        throw error;
    }

    state.flash = {
        tone: "notice",
        message: "Te enviamos un enlace seguro para crear una nueva contraseña. Si no llega, revisa spam o pide a administración resetear tu clave temporal.",
    };
    navigate("/login-cliente", true);
}
async function submitAdminLogin(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    if (!email) {
        throw new Error("Escribe el correo administrador completo.");
    }
    if (!isAdminAccessEmail(email)) {
        throw new Error("Este correo no tiene acceso de administración.");
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

async function submitClientPasswordReset(form) {
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

    const { error } = await withSupabaseTimeout(
        state.client.auth.updateUser({ password }),
        "Supabase no respondió al actualizar la contraseña. Revisa la conexión e intenta nuevamente."
    );
    if (error) {
        throw error;
    }

    const now = new Date().toISOString();
    const updatedRows = await runQuery(
        state.client
            .from("clients")
            .update({ must_reset_password: false, password_reset_at: now })
            .eq("id", state.profile.id)
            .select(clientProfileFields())
    );

    const client = normalizeClient(updatedRows[0] || { ...state.profile, must_reset_password: false, password_reset_at: now });
    setActiveProfile("client", client);
    state.flash = { tone: "notice", message: "Contraseña actualizada. Ya puedes hacer pedidos." };
    navigate("/cliente/pedido/nuevo", true);
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

async function submitAdminClientCreate(form) {
    const formData = new FormData(form);
    const client = await createManualClient({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        billing_type: formData.get('billing_type'),
    });
    form.reset();
    state.flash = { tone: 'notice', message: `Clienta ${client.name} creada manualmente. Ahora puedes registrar su pedido.` };
    navigate(`/admin/clientes/${client.id}/pedido`, true);
}

async function submitAdminClientOrder(form) {
    const formData = new FormData(form);
    const clientId = Number(formData.get('client_id') || 0);
    const selections = collectOrderSelections(form);
    const orderId = await createManualOrderForClient(
        clientId,
        selections,
        formData.get('client_note'),
        formData.get('other_request')
    );
    state.flash = { tone: 'notice', message: `Pedido #${orderId} creado para la clienta.` };
    navigate(`/admin/pedido/${orderId}`, true);
}

async function resetClientPassword(clientId, clientName, clientEmail) {
    if (state.role !== "admin" || !canShowAdminAccess()) {
        throw new Error("Debes ingresar como administradora para resetear claves.");
    }
    if (!clientId) {
        throw new Error("No pude identificar la clienta.");
    }
    if (!state.session?.access_token) {
        throw new Error("Debes tener una sesión administradora activa.");
    }

    const label = clientName || clientEmail || `clienta #${clientId}`;
    const confirmed = typeof window.confirm === "function"
        ? window.confirm(`La clave temporal de ${label} quedará como ${TEMP_ADMIN_PASSWORD}. Al ingresar, la app le pedirá crear una nueva contraseña. ¿Continuar?`)
        : true;
    if (!confirmed) {
        return;
    }

    const { data, error } = await withSupabaseTimeout(
        state.client.functions.invoke("admin-reset-client-password", {
            body: { client_id: clientId, temporary_password: TEMP_ADMIN_PASSWORD },
        }),
        "Supabase no respondió al resetear la contraseña de la clienta."
    );
    if (error) {
        const detail = await functionErrorMessage(error);
        throw new Error(detail || error.message);
    }
    if (!data?.ok) {
        throw new Error(data?.error || "No pude resetear la contraseña de la clienta.");
    }

    const temporaryPassword = data.temporary_password || TEMP_ADMIN_PASSWORD;
    state.flash = {
        tone: "notice",
        message: `Clave temporal de ${label}: ${temporaryPassword}. Debe ingresar y crear una nueva contraseña.`,
    };
    await renderCurrentRoute();
}

async function functionErrorMessage(error) {
    try {
        if (error?.context && typeof error.context.json === "function") {
            const payload = await error.context.json();
            return payload?.error || payload?.message || "";
        }
    } catch (parseError) {
        console.error(parseError);
    }
    return error?.message || "";
}

async function submitClientOrder(form) {
    const formData = new FormData(form);
    const existingDraft = readOrderDraft();
    const selections = mergeOrderSelections(existingDraft.selections, collectOrderSelections(form), collectOrderProductIds(form));
    const sourceOrderId = Number(form.querySelector('input[name="source_order_id"]')?.value || 0);
    const clientNote = sanitizeText(formData.get("client_note"), MAX_CLIENT_NOTE_LENGTH);
    const otherRequest = sanitizeText(formData.get("other_request"), MAX_OTHER_REQUEST_LENGTH);
    const editOrderId = Number(form.querySelector('input[name="edit_order_id"]')?.value || 0);
    const orderId = editOrderId
        ? await replacePendingOrder(editOrderId, selections, clientNote, otherRequest)
        : await createOrder(selections, sourceOrderId || null, clientNote, otherRequest);
    clearOrderDraft();
    state.flash = { tone: "notice", message: editOrderId ? "Solicitud actualizada." : "Pedido guardado. El total fue calculado en Supabase." };
    navigate(`/cliente/pedido/${orderId}`, true);
}

async function submitProductSave(form) {
    const values = readProductFormValues(form);
    await saveProduct(values);

    if (values.image_file) {
        try {
            await uploadProductImage(values.image_file, values);
            state.flash = { tone: "notice", message: "Producto guardado con imagen." };
        } catch (error) {
            state.flash = { tone: "error", message: `Producto guardado, pero no pude subir la imagen: ${friendlyError(error)}` };
        }
    } else {
        state.flash = { tone: "notice", message: "Producto guardado." };
    }

    await renderCurrentRoute();
}

async function submitProductsBulkSave(form) {
    const rows = Array.from(form.querySelectorAll("[data-product-row]"));
    if (!rows.length) {
        return;
    }
    for (const row of rows) {
        await saveProduct(readProductFormValues(row));
    }
    state.flash = { tone: "notice", message: `${rows.length} productos guardados.` };
    await renderCurrentRoute();
}

function readProductFormValues(container) {
    const value = (name) => container.querySelector(`[name="${name}"]`)?.value || "";
    const values = {
        id: Number(value("product_id") || 0) || null,
        name: value("name"),
        display_name: value("display_name"),
        presentation: value("presentation"),
        category: value("category"),
        estimated_price: value("estimated_price"),
        is_active: value("is_active") === "1",
    };
    const imageInput = container.querySelector('[name="image_url"]');
    if (imageInput) {
        values.image_url = imageInput.value || "";
    }
    const imageFileInput = container.querySelector('[name="image_file"]');
    const imageFile = imageFileInput?.files?.[0] || null;
    if (imageFile && imageFile.size > 0) {
        values.image_file = imageFile;
    }
    return values;
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
        ? "/cliente/pedido/nuevo"
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
    const extraItems = collectAdminOrderExtraItems(form, formData);
    await updateOrderActuals(orderId, status, formData.get("admin_note"), itemUpdates, extraItems);
    state.flash = { tone: "notice", message: "Pedido actualizado." };
    await renderCurrentRoute();
}


function collectAdminOrderExtraItems(form, formData = new FormData(form)) {
    return Array.from(form.querySelectorAll("[data-extra-item-row]"))
        .map((row) => {
            const index = row.dataset.extraIndex;
            const productName = sanitizeText(formData.get(`extra_name_${index}`), 120);
            const quantity = normalizeQuantity(formData.get(`extra_qty_${index}`));
            const actualPrice = parseAdminMoneyValue(formData.get(`extra_price_${index}`));
            const itemNote = sanitizeText(formData.get(`extra_note_${index}`), 255);
            const requestedUnit = normalizeUnit(formData.get(`extra_unit_${index}`));
            const hasAnyValue = Boolean(productName || quantity || actualPrice !== null || itemNote);

            if (!hasAnyValue) {
                return null;
            }
            if (!productName || quantity <= 0 || actualPrice === null) {
                throw new Error("Completa nombre, cantidad y valor unitario real para cada producto post pedido.");
            }

            return {
                product_name: productName,
                quantity,
                requested_unit: requestedUnit,
                actual_price: actualPrice,
                item_note: itemNote,
            };
        })
        .filter(Boolean);
}

function parseAdminMoneyValue(value) {
    const raw = String(value ?? "").trim();
    if (!raw) {
        return null;
    }
    const normalized = raw.replace(/\./g, "").replace(",", ".");
    const amount = Math.round(Number(normalized));
    return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

async function printCurrentOrder(orderId, isAdmin) {
    if (isAdmin) {
        await refreshPendingOrderPricing(orderId);
    }
    const order = await fetchOrderById(orderId, isAdmin ? { includeClient: true } : { clientId: state.profile.id });
    if (!order) {
        throw new Error("No encontré el pedido para imprimir.");
    }
    const pdfBlob = await buildOrderPdfBlob(order, isAdmin);
    openPdfBlob(pdfBlob, orderPdfFilename(order));
}

async function printMonthlySummary(month) {
    const orders = await fetchOrders({
        clientId: state.profile.id,
        month,
        includeItems: true,
    });
    openPrintWindow(buildMonthlyPrintMarkup(state.profile, month, orders), `Resumen mensual ${month} | ${APP_NAME}`);
}


async function printAdminMonthlyStatement(clientId, month) {
    const { client, orders } = await fetchAdminMonthlyStatement(clientId, month);
    const pdfBlob = await buildMonthlyStatementPdfBlob(client, month, orders);
    openPdfBlob(pdfBlob, monthlyStatementFilename(client, month));
}

async function openWhatsAppForMonthlyStatement(clientId, month) {
    const { client, orders } = await fetchAdminMonthlyStatement(clientId, month);
    const phone = formatPhoneInternational(client.phone || "");
    if (!phone) {
        throw new Error("La clienta no tiene un numero valido para WhatsApp.");
    }

    const text = monthlyStatementWhatsappMessage(client, month, orders);
    openWhatsAppDirect(phone, text);
    state.flash = {
        tone: "notice",
        message: "Abri WhatsApp directo al contacto. Si necesitas adjuntar el PDF, genera el archivo con Imprimir / PDF y compartelo desde WhatsApp.",
    };
    await renderCurrentRoute();
}

async function fetchAdminMonthlyStatement(clientId, month) {
    if (!clientId) {
        throw new Error("No encontré la clienta para el consolidado mensual.");
    }
    const orders = await fetchOrders({ clientId, month, includeClients: true });
    const statementOrders = monthlyStatementOrders(orders);
    if (!orders.length) {
        throw new Error("No encontré pedidos de esa clienta en este mes.");
    }
    if (!statementOrders.length) {
        throw new Error("Esta clienta aún no tiene pedidos cerrados como comprado o pagado en este mes.");
    }
    const first = orders[0];
    const client = {
        id: clientId,
        name: first.client_name || `Clienta #${clientId}`,
        email: first.client_email || "",
        phone: first.client_phone || "",
        address: first.client_address || "",
        billing_type: first.client_billing_type || "mensual",
    };
    return { client, orders: statementOrders };
}

async function closeWeek(weekStart, weekEnd) {
    const start = new Date(weekStart);
    const end = new Date(weekEnd);
    if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) {
        throw new Error("No pude identificar la semana a cerrar.");
    }
    const confirmed = typeof window.confirm === "function"
        ? window.confirm("Cerrar esta semana dejará todos los pedidos pendientes como Comprado y fijará sus precios para que no cambien con la lista nueva. ¿Continuar?")
        : true;
    if (!confirmed) {
        return;
    }

    const rows = await runQuery(
        state.client
            .from("orders")
            .update({ status: "comprado", purchased_at: new Date().toISOString() })
            .gte("created_at", start.toISOString())
            .lt("created_at", end.toISOString())
            .eq("status", "pendiente")
            .select("id")
    );

    const count = rows.length;
    state.flash = {
        tone: "notice",
        message: count
            ? `Semana cerrada: ${count} pedido(s) quedaron en Comprado con precios fijos.`
            : "No había pedidos pendientes para cerrar en esa semana.",
    };
    await renderCurrentRoute();
}

async function exportConsolidationXls(month) {
    const orders = await fetchOrders({ month, includeItems: true, includeClients: true });
    const consolidation = buildConsolidation(orders);
    const summaryRows = consolidation.flatMap((week) => week.products.map((product) => [
        week.label,
        product.product_name,
        formatQty(product.cantidad),
        unitLabel(product.requested_unit),
        product.precio_unitario,
        product.total,
    ]));
    const detailRows = buildConsolidationClientDetailRows(orders);
    const workbook = buildExcelWorkbook([
        {
            name: "Resumen compra",
            columns: ["Semana", "Producto", "Cantidad", "Unidad", "Precio unitario", "Total"],
            rows: summaryRows,
            empty: "Sin pedidos para este mes.",
        },
        {
            name: "Detalle clientas",
            columns: ["Semana", "Pedido", "Fecha", "Clienta", "Telefono", "Direccion", "Estado", "Producto", "Cantidad", "Unidad", "Subtotal estimado", "Subtotal real", "Nota"],
            rows: detailRows,
            empty: "Sin detalle para este mes.",
        },
    ]);
    downloadFile(`consolidado_${month}.xls`, "application/vnd.ms-excel;charset=utf-8", `\ufeff${workbook}`);
}


async function exportProductsXls() {
    const products = await fetchProducts({ includeInactive: true });
    const rows = products.map((product) => `
        <tr>
            <td>${product.id}</td>
            <td>${e(product.name)}</td>
            <td>${e(productDisplayName(product))}</td>
            <td>${e(product.presentation || "")}</td>
            <td>${e(CATEGORY_LABELS[product.category] || product.category)}</td>
            <td>${product.estimated_price}</td>
            <td>${product.is_active ? "Activo" : "Inactivo"}</td>
            <td>${e(productImageSlug(productDisplayName(product)))}</td>
        </tr>
    `).join("");
    const markup = `
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; color: #173127; }
                h1 { color: #0b3d27; }
                table { border-collapse: collapse; width: 100%; }
                th { background: #1f6d2d; color: #fff; }
                th, td { border: 1px solid #cfe0c4; padding: 8px; text-align: left; }
            </style>
        </head>
        <body>
            <h1>Productos Verdulería Isa</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre interno</th>
                        <th>Nombre visible</th>
                        <th>Presentación</th>
                        <th>Categoría</th>
                        <th>Precio referencia</th>
                        <th>Estado</th>
                        <th>Nombre archivo imagen sugerido</th>
                    </tr>
                </thead>
                <tbody>${rows || `<tr><td colspan="8">Sin productos.</td></tr>`}</tbody>
            </table>
        </body>
        </html>
    `;
    downloadFile(`productos_verduleria_isa_${currentDateStamp()}.xls`, "application/vnd.ms-excel;charset=utf-8", `\ufeff${markup}`);
}

async function openWhatsAppForOrder(orderId) {
    await refreshPendingOrderPricing(orderId);
    const order = await fetchOrderById(orderId, { includeClient: true });
    if (!order) {
        throw new Error("No encontre el pedido.");
    }

    const phone = formatPhoneInternational(order.client_phone || "");
    if (!phone) {
        throw new Error("La clienta no tiene un numero valido para WhatsApp.");
    }

    const text = orderWhatsappMessage(order);
    openWhatsAppDirect(phone, text);
    state.flash = {
        tone: "notice",
        message: "Abri WhatsApp directo al contacto. Si necesitas adjuntar el PDF, genera la boleta con Imprimir / PDF y compartela desde WhatsApp.",
    };
    await renderCurrentRoute();
}

function renderShell(title, content) {
    document.title = `${title} | ${APP_NAME}`;
    if (!appRoot) {
        return;
    }

    const flash = state.flash;
    state.flash = null;

    const routePath = state.route?.path || "";
    const routeClass = `route-${routePath.replace(/^\/+/, "").replace(/[^a-z0-9]+/gi, "-") || "home"}`;
    const shellClass = [
        "page-shell",
        routeClass,
        state.role === "client" ? "client-shell" : "",
        state.role ? `role-${state.role}` : "public-shell",
    ].filter(Boolean).join(" ");

    const isAdminShell = state.role === "admin";
    const brandMarkup = isAdminShell ? "" : `
                <a class="brand" href="#/">
                    <span class="brand-mark">
                        <img class="brand-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                    </span>
                    <span class="brand-copy">
                        <span class="brand-name">${e(APP_NAME)}</span>
                        <span class="brand-tagline">Tu feria personal</span>
                    </span>
                </a>
    `;

    appRoot.innerHTML = `
        <div class="${shellClass}">
            <header class="topbar ${isAdminShell ? "admin-topbar-clean" : ""}">
                ${brandMarkup}
                <nav class="nav-links">
                    ${renderNavigation()}
                </nav>
            </header>
            ${state.role === "client" ? renderClientBottomNav(clientBottomNavActive()) : ""}
            <main class="content-shell">
                ${flash ? renderFlash(flash) : ""}
                ${content}
            </main>
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
            canShowAdminAccess() ? `<button type="button" data-action="switch-role" data-role="admin">Administrador</button>` : "",
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
            `<a href="#/admin/cobros-mensuales">Mensuales</a>`,
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
    if (path === "/cliente/carrito") {
        return "carrito";
    }
    if (path.includes("perfil")) {
        return "perfil";
    }
    if (path === "/cliente/dashboard" || /^\/cliente\/pedido\/\d+$/.test(path)) {
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
        <section class="landing-page app-start-page">
            <section class="landing-hero app-start-screen">
                <div class="landing-mobile-top">
                    <span></span>
                    <a class="landing-menu-button" href="#/login-cliente" aria-label="Ingresar"></a>
                </div>
                <img class="landing-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                <p class="eyebrow">Tu feria personal</p>
                <h1>Frescura directo a tu casa.</h1>
                <p class="lead">Ingresa para armar tu pedido semanal de frutas, verduras y productos seleccionados.</p>
                <figure class="landing-hero__image landing-hero__image--pending" aria-hidden="true"></figure>
                <div class="landing-actions">
                    <a class="button primary" href="#/login-cliente">Ingresar</a>
                </div>
                <p class="landing-proof">Productos frescos y seleccionados cada semana</p>
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
            <p class="muted">¿Olvidaste tu contraseña? <a href="#/cliente/recuperar-clave">Recuperar acceso</a></p>
        </section>
    `;
}

function renderClientPasswordRecoveryPage() {
    return `
        <section class="form-panel narrow auth-panel">
            <div class="access-card__logo-wrap compact">
                <img class="access-card__logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            </div>
            <p class="eyebrow">Recuperar acceso</p>
            <h1>Olvidé mi contraseña</h1>
            <p class="muted">Escribe tu correo y te enviaremos un enlace seguro para crear una nueva contraseña en esta app.</p>
            <form class="stacked-form" data-form="client-password-recovery">
                <label>Correo
                    <input type="email" name="email" autocomplete="email" required>
                </label>
                <p class="field-note" data-inline-status>El enlace debe abrir Verduleria Isa, no localhost.</p>
                <button class="button primary" type="submit" data-busy-text="Enviando...">Enviar enlace seguro</button>
            </form>
            <p class="muted"><a href="#/login-cliente">Volver al ingreso</a></p>
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

function renderClientPasswordResetPage(client, options = {}) {
    const isRecovery = options.mode === "recovery";
    const email = client?.email || state.session?.user?.email || "";
    const eyebrow = isRecovery ? "Recuperar acceso" : "Clave temporal";
    const intro = isRecovery
        ? `${e(email)} abrió el enlace seguro. Define una nueva contraseña para volver a ingresar.`
        : `${e(email)} ingresó con una clave temporal. Define una nueva para proteger tu cuenta.`;
    return `
        <section class="form-panel narrow auth-panel">
            <div class="access-card__logo-wrap compact">
                <img class="access-card__logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            </div>
            <p class="eyebrow">${eyebrow}</p>
            <h1>Crea tu nueva contraseña</h1>
            <p class="muted">${intro}</p>
            <form class="stacked-form" data-form="client-password-reset">
                <label>Nueva contraseña
                    <input type="password" name="new_password" minlength="8" autocomplete="new-password" required>
                </label>
                <label>Confirmar contraseña
                    <input type="password" name="confirm_password" minlength="8" autocomplete="new-password" required>
                </label>
                <p class="field-note" data-inline-status>No uses la clave temporal.</p>
                <button class="button primary" type="submit" data-busy-text="Guardando...">Guardar nueva contraseña</button>
            </form>
        </section>
    `;
}

function renderClientDashboardPage(client, dashboard, month) {
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

    return `
        <section class="client-orders-page client-month-panel" id="client-orders">
            <div class="section-head compact-heading">
                <div>
                    <p class="eyebrow">Mis pedidos</p>
                    <h1>Resumen del mes</h1>
                    <p class="muted client-orders-contact"><span>${e(client.email)}</span><span>${e(client.address)}</span></p>
                </div>
                <div class="hero-actions">
                    <form class="month-filter" data-form="client-dashboard-filter">
                        <input type="month" name="month" value="${e(month)}">
                        <button class="button ghost" type="submit">Ver mes</button>
                    </form>
                    ${dashboard.latest_order ? `<a class="button ghost" href="#/cliente/carrito?source=${dashboard.latest_order.id}">Repetir último pedido</a>` : ""}
                </div>
            </div>

            <section class="grid three-up client-summary-grid">
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

            <section class="panel client-history-panel">
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
                    ${canShowAdminAccess() ? `<button class="button ghost" type="button" data-action="switch-role" data-role="admin">Administrador</button>` : ""}
                    <button class="button ghost" type="button" data-action="logout">Salir</button>
                    <a class="button ghost" href="#/cliente/dashboard">Volver</a>
                </div>
            </form>
        </section>
    `;
}

function renderClientOrderCard(order) {
    const actionHref = `#/cliente/carrito?${order.status === "pendiente" ? "edit" : "source"}=${order.id}`;
    const actionLabel = order.status === "pendiente" ? "Editar solicitud" : "Repetir pedido";
    return `
        <article class="order-card">
            <div class="order-card__top">
                <div>
                    <h3>Pedido #${order.id}</h3>
                    <p class="muted">${e(formatDateTime(order.created_at))} | ${e(statusLabel(order.status))}</p>
                </div>
                <div class="hero-actions">
                    <a class="button ghost" href="#/cliente/pedido/${order.id}">Ver detalle</a>
                    <a class="button ghost" href="${actionHref}">${actionLabel}</a>
                </div>
            </div>
            <p class="order-total">Total: ${formatCurrency(order.display_total)}</p>
        </article>
    `;
}

function renderProductThumb(product, className = 'product-thumb') {
    const candidates = productImageCandidates(product);
    const [src, ...fallbacks] = candidates;
    return `<img class='${e(className)}' src='${e(src)}' alt='${e(productDisplayName(product))}' loading='lazy' referrerpolicy='no-referrer' data-fallbacks='${e(fallbacks.join('|'))}' onerror='swapProductImageFallback(this)'>`;
}

function swapProductImageFallback(image) {
    const fallbacks = String(image.dataset.fallbacks || '').split('|').filter(Boolean);
    const next = fallbacks.shift();
    if (!next) {
        image.onerror = null;
        return;
    }
    image.dataset.fallbacks = fallbacks.join('|');
    image.src = next;
}

function productImageSrc(product) {
    return productImageCandidates(product)[0];
}

function productImageCandidates(product) {
    const savedUrl = safeProductImageUrl(product.image_url);
    const candidates = [
        ...productStorageImageUrls(product),
        savedUrl,
        productPhotoUrl(productPhotoTerms(product)),
        productFallbackImageSrc(product),
    ].filter(Boolean);
    return [...new Set(candidates)];
}

function productStorageImageUrls(product) {
    const baseUrl = productStorageBaseUrl();
    if (!baseUrl) {
        return [];
    }

    const rawNames = [
        productDisplayName(product),
        product.name,
        [productDisplayName(product), product.presentation].filter(Boolean).join(' '),
        productImageSlug(productDisplayName(product)),
        productImageSlug(product.name),
        productImageSlug([productDisplayName(product), product.presentation].filter(Boolean).join(' ')),
    ].filter(Boolean);
    const fileBases = [...new Set(rawNames)];
    return fileBases.flatMap((fileBase) => PRODUCT_STORAGE_IMAGE_EXTENSIONS.map((extension) => `${baseUrl}/${encodeURIComponent(fileBase)}${extension}`));
}

function productStorageBaseUrl() {
    const supabaseUrl = String(window.VERDULERIA_CONFIG?.SUPABASE_URL || '').replace(/\/+$/, '');
    return supabaseUrl ? `${supabaseUrl}/storage/v1/object/public/${PRODUCT_IMAGE_BUCKET}` : '';
}

async function uploadProductImage(file, values) {
    validateProductImageFile(file);
    const uploadPath = productImageUploadPath(file, values);
    const options = {
        cacheControl: '3600',
        upsert: true,
    };
    if (file.type) {
        options.contentType = file.type;
    }

    const { error } = await withSupabaseTimeout(
        state.client.storage.from(PRODUCT_IMAGE_BUCKET).upload(uploadPath, file, options),
        'Supabase no respondio al subir la imagen del producto.'
    );
    if (error) {
        throw error;
    }
    return uploadPath;
}

function validateProductImageFile(file) {
    const type = String(file?.type || '').toLowerCase();
    const name = String(file?.name || '').toLowerCase();
    const allowed = ['image/jpeg', 'image/png', 'image/webp'].includes(type) || /\.(jpe?g|png|webp)$/.test(name);
    if (!allowed) {
        throw new Error('La imagen debe ser JPG, PNG o WebP.');
    }
    if (file.size > MAX_PRODUCT_IMAGE_UPLOAD_BYTES) {
        throw new Error('La imagen no puede superar 6 MB.');
    }
}

function productImageUploadPath(file, values) {
    return `${productImageUploadBaseName(values)}${productImageUploadExtension(file)}`;
}

function productImageUploadBaseName(values) {
    const raw = sanitizeText(values?.display_name || values?.name, 120);
    const withoutControls = raw.replace(/[\u0000-\u001f\u007f]/g, '').trim();
    if (withoutControls && !/[\\/#?%*:|"<>]/.test(withoutControls)) {
        return withoutControls;
    }
    return productImageSlug(raw);
}

function productImageUploadExtension(file) {
    const name = String(file?.name || '').toLowerCase();
    const match = name.match(/\.(jpe?g|png|webp)$/);
    if (match) {
        return match[1] === 'jpeg' ? '.jpg' : `.${match[1]}`;
    }
    const type = String(file?.type || '').toLowerCase();
    if (type === 'image/png') {
        return '.png';
    }
    if (type === 'image/webp') {
        return '.webp';
    }
    return '.jpg';
}

function safeProductImageUrl(value) {
    const url = sanitizeText(value, 1000);
    if (!url) {
        return "";
    }
    if (/^(https?:)?\/\//i.test(url)) {
        return url;
    }
    if (/^\.?\/?static\//i.test(url)) {
        return url.startsWith("./") ? url : `./${url.replace(/^\/+/, "")}`;
    }
    return "";
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
            <img class="client-app-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
            <button class="app-cart-button" type="button" data-action="open-cart-review" aria-label="Ver carrito">
                <span class="app-cart-icon" aria-hidden="true"></span>
                <span data-selected-count>0</span>
            </button>
        </header>
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

function renderProductUnitControl(productId, unitChoices, selectedUnit, label) {
    if (!unitChoices.length) {
        return "";
    }

    if (unitChoices.length === 1) {
        const [value, choiceLabel] = unitChoices[0];
        return `<input type="hidden" name="unit_${productId}" value="${e(value)}"><span class="unit-static-label" aria-label="Unidad ${e(label)}">${e(choiceLabel)}</span>`;
    }

    return `
        <fieldset class="unit-segment" aria-label="Unidad ${e(label)}">
            ${unitChoices.map(([value, choiceLabel]) => `
                <label>
                    <input type="radio" name="unit_${productId}" value="${e(value)}" ${selectedUnit === value ? "checked" : ""} data-unit-input>
                    <span>${e(choiceLabel)}</span>
                </label>
            `).join("")}
        </fieldset>
    `;
}

function renderClientProductCard(product, selection = {}, options = {}) {
    const displayName = productDisplayName(product);
    const category = options.category || product.category || "";
    const variantClass = options.variant ? ` product-card-${options.variant}` : "";
    const unitChoices = unitChoicesForProduct(product);
    const selectedUnit = normalizeUnitForProduct(selection.requested_unit || selection.unit, product);
    const quantity = normalizeQuantity(selection.quantity);
    const quantityStep = selectedUnit === "kg" ? "0.25" : "1";
    const hasQuantity = quantity > 0;
    const quantityValue = hasQuantity ? formatQuantityInputValue(quantity) : "";

    return `
        <div class="product-row mobile-product-card${variantClass} ${hasQuantity ? "is-selected" : ""}" data-product-id="${product.id}" data-product-name="${e(productSearchText(product))}" data-product-category="${e(category)}">
            <div class="product-info">
                ${renderProductThumb(product)}
                <div class="product-copy">
                    <strong>${e(displayName)}</strong>
                    ${product.presentation ? `<span class="product-presentation">${e(product.presentation)}</span>` : ""}
                    <span class="product-price">${formatCurrency(product.estimated_price)} <small>referencia</small></span>
                </div>
            </div>
            <div class="product-controls compact-product-controls">
                <button class="product-add-button" type="button" data-action="add-product" data-product-id="${product.id}" data-add-product ${hasQuantity ? "hidden" : ""} aria-label="Agregar ${e(displayName)}"><span aria-hidden="true">+</span></button>
                <div class="quantity-selector" data-quantity-selector ${hasQuantity ? "" : "hidden"}>
                    <button class="quantity-step" type="button" data-action="decrement-product" data-product-id="${product.id}" aria-label="Quitar ${e(displayName)}">-</button>
                    <input
                        type="number"
                        step="${quantityStep}"
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
                ${renderProductUnitControl(product.id, unitChoices, selectedUnit, displayName)}
                <button class="product-remove-button" type="button" data-action="remove-product" data-product-id="${product.id}" data-remove-product ${hasQuantity ? "" : "hidden"}>Quitar</button>
            </div>
        </div>
    `;
}

function renderClientOrderSubmitPanel(options = {}) {
    const editOrderId = Number(options.editOrderId || 0);
    const panelClass = ["panel", "cart-submit-panel", options.className || ""].filter(Boolean).join(" ");
    const primaryLabel = options.primaryLabel || (editOrderId ? "Actualizar solicitud" : "Enviar pedido");
    const statusText = options.statusText || "Revisa el detalle antes de enviar tu solicitud.";
    const secondaryAction = options.includeCartButton
        ? `<button class="button ghost" type="button" data-action="open-cart-review">Revisar carrito</button>`
        : "";

    return `
        <section class="${panelClass}">
            <div class="metric-line"><span>Productos elegidos</span><strong data-selected-count>0</strong></div>
            <div class="metric-line"><span>Subtotal productos</span><strong data-subtotal-estimated>${formatCurrency(0)}</strong></div>
            <div class="metric-line"><span>Despacho fijo</span><strong>${formatCurrency(DELIVERY_FEE)}</strong></div>
            <div class="metric-line"><span>Total estimado</span><strong data-estimated-total>${formatCurrency(DELIVERY_FEE)}</strong></div>
            <p class="field-note" data-inline-status>${e(statusText)}</p>
            <div class="order-submit-actions">
                <button class="button primary" type="submit" data-busy-text="Enviando...">${primaryLabel}</button>
                ${secondaryAction}
            </div>
        </section>
    `;
}
function renderClientBottomNav(active = "inicio") {
    const item = (key, href, label, iconClass) => {
        const activeClass = active === key ? " active" : "";
        const icon = `<span class="nav-icon ${iconClass}" aria-hidden="true"></span>`;
        return `<a class="${activeClass.trim()}" href="${href}">${icon}<span>${label}</span></a>`;
    };
    const cartActive = active === "carrito" ? " active" : "";
    const adminItem = canShowAdminAccess()
        ? `<button type="button" data-action="switch-role" data-role="admin"><span class="nav-icon nav-icon-admin" aria-hidden="true"></span><span>Admin</span></button>`
        : "";
    return `
        <nav class="mobile-bottom-nav client-bottom-nav ${adminItem ? "has-admin" : ""}" aria-label="Navegación clienta">
            ${item("inicio", "#/cliente/pedido/nuevo", "Inicio", "nav-icon-home")}
            ${item("pedidos", "#/cliente/dashboard", "Pedidos", "nav-icon-bag")}
            ${item("perfil", "#/cliente/perfil", "Perfil", "nav-icon-user")}
            ${adminItem}
            <button class="${cartActive.trim()}" type="button" data-action="open-cart-review" aria-label="Ver carrito">
                <span class="app-cart-icon" aria-hidden="true"></span>
                <span>Carrito</span>
                <span data-selected-count>0</span>
            </button>
        </nav>
    `;
}

function renderClientOrderFormPage(products, draft, sourceOrder, editOrder, latestOrder, route = null) {
    const selections = draft.selections || {};
    const clientNote = draft.client_note || "";
    const otherRequest = draft.other_request || "";
    const sourceOrderId = sourceOrder?.id || draft.source_order_id || "";
    const editOrderId = editOrder?.id || draft.edit_order_id || "";
    const groupedProducts = groupProducts(products);
    const activeCategories = CATEGORY_CHOICES.filter(([category]) => (groupedProducts.get(category) || []).length > 0);
    const isCatalogView = route?.query?.get("view") === "catalog" || Boolean(editOrder || sourceOrder);
    const featuredProducts = selectFeaturedProducts(products).slice(0, 4);
    const featuredIds = new Set(featuredProducts.map((product) => product.id));
    const hiddenProducts = products.filter((product) => !featuredIds.has(product.id));
    const repeatLatestAction = latestOrder && !editOrder && !sourceOrder
        ? `<a class="button ghost repeat-latest-button" href="#/cliente/carrito?source=${latestOrder.id}"><span class="client-icon client-icon-repeat" aria-hidden="true"></span>Repetir último pedido</a>`
        : "";
    const categoryHref = (category) => `#/cliente/pedido/nuevo?view=catalog&category=${encodeURIComponent(category)}`;
    const allCatalogHref = "#/cliente/pedido/nuevo?view=catalog";
    const notes = renderClientNotesDetails(otherRequest, clientNote);
    const hiddenInputs = !isCatalogView && hiddenProducts.length
        ? `<div class="home-hidden-product-inputs" aria-hidden="true">${hiddenProducts.map((product) => renderClientProductCard(product, selectionForProduct(selections, product.id), { category: product.category, variant: "hidden" })).join("")}</div>`
        : "";

    if (isCatalogView) {
        const groupsMarkup = activeCategories
            .map(([category, label]) => {
                const items = groupedProducts.get(category) || [];
                if (!items.length) {
                    return "";
                }
                return `
                    <div class="panel product-group catalog-product-group" id="cat-${e(productImageSlug(category))}" data-product-group data-category="${e(category)}">
                        <h2>${e(label)}</h2>
                        <div class="product-table catalog-product-grid">
                            ${items.map((product) => renderClientProductCard(product, selectionForProduct(selections, product.id), { category, variant: "catalog" })).join("")}
                        </div>
                    </div>
                `;
            })
            .join("");

        return `
            <form class="catalog-app catalog-screen mobile-shop-order" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
                <input type="hidden" name="source_order_id" value="${sourceOrderId}">
                <input type="hidden" name="edit_order_id" value="${editOrderId}">

                <header class="shop-catalog-header">
                    <a class="app-back-button" href="#/cliente/pedido/nuevo" aria-label="Volver al inicio"></a>
                    <h1>Catálogo</h1>
                    <button class="app-cart-button" type="button" data-action="open-cart-review" aria-label="Ver carrito">
                        <span class="app-cart-icon" aria-hidden="true"></span>
                        <span data-selected-count>0</span>
                    </button>
                </header>

                ${editOrder ? `<div class="badge-block">Editando pedido #${editOrder.id}</div>` : editOrderId ? `<div class="badge-block">Editando pedido #${editOrderId}</div>` : sourceOrder ? `<div class="badge-block">Basado en el pedido #${sourceOrder.id}</div>` : sourceOrderId ? `<div class="badge-block">Basado en el pedido #${sourceOrderId}</div>` : ""}

                <section class="catalog-toolbar shop-catalog-toolbar">
                    <div class="shop-searchbar catalog-search">
                        <span class="shop-search-icon" aria-hidden="true"></span>
                        <input type="search" data-product-search placeholder="Buscar productos..." aria-label="Buscar producto">
                    </div>
                </section>

                <nav class="category-tabs catalog-category-tabs shop-catalog-tabs" aria-label="Categorías del catálogo">
                    <button class="category-chip" type="button" data-action="focus-category" data-target="cat-${e(productImageSlug("frutas"))}" data-category-nav="frutas">Frutas</button>
                    <button class="category-chip" type="button" data-action="focus-category" data-target="cat-${e(productImageSlug("verduras_hortalizas"))}" data-category-nav="verduras_hortalizas">Verduras</button>
                    <button class="category-chip" type="button" data-action="focus-category" data-target="cat-${e(productImageSlug("listos_cocinar"))}" data-category-nav="listos_cocinar">Listos <span class="client-icon client-icon-bowl" aria-hidden="true"></span></button>
                    <button class="category-chip" type="button" data-action="focus-category" data-target="cat-${e(productImageSlug("pescados_mariscos"))}" data-category-nav="pescados_mariscos">Pescados / mariscos</button>
                    <button class="category-chip" type="button" data-action="focus-category" data-target="client-order-notes"><span class="client-icon client-icon-sliders" aria-hidden="true"></span>Más filtros</button>
                </nav>

                <section class="product-columns catalog-products" id="catalog-products">
                    <p class="empty-search" data-product-search-empty hidden>No hay productos con esa búsqueda.</p>
                    ${groupsMarkup || `<section class="empty-state"><p class="eyebrow">Catálogo</p><h2>Sin productos activos</h2><p class="muted">Puedes usar el campo Otro mientras la administradora actualiza el catálogo.</p></section>`}
                </section>
                ${notes}

                ${renderClientOrderSubmitPanel({ editOrderId, className: "catalog-submit-panel", includeCartButton: true, statusText: "Puedes enviar desde aqui o revisar el carrito antes de confirmar." })}
            </form>
        `;
    }

    const homeProductCards = featuredProducts.map((product) => renderClientProductCard(product, selectionForProduct(selections, product.id), { category: product.category, variant: "home" })).join("");
    const currentOrderCard = renderHomeCurrentOrderCard(latestOrder, products, draft);

    return `
        <form class="catalog-app client-home-screen mobile-shop-order" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
            <input type="hidden" name="source_order_id" value="${sourceOrderId}">
            <input type="hidden" name="edit_order_id" value="${editOrderId}">
            ${hiddenInputs}

            <header class="client-home-topbar">
                <img class="client-home-logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                <button class="app-cart-button" type="button" data-action="open-cart-review" aria-label="Ver carrito">
                    <span class="app-cart-icon" aria-hidden="true"></span>
                    <span data-selected-count>0</span>
                </button>
            </header>

            <section class="client-home-hero">
                <div class="client-home-hero-copy">
                    <h1>¡Hola, ${e(firstName(state.profile?.name) || "Natalia")}! <span aria-hidden="true">&#128075;</span></h1>
                    <p>¿Qué necesitas esta semana?</p>
                    <a class="button primary" href="${allCatalogHref}"><span class="client-icon client-icon-basket" aria-hidden="true"></span>Armar mi pedido</a>
                    ${repeatLatestAction}
                </div>
                <figure class="client-home-hero-image" aria-hidden="true"></figure>
            </section>

            <a class="home-searchbar" href="${allCatalogHref}" aria-label="Buscar productos">
                <span class="shop-search-icon" aria-hidden="true"></span>
                <span>Buscar frutas, verduras y más...</span>
            </a>

            <section class="home-category-grid" aria-label="Categorías principales">
                <a href="${categoryHref("frutas")}"><span class="home-category-icon home-category-fruit" aria-hidden="true"></span><strong>Frutas</strong></a>
                <a href="${categoryHref("verduras_hortalizas")}"><span class="home-category-icon home-category-veg" aria-hidden="true"></span><strong>Verduras</strong></a>
                <a href="${categoryHref("listos_cocinar")}"><span class="home-category-icon home-category-ready" aria-hidden="true"></span><strong>Listos para<br>cocinar</strong></a>
                <a href="${allCatalogHref}"><span class="home-category-icon home-category-all" aria-hidden="true"></span><strong>Ver todas</strong></a>
            </section>

            <section class="home-weekly-selection">
                <div>
                    <h2>Selección semanal</h2>
                    <p>Frescura que se siente</p>
                    <a class="button ghost" href="${allCatalogHref}">Ver selección <span aria-hidden="true">&rsaquo;</span></a>
                </div>
                <figure aria-hidden="true"></figure>
            </section>

            <section class="home-usual-products">
                <div class="home-section-title">
                    <h2>Tus productos habituales</h2>
                    <a href="${allCatalogHref}">Ver todos</a>
                </div>
                <div class="home-usual-grid">
                    ${homeProductCards}
                </div>
            </section>

            ${notes}
            ${currentOrderCard}

        </form>
    `;
}

function firstName(value) {
    return String(value || "").trim().split(/\s+/)[0] || "";
}

function renderClientNotesDetails(otherRequest, clientNote) {
    return `
        <details class="home-notes-card catalog-notes-card" id="client-order-notes">
            <summary>Otro producto u observaciones</summary>
            <label>Otro
                <textarea name="other_request" rows="3" maxlength="${MAX_OTHER_REQUEST_LENGTH}" data-other-request placeholder="Pide aquí algo que no esté en el listado.">${e(otherRequest || "")}</textarea>
            </label>
            <label>Observaciones
                <textarea name="client_note" rows="3" maxlength="${MAX_CLIENT_NOTE_LENGTH}" data-client-note>${e(clientNote || "")}</textarea>
            </label>
        </details>
    `;
}

function renderHomeCurrentOrderCard(latestOrder, products, draft) {
    const draftSummary = buildDraftSummary(products, draft);
    if (latestOrder) {
        const canEdit = latestOrder.status === "pendiente";
        const itemCount = latestOrder.items?.length || 0;
        return `
            <section class="home-current-order">
                <span class="home-current-icon" aria-hidden="true"></span>
                <div>
                    <h2>Tu pedido actual</h2>
                    <p><strong>Pedido #${latestOrder.id}</strong> <span class="status-pill" data-status="${e(latestOrder.status)}">${e(statusLabel(latestOrder.status))}</span></p>
                    <p class="muted">Última actualización: ${e(formatDateTime(latestOrder.updated_at || latestOrder.created_at))}</p>
                </div>
                <div class="home-current-total">
                    <strong>${formatCurrency(latestOrder.display_total)}</strong>
                    <span>${itemCount || ""} ${itemCount === 1 ? "producto" : "productos"}</span>
                </div>
                <a class="home-current-action" href="#/cliente/pedido/${latestOrder.id}">${canEdit ? "Ver / Editar pedido" : "Ver pedido"}<span aria-hidden="true">&rsaquo;</span></a>
            </section>
        `;
    }
    if (!draftSummary.count && !draft.other_request && !draft.client_note) {
        return "";
    }
    return `
        <section class="home-current-order">
            <span class="home-current-icon" aria-hidden="true"></span>
            <div>
                <h2>Tu pedido actual</h2>
                <p><strong>Borrador guardado</strong> <span class="status-pill" data-status="pendiente">Pendiente</span></p>
                <p class="muted">Todavía no envías esta solicitud.</p>
            </div>
            <div class="home-current-total">
                <strong>${formatCurrency(draftSummary.total)}</strong>
                <span>${draftSummary.count} ${draftSummary.count === 1 ? "producto" : "productos"}</span>
            </div>
            <button class="home-current-action" type="button" data-action="open-cart-review">Ver / Editar pedido<span aria-hidden="true">&rsaquo;</span></button>
        </section>
    `;
}

function buildDraftSummary(products, draft) {
    const productById = new Map(products.map((product) => [product.id, product]));
    let subtotal = 0;
    let count = 0;
    for (const [productId, selection] of Object.entries(draft.selections || {})) {
        const product = productById.get(Number(productId));
        const quantity = normalizeQuantity(selection?.quantity);
        if (!product || quantity <= 0) {
            continue;
        }
        count += 1;
        subtotal += quantity * Number(product.estimated_price || 0);
    }
    return { count, subtotal, total: count ? subtotal + DELIVERY_FEE : 0 };
}

function renderClientCartReviewPage(products, draft) {
    const selections = draft.selections || {};
    const productById = new Map(products.map((product) => [product.id, product]));
    const selectedItems = Object.entries(selections)
        .map(([productId, selection]) => {
            const product = productById.get(Number(productId));
            const quantity = normalizeQuantity(selection?.quantity);
            return product && quantity > 0 ? { product, selection: { ...selection, quantity } } : null;
        })
        .filter(Boolean);
    const continueHref = "#/cliente/pedido/nuevo?view=catalog";
    const cancelEditAction = draft.edit_order_id
        ? `<button class="button ghost" type="button" data-action="cancel-order-edit" data-target="/cliente/pedido/${draft.edit_order_id}">Cancelar edición</button>`
        : "";
    const rows = selectedItems.map(({ product, selection }) => {
        const unitChoices = unitChoicesForProduct(product);
        const selectedUnit = normalizeUnitForProduct(selection.requested_unit || selection.unit, product);
        const quantityStep = selectedUnit === "kg" ? "0.25" : "1";
        return `
        <div class="cart-review-item product-row is-selected" data-product-id="${product.id}" data-product-name="${e(productSearchText(product))}" data-product-category="${e(product.category)}">
            <div class="product-info">
                ${renderProductThumb(product, "product-thumb small")}
                <div class="product-copy">
                    <strong>${e(productDisplayName(product))}</strong>
                    ${product.presentation ? `<span class="product-presentation">${e(product.presentation)}</span>` : ""}
                    <span class="product-price">${formatCurrency(product.estimated_price)} <small>referencia</small></span>
                </div>
            </div>
            <div class="product-controls compact-product-controls">
                <div class="quantity-selector" data-quantity-selector>
                    <button class="quantity-step" type="button" data-action="decrement-product" data-product-id="${product.id}" aria-label="Quitar ${e(productDisplayName(product))}">-</button>
                    <input type="number" step="${quantityStep}" min="0" max="${MAX_QUANTITY}" inputmode="decimal" name="qty_${product.id}" aria-label="Cantidad ${e(productDisplayName(product))}" value="${e(formatQuantityInputValue(selection.quantity))}" data-price="${product.estimated_price}" placeholder="0" data-quantity-input>
                    <button class="quantity-step" type="button" data-action="increment-product" data-product-id="${product.id}" aria-label="Agregar ${e(productDisplayName(product))}">+</button>
                </div>
                ${renderProductUnitControl(product.id, unitChoices, selectedUnit, productDisplayName(product))}
                <button class="product-remove-button" type="button" data-action="remove-product" data-product-id="${product.id}" data-remove-product>Quitar producto</button>
            </div>
        </div>
    `;
    }).join("");

    return `
        <form class="catalog-app cart-review-page mobile-shop-order" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
            <input type="hidden" name="source_order_id" value="${e(draft.source_order_id || "")}">
            <input type="hidden" name="edit_order_id" value="${e(draft.edit_order_id || "")}">

            <section class="catalog-title-row cart-title-row">
                <h1>${draft.edit_order_id ? "Editar solicitud" : "Detalle de solicitud"}</h1>
                <div class="hero-actions">
                    <a class="button ghost" href="${continueHref}">Seguir agregando</a>
                    ${cancelEditAction}
                </div>
            </section>

            <section class="panel cart-review-panel">
                <h2>Productos elegidos</h2>
                ${rows || `<p class="muted">Aún no hay productos del catálogo. Puedes volver al catálogo o usar el campo Otro.</p>`}
            </section>

            <details class="home-notes-card catalog-notes-card" id="client-order-notes">
                <summary>Otro producto u observaciones</summary>
                <label>Otro
                    <textarea name="other_request" rows="3" maxlength="${MAX_OTHER_REQUEST_LENGTH}" data-other-request placeholder="Pide aquí algo que no esté en el listado.">${e(draft.other_request || "")}</textarea>
                </label>
                <label>Observaciones
                    <textarea name="client_note" rows="3" maxlength="${MAX_CLIENT_NOTE_LENGTH}" data-client-note>${e(draft.client_note || "")}</textarea>
                </label>
            </details>
            ${renderClientOrderSubmitPanel({ editOrderId: draft.edit_order_id })}
        </form>
    `;
}

function renderClientOrderDetailPage(order) {
    return `
        <section class="section-head client-order-detail-head">
            <div>
                <p class="eyebrow">Detalle</p>
                <h1>Pedido #${order.id}</h1>
                <p class="muted">${e(formatDateTime(order.created_at))} | Estado: ${e(statusLabel(order.status))}</p>
            </div>
            <div class="hero-actions">
                <a class="button ghost" href="#/cliente/carrito?${order.status === "pendiente" ? "edit" : "source"}=${order.id}">${order.status === "pendiente" ? "Editar solicitud" : "Repetir pedido"}</a>
                <a class="button ghost" href="#/cliente/dashboard">Volver a pedidos</a>
            </div>
        </section>

        <section class="panel client-order-summary-panel">
            <div class="grid three-up client-order-summary-grid">
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
                    <tr><th>N°</th><th>Clienta</th><th>Estado</th><th>Total</th><th>Fecha</th><th></th></tr>
                </thead>
                <tbody>
                    ${recentOrders.length ? recentOrders.map((order) => `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${e(order.client_name)}</td>
                            <td>${e(statusLabel(order.status))}</td>
                            <td>${formatCurrency(order.display_total)}</td>
                            <td>${e(formatDateTime(order.created_at))}</td>
                            <td><a href="#/admin/pedido/${order.id}">Abrir</a></td>
                        </tr>
                    `).join("") : `<tr><td colspan="6">Sin pedidos en este mes.</td></tr>`}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminOrdersPage(orders, month, status) {
    const weeks = buildAdminOrderWeeks(orders);
    const weekCards = weeks.length ? weeks.map((week, index) => `
        <details class="week-card admin-orders-week" ${index === 0 ? "open" : ""}>
            <summary>
                <div>
                    <strong>${e(week.label)}</strong>
                    <span class="week-status-line">
                        ${week.order_count} pedido(s) · ${week.pending_count} pendiente(s) · ${week.purchased_count} comprado(s) · ${week.paid_count} pagado(s)
                    </span>
                </div>
                <strong>${formatCurrency(week.total)}</strong>
            </summary>
            <div class="admin-order-week-table">
                <table class="data-table">
                    <thead>
                        <tr><th>N°</th><th>Clienta</th><th>Estado</th><th>Total</th><th>Fecha</th><th></th></tr>
                    </thead>
                    <tbody>
                        ${week.orders.map((order) => `
                            <tr>
                                <td>#${order.id}</td>
                                <td>${e(order.client_name)}</td>
                                <td>${e(statusLabel(order.status))}</td>
                                <td>${formatCurrency(order.display_total)}</td>
                                <td>${e(formatDateTime(order.created_at))}</td>
                                <td><a href="#/admin/pedido/${order.id}">Abrir</a></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </details>
    `).join("") : `
        <div class="admin-order-week-empty">
            <p class="muted">No hay pedidos para este filtro.</p>
        </div>
    `;

    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Seguimiento</p>
                <h1>Pedidos</h1>
                <p class="muted">Agrupados por semana para revisar y administrar cada corte con mayor claridad.</p>
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

        <section class="panel admin-orders-week-list">
            <h2>Pedidos por semana</h2>
            ${weekCards}
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
            <section class="admin-extra-items">
                <div>
                    <h2>Agregar post pedido</h2>
                    <p class="muted">Usa estas líneas para productos que la clienta pidió después de enviar la solicitud. Se guardan al ajustar el pedido y entran en la boleta.</p>
                </div>
                <div class="admin-extra-items-grid">
                    ${renderAdminExtraItemRows()}
                </div>
            </section>
            <button class="button primary" type="submit">Guardar ajuste real</button>
        </form>
    `;
}

function renderReadOnlyOrderItemRows(items = []) {
    if (!items.length) {
        return `<tr><td colspan="5">Sin productos.</td></tr>`;
    }

    return items.map((item) => {
        const actualTotal = item.was_missing
            ? "Faltó"
            : item.actual_total === null || item.actual_total === undefined
                ? "-"
                : formatCurrency(item.actual_total);
        const note = [item.was_missing ? "No disponible" : "", item.item_note || ""].filter(Boolean).join(" · ") || "-";
        return `
            <tr>
                <td>${e(item.product_name)}</td>
                <td>${e(formatOrderItemQuantity(item))}</td>
                <td>${formatCurrency(item.estimated_total)}</td>
                <td>${e(actualTotal)}</td>
                <td>${e(note)}</td>
            </tr>
        `;
    }).join("");
}

function renderAdminOrderItemEditRows(items = []) {
    if (!items.length) {
        return `<tr><td colspan="6">Sin productos.</td></tr>`;
    }

    return items.map((item) => {
        const actualPrice = item.actual_price === null || item.actual_price === undefined ? "" : item.actual_price;
        return `
            <tr data-item-row data-item-id="${item.id}" data-quantity="${e(item.quantity)}">
                <td>${e(item.product_name)}</td>
                <td>${e(formatOrderItemQuantity(item))}</td>
                <td>${formatCurrency(item.estimated_price)}</td>
                <td><input type="number" min="0" name="actual_${item.id}" value="${e(actualPrice)}" placeholder="${item.estimated_price}"></td>
                <td>
                    <select name="missing_${item.id}">
                        <option value="0" ${item.was_missing ? "" : "selected"}>No</option>
                        <option value="1" ${item.was_missing ? "selected" : ""}>Sí</option>
                    </select>
                </td>
                <td><input type="text" name="note_${item.id}" value="${e(item.item_note || "")}" placeholder="Nota"></td>
            </tr>
        `;
    }).join("");
}


function renderAdminExtraItemRows(count = 3) {
    return Array.from({ length: count }, (_, index) => `
        <div class="admin-extra-item-row" data-extra-item-row data-extra-index="${index}">
            <label class="extra-name">Producto post pedido
                <input type="text" name="extra_name_${index}" placeholder="Ej. Queque casero">
            </label>
            <label>Cantidad
                <input type="number" name="extra_qty_${index}" min="0" step="0.1" placeholder="1">
            </label>
            <label>Unidad
                <select name="extra_unit_${index}">
                    <option value="kg">Kg</option>
                    <option value="unidad">Unidad</option>
                </select>
            </label>
            <label>Valor unitario real
                <input type="number" name="extra_price_${index}" min="0" step="1" placeholder="0">
            </label>
            <label class="extra-note">Nota
                <input type="text" name="extra_note_${index}" placeholder="Opcional">
            </label>
        </div>
    `).join("");
}

function renderAdminProductsPage(products) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Catálogo</p>
                <h1>Productos y precios</h1>
                <p class="muted">La edición en GitHub Pages ahora se guarda directo en Supabase con RLS.</p>
            </div>
            <div class="hero-actions">
                <button class="button ghost" type="button" data-action="export-products">Descargar productos XLS</button>
            </div>
        </section>

        <section class="panel">
            <h2>Agregar nuevo producto</h2>
            <form class="inline-form grid-form" data-form="admin-product-create" enctype="multipart/form-data">
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
                <label class="full-row">Imagen del producto
                    <input type="file" name="image_file" accept="image/jpeg,image/png,image/webp">
                </label>
                <p class="field-note full-row" data-inline-status>Opcional: JPG, PNG o WebP hasta 6 MB. Se guarda en el bucket product-images con el nombre visible del producto.</p>
                <button class="button primary" type="submit" data-busy-text="Guardando...">Guardar producto</button>
            </form>
        </section>

        <section class="panel">
            <form class="stacked-form products-bulk-form" data-form="admin-products-bulk-update">
                <div class="section-head compact-section-head">
                    <div>
                        <h2>Editar productos actuales</h2>
                        <p class="muted">Puedes cambiar precios y estado; las imágenes se toman del bucket product-images por nombre de producto.</p>
                    </div>
                    <button class="button primary" type="submit" data-busy-text="Guardando...">Guardar todos los cambios</button>
                </div>
                <div class="table-stack">
                    ${products.map((product) => `
                        <div class="table-form-row product-admin-row" data-product-row>
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
                        </div>
                    `).join("")}
                </div>
                <p class="field-note" data-inline-status>Los cambios se guardan juntos en Supabase.</p>
                <button class="button primary" type="submit" data-busy-text="Guardando...">Guardar todos los cambios</button>
            </form>
        </section>
    `;
}

function renderAdminClientsPage(clients) {
    return `
        <section class='section-head'>
            <div>
                <p class='eyebrow'>Base de clientas</p>
                <h1>Clientas registradas</h1>
            </div>
        </section>

        <section class='panel'>
            <div class='section-head compact-section-head'>
                <div>
                    <h2>Ingresar clienta manual</h2>
                    <p class='muted'>Para clientas que no usarán la app. Quedan disponibles para pedidos, boletas semanales, cobros mensuales y WhatsApp.</p>
                </div>
            </div>
            <form class='inline-form grid-form admin-client-form' data-form='admin-client-create'>
                <label>Nombre
                    <input type='text' name='name' autocomplete='name' required>
                </label>
                <label>Correo de contacto
                    <input type='email' name='email' autocomplete='email' required>
                </label>
                <label>Teléfono WhatsApp
                    <input type='tel' name='phone' autocomplete='tel' placeholder='569...' required>
                </label>
                <label>Tipo de pago
                    <select name='billing_type'>
                        <option value='semanal'>Semanal</option>
                        <option value='mensual'>Mensual</option>
                    </select>
                </label>
                <label class='full-row'>Dirección
                    <textarea name='address' rows='2' autocomplete='street-address' required></textarea>
                </label>
                <p class='field-note full-row' data-inline-status>La clienta se crea sin acceso Auth; si después quiere usar la app, se enlaza con el mismo correo.</p>
                <button class='button primary' type='submit' data-busy-text='Creando...'>Crear clienta</button>
            </form>
        </section>

        <section class='panel'>
            <table class='data-table'>
                <thead>
                    <tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Dirección</th><th>Pedidos</th><th>Pago</th><th>Origen</th><th>Clave</th><th>Acción</th></tr>
                </thead>
                <tbody>
                    ${clients.length ? clients.map((client) => `
                        <tr>
                            <td>${e(client.name)}</td>
                            <td>${e(client.email)}</td>
                            <td>${e(client.phone)}</td>
                            <td>${e(client.address)}</td>
                            <td>${client.order_count}</td>
                            <td>${e(client.billing_type || 'semanal')}</td>
                            <td>${client.auth_user_id ? 'App' : 'Manual'}</td>
                            <td>${client.auth_user_id ? (client.must_reset_password ? `<span class='status-pill' data-status='pendiente'>Debe cambiar</span>` : `<span class='status-pill' data-status='pagado'>Activa</span>`) : `<span class='muted'>Sin acceso</span>`}</td>
                            <td>
                                <div class='table-actions admin-client-actions'>
                                    <a class='button secondary table-action-button' href='#/admin/clientes/${client.id}/pedido'>Pedido</a>
                                    ${client.email ? `<button class='button ghost table-action-button' type='button' title='Resetear clave' aria-label='Resetear clave de ${e(client.name)}' data-action='reset-client-password' data-client-id='${client.id}' data-client-name='${e(client.name)}' data-client-email='${e(client.email)}'>Resetear</button>` : `<span class='muted'>Sin correo</span>`}
                                </div>
                            </td>
                        </tr>
                    `).join('') : `<tr><td colspan='9'>Aún no hay clientas registradas.</td></tr>`}
                </tbody>
            </table>
        </section>
    `;
}

function renderAdminClientOrderPage(client, products) {
    const groupedProducts = groupProducts(products);
    const activeCategories = CATEGORY_CHOICES.filter(([category]) => (groupedProducts.get(category) || []).length > 0);
    const categoryButtons = activeCategories.map(([category, label]) => `
        <button class='category-chip' type='button' data-action='focus-category' data-target='admin-cat-${e(productImageSlug(category))}' data-category-nav='${e(category)}'>${e(label)}</button>
    `).join('');
    const groupsMarkup = activeCategories.map(([category, label]) => {
        const items = groupedProducts.get(category) || [];
        if (!items.length) {
            return '';
        }
        return `
            <div class='panel product-group catalog-product-group' id='admin-cat-${e(productImageSlug(category))}' data-product-group data-category='${e(category)}'>
                <h2>${e(label)}</h2>
                <div class='product-table catalog-product-grid'>
                    ${items.map((product) => renderClientProductCard(product, {}, { category, variant: 'catalog' })).join('')}
                </div>
            </div>
        `;
    }).join('');

    return `
        <section class='section-head admin-client-order-head'>
            <div>
                <p class='eyebrow'>Pedido manual</p>
                <h1>${e(client.name)}</h1>
                <p class='muted'>${e(client.phone || 'Sin teléfono')} | ${e(client.address || 'Sin dirección')} | ${e(client.billing_type || 'semanal')}</p>
            </div>
            <div class='hero-actions'>
                <a class='button ghost' href='#/admin/clientes'>Volver a clientas</a>
            </div>
        </section>

        <form class='catalog-app catalog-screen admin-client-order-page mobile-shop-order' data-form='admin-client-order-create' data-order-form data-delivery-fee='${DELIVERY_FEE}'>
            <input type='hidden' name='client_id' value='${client.id}'>
            <section class='catalog-toolbar shop-catalog-toolbar'>
                <div class='shop-searchbar catalog-search'>
                    <span class='shop-search-icon' aria-hidden='true'></span>
                    <input type='search' data-product-search placeholder='Buscar productos...' aria-label='Buscar producto'>
                </div>
            </section>
            <nav class='category-tabs catalog-category-tabs shop-catalog-tabs admin-client-order-tabs' aria-label='Categorías del catálogo'>
                ${categoryButtons}
            </nav>
            <p class='empty-search' data-product-search-empty hidden>No encontré productos con ese nombre.</p>
            ${groupsMarkup || `<section class='panel'><p class='muted'>No hay productos activos para crear el pedido.</p></section>`}
            ${renderClientNotesDetails('', '')}
            ${renderClientOrderSubmitPanel({
                primaryLabel: 'Guardar pedido manual',
                statusText: 'El pedido quedará pendiente para ajuste, boleta y seguimiento.',
                className: 'admin-manual-submit-panel',
            })}
        </form>
    `;
}

function renderAdminConsolidationPage(consolidation, month) {
    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Operaciones</p>
                <h1>Consolidado de compras</h1>
                <p class="muted">Agregado por semana. Cerrar semana deja los pedidos en Comprado y conserva sus precios aunque cambie la lista siguiente.</p>
            </div>
            <div class="hero-actions">
                <form class="month-filter" data-form="admin-consolidation-filter">
                    <input type="month" name="month" value="${e(month)}">
                    <button class="button ghost" type="submit">Filtrar mes</button>
                </form>
                <button class="button primary" type="button" data-action="export-consolidation" data-month="${e(month)}">Exportar XLS</button>
                <a class="button ghost" href="#/admin/cobros-mensuales?month=${e(month)}">Cobros mensuales</a>
                <a class="button ghost" href="#/admin/dashboard">Volver</a>
            </div>
        </section>

        ${consolidation.length ? `
            <section class="panel">
                <h2>Resumen por semana</h2>
                ${consolidation.map((week, index) => `
                    <details class="week-card" ${index === 0 ? "open" : ""}>
                        <summary>
                            <div>
                                <strong>${e(week.label)}</strong>
                                <span class="week-status-line">
                                    ${week.order_count} pedido(s) · ${week.pending_count} pendiente(s) · ${week.purchased_count} comprado(s) · ${week.paid_count} pagado(s)
                                </span>
                            </div>
                            <strong>${formatCurrency(week.total)}</strong>
                        </summary>
                        <div class="week-closure-actions">
                            <p class="muted">Al cerrar, las clientas semanales y mensuales quedan con este pedido en Comprado. Luego puedes enviar la boleta semanal desde cada pedido.</p>
                            <button class="button primary" type="button" data-action="close-week" data-week-start="${e(week.week_start)}" data-week-end="${e(week.week_end)}" ${week.pending_count ? "" : "disabled"}>${week.pending_count ? "Cerrar semana" : "Semana cerrada"}</button>
                        </div>
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

function renderAdminMonthlyBillingPage(groups, month) {
    const cards = groups.length
        ? groups.map((group) => renderMonthlyBillingClientCard(group, month)).join("")
        : `<section class="panel monthly-empty-panel"><p class="muted">No hay clientas mensuales con pedidos en este mes.</p></section>`;
    const monthLabel = monthDisplayLabel(month);
    const previousMonth = shiftMonthValue(month, -1);
    const nextMonth = shiftMonthValue(month, 1);
    const pendingTotal = groups.reduce((sum, group) => sum + group.pending_count, 0);
    const pendingNotice = pendingTotal
        ? `<p class="muted monthly-standard-note">${pendingTotal} pedido(s) mensual(es) siguen pendientes. Para que entren al cobro, primero cierra sus semanas desde el consolidado.</p>`
        : `<p class="muted monthly-standard-note">Los pedidos cerrados de este mes quedan listos para imprimir o enviar por WhatsApp.</p>`;

    return `
        <section class="section-head monthly-standard-head">
            <div>
                <p class="eyebrow">Cobro mensual</p>
                <h1>Clientes mensuales</h1>
                <p class="muted">Resumen simple de ${e(monthLabel)}: fecha, monto semanal y total a cancelar por clienta.</p>
            </div>
            <div class="hero-actions monthly-standard-actions">
                <a class="button ghost" href="#/admin/cobros-mensuales?month=${e(previousMonth)}">Mes anterior</a>
                <form class="month-filter" data-form="admin-monthly-billing-filter">
                    <input type="month" name="month" value="${e(month)}" aria-label="Mes del cobro mensual">
                    <button class="button ghost" type="submit">Ver mes</button>
                </form>
                <a class="button ghost" href="#/admin/cobros-mensuales?month=${e(nextMonth)}">Mes siguiente</a>
                <a class="button primary" href="#/admin/consolidado?month=${e(month)}">Cerrar semanas</a>
            </div>
        </section>

        <section class="panel monthly-standard-guide">
            <h2>Como se usa</h2>
            <p>Primero cierra cada semana en el consolidado. Esos pedidos quedan en Comprado con precio fijo.</p>
            <p>Al final del mes, envias este resumen simple a cada clienta mensual; el detalle queda en sus boletas semanales y en la app.</p>
            ${pendingNotice}
        </section>

        <section class="monthly-billing-list monthly-billing-list--redesign">
            ${cards}
        </section>
    `;
}

function renderMonthlyBillingClientCard(group, month) {
    const rows = group.orders.length
        ? group.orders.map((order) => `
            <tr>
                <td>${e(formatDateNumeric(order.created_at))}</td>
                <td class="money-cell">${formatCurrency(order.display_total)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="2" class="monthly-empty-row">Sin pedidos cerrados. Cierra la semana antes de enviar el cobro mensual.</td></tr>`;
    const disabled = group.orders.length ? "" : "disabled";
    const pendingNotice = group.pending_count
        ? `<div class="monthly-pending-alert"><span class="monthly-alert-icon" aria-hidden="true"></span><p>${group.pending_count} pedido(s) mensual(es) siguen pendientes y no entran al cobro hasta cerrar la semana.</p></div>`
        : `<div class="monthly-ready-alert"><span class="monthly-ready-icon" aria-hidden="true"></span><p>Listo para enviar el consolidado mensual.</p></div>`;

    return `
        <article class="monthly-client-card">
            <div class="monthly-client-head">
                <span class="monthly-client-avatar" aria-hidden="true"></span>
                <div>
                    <h3>${e(group.client_name)}</h3>
                    <p>Cliente #${group.client_id} <span>|</span> ${e(group.client_phone || "Sin telefono")} <span>|</span> ${e(group.client_address || "Sin direccion")}</p>
                </div>
            </div>
            <div class="monthly-client-actions">
                <button class="button ghost" type="button" data-action="print-monthly-client" data-client-id="${group.client_id}" data-month="${e(month)}" ${disabled}><span class="monthly-icon monthly-icon-print" aria-hidden="true"></span>Imprimir / PDF</button>
                <button class="button primary" type="button" data-action="open-monthly-whatsapp" data-client-id="${group.client_id}" data-month="${e(month)}" ${disabled}><span class="monthly-icon monthly-icon-whatsapp" aria-hidden="true"></span>Enviar por WhatsApp</button>
            </div>
            ${pendingNotice}
            <div class="monthly-charge-sheet" aria-label="Consolidado mensual de ${e(group.client_name)}">
                <table class="monthly-charge-table">
                    <thead>
                        <tr><th colspan="2" class="monthly-charge-name"><span class="monthly-table-leaf" aria-hidden="true"></span>${e(group.client_name)}<span class="monthly-table-leaf" aria-hidden="true"></span></th></tr>
                        <tr><th>Fecha</th><th>Monto</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                    <tfoot>
                        <tr><th>TOTAL A PAGAR</th><td>${formatCurrency(group.total)}</td></tr>
                    </tfoot>
                </table>
            </div>
        </article>
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
                <p>2. Ejecuta <code>supabase/sql/009_github_pages_auth.sql</code>, <code>supabase/sql/011_admin_first_login_setup.sql</code>, <code>supabase/sql/012_catalog_units_other_request.sql</code>, <code>supabase/sql/013_client_registration_repair.sql</code>, <code>supabase/sql/014_product_classification_presentation.sql</code>, <code>supabase/sql/015_product_images_and_order_edit.sql</code>, <code>supabase/sql/016_admin_email_allowlist.sql</code>, <code>supabase/sql/017_admin_manual_clients.sql</code>, <code>supabase/sql/018_add_seafood_category.sql</code>, <code>supabase/sql/019_product_image_upload_policy.sql</code>, <code>supabase/sql/020_client_password_reset_flow.sql</code> y <code>supabase/sql/021_admin_extra_order_items.sql</code> en el SQL Editor.</p>
                <p>3. Despliega las Edge Functions <code>admin-reset-client-password</code> y <code>admin-create-client-order</code> para que administración pueda resetear claves y crear pedidos manuales.</p>
                <p>4. Crea las administradoras en Supabase Auth con la clave temporal acordada.</p>
                <p>5. Publica la carpeta <code>docs/</code> desde GitHub Pages.</p>
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
                <p>Archivos clave: <code>supabase/sql/009_github_pages_auth.sql</code>, <code>supabase/sql/011_admin_first_login_setup.sql</code>, <code>supabase/sql/012_catalog_units_other_request.sql</code>, <code>supabase/sql/013_client_registration_repair.sql</code>, <code>supabase/sql/014_product_classification_presentation.sql</code>, <code>supabase/sql/015_product_images_and_order_edit.sql</code>, <code>supabase/sql/016_admin_email_allowlist.sql</code>, <code>supabase/sql/017_admin_manual_clients.sql</code>, <code>supabase/sql/018_add_seafood_category.sql</code>, <code>supabase/sql/019_product_image_upload_policy.sql</code>, <code>supabase/sql/020_client_password_reset_flow.sql</code> y <code>supabase/sql/021_admin_extra_order_items.sql</code></p>
                <p>Funciones Edge: <code>supabase/functions/admin-reset-client-password</code> y <code>supabase/functions/admin-create-client-order</code> desplegadas en Supabase.</p>
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
    const countNodes = Array.from(new Set([
        ...form.querySelectorAll("[data-selected-count]"),
        ...document.querySelectorAll(".client-top-nav [data-selected-count]"),
        ...document.querySelectorAll(".client-bottom-nav [data-selected-count]"),
    ]));
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
        const removeButton = row?.querySelector("[data-remove-product]");
        if (removeButton) {
            removeButton.hidden = !isSelected;
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
    const latestOrder = orders[0] || null;
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
        latest_order: latestOrder,
    };
}

function buildAdminOrderWeeks(orders) {
    const weeks = new Map();

    for (const order of orders) {
        const meta = weekMetaForDate(order.created_at);
        if (!weeks.has(meta.key)) {
            weeks.set(meta.key, {
                ...meta,
                orders: [],
                total: 0,
                order_count: 0,
                pending_count: 0,
                purchased_count: 0,
                paid_count: 0,
            });
        }

        const week = weeks.get(meta.key);
        week.orders.push(order);
        week.total += order.display_total;
        week.order_count += 1;
        if (order.status === "pendiente") {
            week.pending_count += 1;
        } else if (order.status === "pagado") {
            week.paid_count += 1;
        } else if (order.status === "comprado") {
            week.purchased_count += 1;
        }
    }

    return [...weeks.values()]
        .map((week) => ({
            ...week,
            orders: week.orders.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at) || b.id - a.id),
        }))
        .sort((a, b) => new Date(b.week_start) - new Date(a.week_start));
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
        const meta = weekMetaForDate(order.created_at);
        if (!weeks.has(meta.key)) {
            weeks.set(meta.key, {
                ...meta,
                products: new Map(),
                order_count: 0,
                pending_count: 0,
                purchased_count: 0,
                paid_count: 0,
            });
        }

        const week = weeks.get(meta.key);
        week.order_count += 1;
        if (order.status === "pendiente") {
            week.pending_count += 1;
        } else if (order.status === "pagado") {
            week.paid_count += 1;
        } else if (order.status === "comprado") {
            week.purchased_count += 1;
        }

        for (const item of order.items || []) {
            const key = `${item.product_name}||${item.requested_unit}`;
            const current = week.products.get(key) || {
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
            week.products.set(key, current);
        }
    }

    return [...weeks.values()]
        .map((week) => ({
            ...week,
            products: [...week.products.values()].sort((a, b) => a.product_name.localeCompare(b.product_name, "es")),
            total: [...week.products.values()].reduce((sum, product) => sum + product.total, 0),
        }))
        .sort((a, b) => new Date(b.week_start) - new Date(a.week_start));
}

function buildMonthlyBilling(orders) {
    const groups = new Map();

    for (const order of orders) {
        if (order.client_billing_type !== "mensual") {
            continue;
        }
        const key = order.client_id;
        const group = groups.get(key) || {
            client_id: key,
            client_name: order.client_name || `Clienta #${key}`,
            client_phone: order.client_phone || "",
            client_address: order.client_address || "",
            orders: [],
            pending_count: 0,
            total: 0,
            total_due: 0,
        };

        if (isOrderClosedForMonthlyStatement(order)) {
            group.orders.push(order);
            group.total += order.display_total;
            if (order.status !== "pagado") {
                group.total_due += order.display_total;
            }
        } else {
            group.pending_count += 1;
        }
        groups.set(key, group);
    }

    return [...groups.values()]
        .map((group) => ({
            ...group,
            orders: monthlyStatementOrders(group.orders),
        }))
        .sort((a, b) => a.client_name.localeCompare(b.client_name, "es"));
}

function monthlyStatementOrders(orders) {
    return orders
        .filter(isOrderClosedForMonthlyStatement)
        .slice()
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || a.id - b.id);
}

function isOrderClosedForMonthlyStatement(order) {
    return order.status === "comprado" || order.status === "pagado";
}

function weekMetaForDate(value) {
    const orderDate = new Date(value);
    const weekStart = startOfWeek(orderDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const weekNumber = isoWeekNumber(orderDate);
    return {
        key: weekStart.toISOString().slice(0, 10),
        label: `Semana ${String(weekNumber).padStart(2, "0")} (${orderDate.getFullYear()})`,
        week_start: weekStart.toISOString(),
        week_end: weekEnd.toISOString(),
    };
}

function weekLabelForDate(value) {
    return weekMetaForDate(value).label;
}


function buildConsolidationClientDetailRows(orders) {
    return orders
        .slice()
        .sort((a, b) => {
            return (
                String(a.client_name || "").localeCompare(String(b.client_name || ""), "es") ||
                new Date(a.created_at) - new Date(b.created_at) ||
                a.id - b.id
            );
        })
        .flatMap((order) => {
            const orderDate = new Date(order.created_at);
            const weekNumber = isoWeekNumber(orderDate);
            const weekLabel = `Semana ${String(weekNumber).padStart(2, "0")} (${orderDate.getFullYear()})`;
            return (order.items || []).map((item) => {
                const actualTotal = item.was_missing
                    ? "Faltó"
                    : item.actual_total === null || item.actual_total === undefined
                        ? "-"
                        : item.actual_total;
                const note = [item.was_missing ? "No disponible" : "", item.item_note || ""].filter(Boolean).join(" - ") || "-";
                return [
                    weekLabel,
                    `#${order.id}`,
                    formatDateTime(order.created_at),
                    order.client_name || "",
                    order.client_phone || "",
                    order.client_address || "",
                    statusLabel(order.status),
                    item.product_name,
                    formatQty(item.quantity),
                    unitLabel(item.requested_unit),
                    item.estimated_total,
                    actualTotal,
                    note,
                ];
            });
        });
}

function buildExcelWorkbook(sheets) {
    return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
    xmlns:html="http://www.w3.org/TR/REC-html40">
    <Styles>
        <Style ss:ID="header"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#1f6d2d" ss:Pattern="Solid"/></Style>
    </Styles>
    ${sheets.map(buildExcelWorksheet).join("\n")}
</Workbook>`;
}

function buildExcelWorksheet(sheet) {
    const rows = sheet.rows.length ? sheet.rows : [[sheet.empty || "Sin datos"]];
    return `<Worksheet ss:Name="${excelXml(sheet.name).slice(0, 31)}">
        <Table>
            <Row>${sheet.columns.map((column) => excelCell(column, "String", "header")).join("")}</Row>
            ${rows.map((row) => `<Row>${row.map((cell) => excelCell(cell)).join("")}</Row>`).join("\n")}
        </Table>
    </Worksheet>`;
}

function excelCell(value, forcedType, style) {
    const type = forcedType || (typeof value === "number" && Number.isFinite(value) ? "Number" : "String");
    const styleAttr = style ? ` ss:StyleID="${style}"` : "";
    return `<Cell${styleAttr}><Data ss:Type="${type}">${excelXml(value)}</Data></Cell>`;
}

function excelXml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
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

async function resolveOrderDraftFromRoute(route) {
    const editId = Number(route.query.get("edit") || 0);
    const sourceId = Number(route.query.get("source") || 0);

    if (!editId && !sourceId) {
        return { draft: readOrderDraft(), editOrder: null, sourceOrder: null, view: null };
    }

    const orderId = editId || sourceId;
    const order = await fetchOrderById(orderId, { clientId: state.profile.id });
    if (!order) {
        return { draft: readOrderDraft(), editOrder: null, sourceOrder: null, view: { title: "No encontrado", content: renderNotFound("No encontré ese pedido.") } };
    }
    if (editId && order.status !== "pendiente") {
        return { draft: readOrderDraft(), editOrder: null, sourceOrder: null, view: redirectView(`/cliente/pedido/${order.id}`, "Solo puedes editar pedidos pendientes.", "error") };
    }

    const draft = draftFromOrderOrCurrent(order, Boolean(editId));
    return {
        draft,
        editOrder: editId ? order : null,
        sourceOrder: sourceId ? order : null,
        view: null,
    };
}

function buildOrderDraftFromOrder(order, isEdit) {
    return {
        selections: buildRepeatSelections(order),
        client_note: order.client_note || "",
        other_request: order.other_request || "",
        source_order_id: isEdit ? null : order.id,
        edit_order_id: isEdit ? order.id : null,
    };
}

function draftFromOrderOrCurrent(order, isEdit) {
    const currentDraft = readOrderDraft();
    if (draftMatchesOrderContext(currentDraft, order, isEdit)) {
        return currentDraft;
    }
    const draft = buildOrderDraftFromOrder(order, isEdit);
    writeOrderDraft(draft);
    return draft;
}

function draftMatchesOrderContext(draft, order, isEdit) {
    const normalized = normalizeOrderDraft(draft);
    if (!order?.id) return false;
    if (isEdit) return normalized.edit_order_id === Number(order.id);
    return normalized.source_order_id === Number(order.id) && !normalized.edit_order_id;
}

function readOrderDraft() {
    const emptyDraft = { selections: {}, client_note: "", other_request: "", source_order_id: null, edit_order_id: null };
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

function writeOrderDraft(draft) {
    try {
        const normalized = normalizeOrderDraft(draft);
        const hasContent = Object.keys(normalized.selections).length || normalized.client_note || normalized.other_request || normalized.source_order_id || normalized.edit_order_id;
        if (!hasContent) {
            window.localStorage?.removeItem(cartStorageKey());
            return;
        }
        window.localStorage?.setItem(cartStorageKey(), JSON.stringify(normalized));
    } catch (error) {
        // localStorage can be unavailable in strict privacy modes.
    }
}

function persistOrderDraft(form) {
    try {
        const formData = new FormData(form);
        const existingDraft = readOrderDraft();
        const visibleSelections = collectOrderSelections(form, { relaxed: true });
        const draft = {
            selections: mergeOrderSelections(existingDraft.selections, visibleSelections, collectOrderProductIds(form)),
            client_note: sanitizeText(formData.get("client_note"), MAX_CLIENT_NOTE_LENGTH),
            other_request: sanitizeText(formData.get("other_request"), MAX_OTHER_REQUEST_LENGTH),
            source_order_id: Number(formData.get("source_order_id") || 0) || null,
            edit_order_id: Number(formData.get("edit_order_id") || 0) || null,
        };
        writeOrderDraft(draft);
    } catch (error) {
        // localStorage can be unavailable in strict privacy modes.
    }
}

function removeProductFromDraft(productId, form) {
    try {
        const draft = readOrderDraft();
        delete draft.selections[Number(productId)];
        if (form) {
            const formData = new FormData(form);
            draft.client_note = sanitizeText(formData.get("client_note"), MAX_CLIENT_NOTE_LENGTH);
            draft.other_request = sanitizeText(formData.get("other_request"), MAX_OTHER_REQUEST_LENGTH);
            draft.source_order_id = Number(formData.get("source_order_id") || draft.source_order_id || 0) || null;
            draft.edit_order_id = Number(formData.get("edit_order_id") || draft.edit_order_id || 0) || null;
        }
        writeOrderDraft(draft);
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
        source_order_id: Number(raw?.source_order_id || 0) || null,
        edit_order_id: Number(raw?.edit_order_id || 0) || null,
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
        const unitNode = form.querySelector(`[name="unit_${productId}"]:checked`) || form.querySelector(`[name="unit_${productId}"]`);
        selections[productId] = {
            quantity,
            requested_unit: normalizeUnit(unitNode?.value),
        };
    }
    return selections;
}

function collectOrderProductIds(form) {
    return new Set(Array.from(form.querySelectorAll("[data-quantity-input]"))
        .map((input) => Number(input.name.replace("qty_", "")))
        .filter(Boolean));
}

function mergeOrderSelections(existingSelections = {}, visibleSelections = {}, visibleProductIds = new Set()) {
    const merged = { ...normalizeOrderDraft({ selections: existingSelections }).selections };
    for (const productId of visibleProductIds) {
        delete merged[productId];
    }
    for (const [productId, selection] of Object.entries(visibleSelections)) {
        const quantity = normalizeQuantity(selection?.quantity);
        if (quantity > 0) {
            merged[Number(productId)] = {
                quantity,
                requested_unit: normalizeUnit(selection?.requested_unit || selection?.unit),
            };
        }
    }
    return merged;
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


let receiptLogoDataUrl = "";

async function buildOrderPdfBlob(order, includeClient) {
    const PdfConstructor = pdfConstructor();
    const doc = new PdfConstructor({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    doc.setProperties({
        title: `Pedido #${order.id} | ${APP_NAME}`,
        subject: "Boleta de pedido",
        author: APP_NAME,
    });

    const page = { width: 210, height: 297 };
    const margin = 8;
    const green = [24, 86, 55];
    const leafGreen = [112, 168, 58];
    const orange = [242, 112, 16];
    const border = [184, 216, 153];

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, page.width, page.height, "F");

    try {
        const logo = await getReceiptLogoDataUrl();
        doc.addImage(logo, "PNG", margin, 6, 58, 58, undefined, "FAST");
    } catch (error) {
        console.warn("No pude cargar el logo para el PDF.", error);
        setPdfFont(doc, 16, "bold", green);
        doc.text(APP_NAME, margin, 22);
    }

    setPdfFont(doc, 25, "bold", green);
    doc.text(`Pedido #${order.id}`, 126, 23);
    doc.setDrawColor(...orange);
    doc.setLineWidth(1.1);
    doc.line(150, 31, 162, 31);

    if (includeClient) {
        const clientLine = [order.client_name, order.client_email, order.client_phone].filter(Boolean).join(" | ");
        setPdfFont(doc, 8.5, "normal", [40, 52, 47]);
        doc.text(fitPdfText(doc, clientLine || "Clienta sin datos", 72), 126, 42);
    }
    setPdfFont(doc, 7.5, "normal", [98, 118, 106]);
    doc.text(`${formatDateTime(order.created_at)} | Estado: ${statusLabel(order.status)}`, 126, 50);

    drawDeliveryBlock(doc, margin, 68, page.width - margin * 2, 22, order, green, leafGreen, border);
    drawSummaryBlock(doc, margin, 98, page.width - margin * 2, 43, order, green, orange, leafGreen, border);

    let productsY = 150;
    const notes = [
        order.client_note ? ["Observaciones", order.client_note] : null,
        order.other_request ? ["Otro", order.other_request] : null,
    ].filter(Boolean);
    if (notes.length) {
        drawNotesBlock(doc, margin, productsY, page.width - margin * 2, 22, notes, green, border);
        productsY += 28;
    }

    drawProductsTable(doc, margin, productsY, page.width - margin * 2, 268 - productsY, order.items || [], green, leafGreen, border);
    drawReceiptFooter(doc, margin, 273, page.width - margin * 2, green, orange, leafGreen);

    return doc.output("blob");
}


async function buildMonthlyStatementPdfBlob(client, month, orders) {
    const PdfConstructor = pdfConstructor();
    const doc = new PdfConstructor({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const statementOrders = monthlyStatementOrders(orders);
    const page = { width: 210, height: 297 };
    const green = [24, 86, 55];
    const orange = [242, 112, 16];
    const red = [220, 0, 0];

    doc.setProperties({
        title: `Cobro mensual ${month} | ${APP_NAME}`,
        subject: "Consolidado mensual de pedidos",
        author: APP_NAME,
    });
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, page.width, page.height, "F");

    try {
        const logo = await getReceiptLogoDataUrl();
        doc.addImage(logo, "PNG", 82, 16, 46, 31, undefined, "FAST");
    } catch (error) {
        console.warn("No pude cargar el logo para el PDF mensual.", error);
        setPdfFont(doc, 16, "bold", green);
        doc.text(APP_NAME, page.width / 2, 28, { align: "center" });
    }

    setPdfFont(doc, 10, "bold", orange);
    doc.text(monthDisplayLabel(month).toUpperCase(), page.width / 2, 54, { align: "center" });
    drawMonthlyStatementTable(doc, 54, 64, 102, client.name || `Clienta #${client.id}`, statementOrders, green, red);
    return doc.output("blob");
}

function drawMonthlyStatementTable(doc, x, y, width, clientName, orders, green, red) {
    const colW = width / 2;
    const rowH = 9;
    const total = orders.reduce((sum, order) => sum + order.display_total, 0);
    const rows = orders.length
        ? orders.map((order) => [formatDateNumeric(order.created_at), formatCurrency(order.display_total)])
        : [["Sin pedidos", "-"]];
    const tableRows = [[clientName, "__merge"], ["Fecha", "Monto"], ...rows, ["Total", formatCurrency(total)]];

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.25);
    let currentY = y;

    tableRows.forEach((row, index) => {
        const isName = index === 0;
        const isHeader = index === 1;
        const isTotal = index === tableRows.length - 1;
        if (isTotal) {
            doc.setFillColor(255, 247, 0);
            doc.rect(x, currentY, width, rowH, "F");
        }
        doc.rect(x, currentY, width, rowH);
        if (!isName) {
            doc.line(x + colW, currentY, x + colW, currentY + rowH);
        }

        setPdfFont(doc, isName ? 11 : 10, isName || isHeader || isTotal ? "bold" : "normal", isTotal ? red : [0, 0, 0]);
        if (isName) {
            doc.text(row[0] || "Clienta", x + width / 2, currentY + 6.2, { align: "center" });
        } else {
            doc.text(row[0], x + colW / 2, currentY + 6.2, { align: "center" });
            doc.text(row[1], x + colW + colW / 2, currentY + 6.2, { align: "center" });
        }
        currentY += rowH;
    });
}

function pdfConstructor() {
    const constructor = window.jspdf?.jsPDF || window.jsPDF;
    if (!constructor) {
        throw new Error("No se pudo cargar el generador de PDF. Revisa la conexión e intenta nuevamente.");
    }
    return constructor;
}

async function getReceiptLogoDataUrl() {
    if (receiptLogoDataUrl) {
        return receiptLogoDataUrl;
    }
    const response = await fetch(assetUrl("./static/logo-verduleria-isa.png"));
    if (!response.ok) {
        throw new Error("No pude cargar el logo del PDF.");
    }
    receiptLogoDataUrl = await blobToDataUrl(await response.blob());
    return receiptLogoDataUrl;
}

function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(reader.error || new Error("No pude leer la imagen."));
        reader.readAsDataURL(blob);
    });
}

function drawDeliveryBlock(doc, x, y, width, height, order, green, leafGreen, border) {
    drawRoundedPanel(doc, x, y, width, height, 4, border, [255, 255, 255]);
    doc.setFillColor(...leafGreen);
    doc.circle(x + 13, y + height / 2, 7, "F");
    setPdfFont(doc, 12, "bold", green);
    doc.text("Datos de entrega", x + 25, y + 9);
    setPdfFont(doc, 11, "normal", [31, 47, 41]);
    doc.text(fitPdfText(doc, order.client_address || "Dirección no informada", width - 34), x + 25, y + 17);
}

function receiptSubtotalActualText(order) {
    const actualSubtotal = order.subtotal_actual === undefined ? order.actual_total : order.subtotal_actual;
    return actualSubtotal === null || actualSubtotal === undefined ? "-" : formatCurrency(actualSubtotal);
}

function drawSummaryBlock(doc, x, y, width, height, order, green, orange, leafGreen, border) {
    drawRoundedPanel(doc, x, y, width, height, 4, border, [255, 255, 255]);
    setPdfFont(doc, 15, "bold", green);
    doc.text(`Pedido #${order.id}`, x + width / 2, y + 10, { align: "center" });
    const gap = 4;
    const cardWidth = (width - gap * 3 - 8) / 4;
    const cardY = y + 15;
    const cards = [
        ["Subtotal estimado", "de productos", formatCurrency(order.subtotal_estimated), green],
        ["Subtotal real", "de productos", receiptSubtotalActualText(order), green],
        ["Despacho fijo", "", formatCurrency(order.delivery_fee), orange],
        ["Total", "con despacho", formatCurrency(order.display_total), green],
    ];
    cards.forEach((card, index) => {
        const cardX = x + 4 + index * (cardWidth + gap);
        drawRoundedPanel(doc, cardX, cardY, cardWidth, 22, 3.5, border, [255, 254, 251]);
        setPdfFont(doc, 11.2, "bold", card[3]);
        doc.text(card[2], cardX + 5, cardY + 8);
        setPdfFont(doc, 6.9, "normal", [31, 47, 41]);
        doc.text(card[0], cardX + 5, cardY + 15);
        if (card[1]) {
            doc.text(card[1], cardX + 5, cardY + 18.8);
        }
    });
}
function drawNotesBlock(doc, x, y, width, height, notes, green, border) {
    drawRoundedPanel(doc, x, y, width, height, 4, border, [255, 255, 255]);
    const columnWidth = notes.length > 1 ? (width - 8) / 2 : width - 8;
    notes.forEach(([title, text], index) => {
        const noteX = x + 5 + index * (columnWidth + 4);
        setPdfFont(doc, 9, "bold", green);
        doc.text(title, noteX, y + 8);
        setPdfFont(doc, 7.6, "normal", [61, 82, 70]);
        const clipped = fitPdfText(doc, text, columnWidth - 2);
        doc.text(clipped, noteX, y + 16);
    });
}

function drawProductsTable(doc, x, y, width, height, items, green, leafGreen, border) {
    drawRoundedPanel(doc, x, y, width, height, 4, border, [255, 255, 255]);
    setPdfFont(doc, 12, "bold", green);
    doc.text("Productos", x + 7, y + 9);

    const tableX = x + 4;
    const tableY = y + 14;
    const tableW = width - 8;
    const headerH = 7;
    const rows = items.length ? items : [];
    const rowH = rows.length ? Math.max(3.15, Math.min(6, (height - 22 - headerH) / rows.length)) : 8;
    const bodyFont = Math.max(5.1, Math.min(8, rowH * 1.35));
    const columns = [
        ["Producto", 52],
        ["Cantidad", 24],
        ["Subtotal estimado", 33],
        ["Subtotal real", 30],
        ["Nota", tableW - 139],
    ];

    doc.setFillColor(42, 111, 40);
    doc.roundedRect(tableX, tableY, tableW, headerH, 2.5, 2.5, "F");
    setPdfFont(doc, 7.3, "bold", [255, 255, 255]);
    let currentX = tableX;
    columns.forEach(([label, colW], index) => {
        doc.text(label, currentX + 2.2, tableY + 4.7);
        if (index > 0) {
            doc.setDrawColor(199, 225, 185);
            doc.line(currentX, tableY, currentX, tableY + headerH);
        }
        currentX += colW;
    });

    if (!rows.length) {
        setPdfFont(doc, 8, "normal", [31, 47, 41]);
        doc.text("Sin productos.", tableX + 3, tableY + headerH + 7);
        return;
    }

    let rowY = tableY + headerH;
    rows.forEach((item, index) => {
        doc.setFillColor(index % 2 ? 252 : 255, index % 2 ? 254 : 255, index % 2 ? 249 : 255);
        doc.rect(tableX, rowY, tableW, rowH, "F");
        doc.setDrawColor(221, 235, 205);
        doc.line(tableX, rowY, tableX + tableW, rowY);
        setPdfFont(doc, bodyFont, "normal", [31, 47, 41]);
        const actualTotal = item.was_missing
            ? "Faltó"
            : item.actual_total === null || item.actual_total === undefined
                ? "-"
                : formatCurrency(item.actual_total);
        const note = [item.was_missing ? "No disponible" : "", item.item_note || ""].filter(Boolean).join(" - ") || "-";
        const values = [
            item.product_name,
            formatOrderItemQuantity(item),
            formatCurrency(item.estimated_total),
            actualTotal,
            note,
        ];
        let textX = tableX;
        columns.forEach(([, colW], colIndex) => {
            if (colIndex > 0) {
                doc.setDrawColor(221, 235, 205);
                doc.line(textX, rowY, textX, rowY + rowH);
            }
            const maxWidth = colW - 4;
            const align = colIndex === 0 || colIndex === 4 ? "left" : "center";
            const drawX = align === "center" ? textX + colW / 2 : textX + 2.3;
            doc.text(fitPdfText(doc, values[colIndex], maxWidth), drawX, rowY + Math.min(rowH - 1, rowH * 0.68 + 1.1), { align });
            textX += colW;
        });
        rowY += rowH;
    });
}

function drawReceiptFooter(doc, x, y, width, green, orange, leafGreen) {
    const footerWidth = width * 0.68;
    const footerX = x + (width - footerWidth) / 2;
    doc.setFillColor(255, 250, 241);
    doc.roundedRect(footerX, y, footerWidth, 15, 4, 4, "F");
    setPdfFont(doc, 9, "normal", [31, 47, 41]);
    doc.text("Gracias por confiar en Verduler\u00eda Isa.", footerX + footerWidth / 2, y + 6, { align: "center" });
    setPdfFont(doc, 10, "bold", green);
    doc.text("\u00a1Llevamos frescura a tu mesa!", footerX + footerWidth / 2, y + 11, { align: "center" });
}
function drawRoundedPanel(doc, x, y, width, height, radius, strokeColor, fillColor) {
    doc.setFillColor(...fillColor);
    doc.setDrawColor(...strokeColor);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, y, width, height, radius, radius, "FD");
}

function setPdfFont(doc, size, style = "normal", color = [24, 86, 55]) {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
}

function fitPdfText(doc, value, maxWidth) {
    const ellipsis = "...";
    let text = String(value || "-").replace(/\s+/g, " ").trim();
    if (doc.getTextWidth(text) <= maxWidth) {
        return text;
    }
    while (text.length > 1 && doc.getTextWidth(`${text}${ellipsis}`) > maxWidth) {
        text = text.slice(0, -1);
    }
    return `${text.trim()}${ellipsis}`;
}

function orderPdfFilename(order) {
    return `Pedido_${order.id}_Verduleria_Isa.pdf`;
}

function orderWhatsappMessage(order) {
    return [
        `Hola ${order.client_name || ""},`,
        `te comparto el resumen del pedido #${order.id} de Verduleria Isa.`,
        `Total final o proyectado: ${formatCurrency(order.display_total)}.`,
        "",
        "La boleta PDF queda disponible desde el boton Imprimir / PDF en la app.",
    ].join("\n").trim();
}

function monthlyStatementFilename(client, month) {
    return `Cobro_mensual_${month}_${productImageSlug(client.name || `clienta_${client.id}`)}_Verduleria_Isa.pdf`;
}

function monthlyStatementWhatsappMessage(client, month, orders) {
    const statementOrders = monthlyStatementOrders(orders);
    const total = statementOrders.reduce((sum, order) => sum + order.display_total, 0);
    const rows = statementOrders.map((order) => `${formatDateNumeric(order.created_at)} | ${formatCurrency(order.display_total)}`);
    return [
        `${client.name || "Clienta"}`,
        "Fecha | Monto",
        ...rows,
        `Total | ${formatCurrency(total)}`,
        "",
        `Consolidado mensual ${monthDisplayLabel(month)} - Verduleria Isa.`,
    ].join("\n").trim();
}

function openWhatsAppDirect(phone, text) {
    const cleanPhone = String(phone || "").replace(/\D/g, "");
    if (!cleanPhone) {
        throw new Error("La clienta no tiene un numero valido para WhatsApp.");
    }
    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text || "")}`;
    window.open(url, "_blank", "noopener") || (window.location.href = url);
}

function openPdfBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const popup = window.open(url, "_blank", "noopener");
    if (!popup) {
        downloadBlob(filename, blob);
        return;
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 120000);
}

function buildOrderPrintMarkup(order, includeClient) {
    const logoUrl = assetUrl("./static/logo-verduleria-isa.png");
    const clientParts = includeClient
        ? [order.client_name, order.client_email, order.client_phone].filter(Boolean)
        : [];
    const clientMeta = clientParts.map((part) => e(part)).join('<span class="receipt-divider">|</span>');
    const noteBlocks = [
        order.client_note ? `<div><strong>Observaciones</strong><p>${e(order.client_note)}</p></div>` : "",
        order.other_request ? `<div><strong>Otro</strong><p>${e(order.other_request)}</p></div>` : "",
    ].filter(Boolean).join("");

    return `
        <article class="receipt-sheet">
            <header class="receipt-header">
                <div class="receipt-brand-block">
                    <img class="receipt-logo" src="${e(logoUrl)}" alt="${e(APP_NAME)}">
                </div>
                <div class="receipt-heading-block">
                    <div class="receipt-decoration" aria-hidden="true"></div>
                    <h1>Pedido #${order.id}</h1>
                    <span class="receipt-rule" aria-hidden="true"></span>
                    ${clientMeta ? `
                        <p class="receipt-client-line">
                            <span class="receipt-client-icon" aria-hidden="true"></span>
                            ${clientMeta}
                        </p>
                    ` : ""}
                    <p class="receipt-date">${e(formatDateTime(order.created_at))} | Estado: ${e(statusLabel(order.status))}</p>
                </div>
            </header>

            <section class="receipt-delivery-card">
                <span class="receipt-round-icon receipt-round-icon--truck" aria-hidden="true"></span>
                <div>
                    <h2>Datos de entrega</h2>
                    <p>${e(order.client_address || "Dirección no informada")}</p>
                </div>
            </section>

            <section class="receipt-summary-panel">
                <h2><span aria-hidden="true">&lsaquo;</span> Pedido #${order.id} <span aria-hidden="true">&rsaquo;</span></h2>
                <div class="receipt-summary-grid">
                    <article class="receipt-summary-card">
                        <span class="receipt-card-icon receipt-card-icon--basket" aria-hidden="true"></span>
                        <strong>${formatCurrency(order.subtotal_estimated)}</strong>
                        <p>Subtotal estimado<br>de productos</p>
                    </article>
                    <article class="receipt-summary-card">
                        <span class="receipt-card-icon receipt-card-icon--real" aria-hidden="true"></span>
                        <strong>${receiptSubtotalActualText(order)}</strong>
                        <p>Subtotal real<br>de productos</p>
                    </article>
                    <article class="receipt-summary-card receipt-summary-card--accent">
                        <span class="receipt-card-icon receipt-card-icon--truck" aria-hidden="true"></span>
                        <strong>${formatCurrency(order.delivery_fee)}</strong>
                        <p>Despacho fijo</p>
                    </article>
                    <article class="receipt-summary-card">
                        <span class="receipt-card-icon receipt-card-icon--total" aria-hidden="true"></span>
                        <strong>${formatCurrency(order.display_total)}</strong>
                        <p>Total<br>con despacho</p>
                    </article>
                </div>
            </section>

            ${noteBlocks ? `<section class="receipt-notes">${noteBlocks}</section>` : ""}

            <section class="receipt-products-panel">
                <h2><span class="receipt-leaf-badge" aria-hidden="true"></span> Productos</h2>
                <table>
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
                        ${renderReceiptOrderItemRows(order.items)}
                    </tbody>
                </table>
            </section>

            <footer class="receipt-footer">
                <p>Gracias por confiar en Verdulería Isa.<br><strong>¡Llevamos frescura a tu mesa!</strong></p>
            </footer>
        </article>
    `;
}

function renderReceiptOrderItemRows(items = []) {
    if (!items.length) {
        return `<tr><td colspan="5">Sin productos.</td></tr>`;
    }

    return items.map((item) => {
        const actualTotal = item.was_missing
            ? "Faltó"
            : item.actual_total === null || item.actual_total === undefined
                ? "-"
                : formatCurrency(item.actual_total);
        const note = [item.was_missing ? "No disponible" : "", item.item_note || ""].filter(Boolean).join(" · ") || "-";
        return `
            <tr>
                <td><span class="receipt-row-leaf" aria-hidden="true"></span>${e(item.product_name)}</td>
                <td>${e(formatOrderItemQuantity(item))}</td>
                <td>${formatCurrency(item.estimated_total)}</td>
                <td>${e(actualTotal)}</td>
                <td>${e(note)}</td>
            </tr>
        `;
    }).join("");
}

function buildMonthlyPrintMarkup(client, month, orders) {
    const statementOrders = monthlyStatementOrders(orders);
    const total = statementOrders.reduce((sum, order) => sum + order.display_total, 0);
    const rows = statementOrders.length
        ? statementOrders.map((order) => `
            <tr>
                <td>${e(formatDateNumeric(order.created_at))}</td>
                <td>${formatCurrency(order.display_total)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="2">Sin pedidos cerrados para este mes.</td></tr>`;
    return `
        <div class="print-sheet monthly-print-sheet">
            <table class="monthly-charge-table monthly-charge-table--print">
                <thead>
                    <tr><th colspan="2" class="monthly-charge-name">${e(client.name || "Clienta")}</th></tr>
                    <tr><th>Fecha</th><th>Monto</th></tr>
                </thead>
                <tbody>${rows}</tbody>
                <tfoot>
                    <tr><th>Total</th><td>${formatCurrency(total)}</td></tr>
                </tfoot>
            </table>
        </div>
    `;
}

function openPrintWindow(markup, title = `Imprimir | ${APP_NAME}`) {
    const popup = window.open("", "_blank", "width=1040,height=760");
    if (!popup) {
        throw new Error("Tu navegador bloqueó la ventana de impresión.");
    }

    popup.document.open();
    popup.document.write(buildPrintDocument(markup, title));
    popup.document.close();

    let printed = false;
    const waitForImages = () => {
        const images = Array.from(popup.document.images || []);
        if (!images.length) {
            return Promise.resolve();
        }
        return Promise.allSettled(images.map((image) => {
            if (image.complete) {
                return Promise.resolve();
            }
            return new Promise((resolve) => {
                image.onload = resolve;
                image.onerror = resolve;
            });
        }));
    };
    const printWhenReady = () => {
        if (printed) {
            return;
        }
        printed = true;
        waitForImages().finally(() => {
            popup.setTimeout(() => {
                popup.focus();
                popup.print();
            }, 250);
        });
    };

    popup.addEventListener("load", printWhenReady, { once: true });
    popup.setTimeout(printWhenReady, 1200);
}

function buildPrintDocument(markup, title) {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <base href="${e(appBaseUrl())}">
            <title>${e(title)}</title>
            <style>${buildPrintStyles()}</style>
        </head>
        <body>${markup}</body>
        </html>
    `;
}

function buildPrintStyles() {
    return `
        @page { size: A4; margin: 9mm; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #ffffff;
            color: #183829;
            font-family: Aptos, "Segoe UI", Arial, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        h1, h2, h3, p { margin: 0; }
        .receipt-sheet {
            width: min(100%, 1060px);
            min-height: 100vh;
            margin: 0 auto;
            padding: 26px 28px 22px;
            background: linear-gradient(180deg, #ffffff 0%, #ffffff 72%, #fbf9f0 100%);
            border: 1px solid #d8e8c7;
        }
        .receipt-header {
            display: grid;
            grid-template-columns: 44% 56%;
            gap: 22px;
            align-items: center;
            margin-bottom: 22px;
        }
        .receipt-logo { width: min(100%, 510px); height: 178px; object-fit: contain; object-position: left center; display: block; }
        .receipt-heading-block { text-align: center; position: relative; padding-top: 8px; }
        .receipt-heading-block h1 { font-size: 52px; line-height: 1; color: #2d6d29; font-weight: 800; }
        .receipt-rule { width: 58px; height: 4px; background: #f37a13; border-radius: 99px; display: inline-block; margin: 17px auto 14px; }
        .receipt-client-line { display: inline-flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; color: #1f2f29; font-size: 15px; }
        .receipt-client-icon { width: 42px; height: 42px; border-radius: 50%; background: #edf6df; position: relative; display: inline-block; }
        .receipt-client-icon::before { content: ""; position: absolute; width: 13px; height: 13px; border-radius: 50%; background: #70a83a; top: 9px; left: 14px; }
        .receipt-client-icon::after { content: ""; position: absolute; width: 22px; height: 11px; border-radius: 13px 13px 5px 5px; background: #70a83a; left: 10px; bottom: 9px; }
        .receipt-divider { color: #74a547; margin: 0 2px; }
        .receipt-date { margin-top: 8px; color: #65766c; font-size: 13px; }
        .receipt-decoration { position: absolute; right: 0; top: 0; width: 88px; height: 88px; opacity: 0.9; }
        .receipt-decoration::before, .receipt-decoration::after { content: ""; position: absolute; border-radius: 50% 0 50% 50%; background: #9bcc62; transform: rotate(-35deg); }
        .receipt-decoration::before { width: 38px; height: 22px; right: 10px; top: 7px; }
        .receipt-decoration::after { width: 58px; height: 31px; right: 34px; top: 34px; background: #76ad37; }
        .receipt-delivery-card, .receipt-summary-panel, .receipt-products-panel, .receipt-notes {
            border: 1.5px solid #a8d47d;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.88);
            box-shadow: 0 8px 22px rgba(16, 83, 39, 0.05);
        }
        .receipt-delivery-card { display: flex; align-items: center; gap: 24px; padding: 22px 28px; margin-bottom: 16px; }
        .receipt-delivery-card h2 { font-size: 25px; color: #2d6d29; }
        .receipt-delivery-card p { font-size: 22px; color: #1f2f29; margin-top: 5px; }
        .receipt-round-icon { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #8cc63f, #3a8f2e); display: inline-block; position: relative; flex: 0 0 auto; }
        .receipt-round-icon::before { content: ""; position: absolute; inset: 16px 12px 18px; border: 3px solid #fff; border-radius: 3px; }
        .receipt-round-icon::after { content: ""; position: absolute; width: 14px; height: 14px; border: 3px solid #fff; border-radius: 50%; right: 9px; bottom: 10px; }
        .receipt-summary-panel { padding: 20px 22px; margin-bottom: 16px; }
        .receipt-summary-panel > h2 { text-align: center; color: #2d6d29; font-size: 32px; margin-bottom: 14px; }
        .receipt-summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .receipt-summary-card { min-height: 116px; border: 1px solid #c9e3ae; border-radius: 18px; display: grid; grid-template-columns: 46px 1fr; grid-template-rows: auto auto; align-items: center; column-gap: 10px; padding: 14px; background: #fffefb; }
        .receipt-summary-card strong { font-size: 30px; line-height: 1; color: #2b5f2a; white-space: nowrap; }
        .receipt-summary-card p { grid-column: 2; color: #1f2f29; font-size: 15px; line-height: 1.18; margin-top: 6px; }
        .receipt-summary-card--accent strong { color: #f26a0f; }
        .receipt-card-icon { grid-row: 1 / span 2; width: 42px; height: 42px; border-radius: 50%; background: #edf6df; display: inline-block; position: relative; }
        .receipt-card-icon::before { content: ""; position: absolute; inset: 12px; border: 3px solid #6cab38; border-radius: 3px; }
        .receipt-card-icon--truck { background: #fff1dc; }
        .receipt-card-icon--truck::before { border-color: #f26a0f; }
        .receipt-card-icon--total::before { content: "$"; border: 0; color: #6cab38; font-weight: 800; font-size: 23px; inset: 10px 0 0; text-align: center; }
        .receipt-notes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; padding: 16px 20px; margin-bottom: 16px; }
        .receipt-notes strong { color: #17412d; font-size: 18px; }
        .receipt-notes p { color: #42574b; font-size: 15px; margin-top: 6px; }
        .receipt-products-panel { padding: 20px 22px 14px; }
        .receipt-products-panel h2 { color: #2d6d29; font-size: 29px; display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .receipt-leaf-badge { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #87c946, #3a8f2e); display: inline-block; position: relative; }
        .receipt-leaf-badge::before, .receipt-row-leaf { content: ""; display: inline-block; width: 12px; height: 8px; border-radius: 50% 0 50% 50%; background: #8abf45; transform: rotate(-35deg); }
        .receipt-leaf-badge::before { position: absolute; left: 16px; top: 17px; background: #fff; }
        table { width: 100%; border-collapse: separate; border-spacing: 0; overflow: hidden; border-radius: 14px; border: 1px solid #cfe2bd; }
        th { background: linear-gradient(180deg, #3b832f, #276b28); color: #fff; font-size: 16px; padding: 11px 12px; text-align: center; }
        th:first-child { text-align: left; }
        td { border-top: 1px solid #dcebcf; border-right: 1px solid #dcebcf; padding: 8px 12px; font-size: 16px; color: #1f2f29; text-align: center; }
        td:first-child { text-align: left; }
        td:last-child, th:last-child { border-right: 0; }
        .receipt-row-leaf { margin-right: 10px; vertical-align: middle; }
        .receipt-footer { display: flex; align-items: center; justify-content: center; width: min(72%, 640px); margin: 34px auto 0; border-radius: 20px; border: 1px solid #efe1bf; background: linear-gradient(90deg, #fffaf0, #f8f4e9); padding: 18px 24px; }
        .receipt-footer p { width: 100%; font-size: 20px; text-align: center; color: #1f2f29; }
        .receipt-footer strong { color: #2d6d29; }
        .receipt-heart { width: 42px; height: 32px; position: relative; display: inline-block; justify-self: center; }
        .receipt-heart::before, .receipt-heart::after { content: ""; position: absolute; width: 22px; height: 34px; border: 3px solid #2d6d29; border-bottom: 0; border-radius: 22px 22px 0 0; transform: rotate(-45deg); transform-origin: 0 100%; }
        .receipt-heart::after { left: 20px; transform: rotate(45deg); transform-origin: 100% 100%; }
        .print-sheet { width: min(100%, 960px); margin: 0 auto; padding: 26px; }
        .print-sheet h1 { margin-bottom: 8px; }
        .print-sheet p { margin: 4px 0; }
        .print-sheet table { margin-top: 16px; }
        .print-sheet th, .print-sheet td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #d9e2db; }
        .print-sheet__summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
        .print-sheet__card { border: 1px solid #d9e2db; border-radius: 16px; padding: 12px; background: #fafcf9; }
        @media print {
            body { background: #fff; }
            .receipt-sheet { border: 0; min-height: auto; box-shadow: none; padding: 0; }
        }
        @media (max-width: 760px) {
            .receipt-sheet { padding: 18px 14px; }
            .receipt-header, .receipt-summary-grid, .receipt-notes { grid-template-columns: 1fr; }
            .receipt-logo { height: 130px; object-position: center; }
            .receipt-heading-block h1 { font-size: 38px; }
            .receipt-summary-card strong { font-size: 34px; }
            .receipt-footer { width: 100%; }
        }
    `;
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

function currentDateStamp() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
}

function currentMonthValue() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function shiftMonthValue(month, offset) {
    const [year, monthNumber] = String(validMonth(month) || currentMonthValue()).split("-").map(Number);
    const shifted = new Date(year, monthNumber - 1 + Number(offset || 0), 1);
    return `${shifted.getFullYear()}-${String(shifted.getMonth() + 1).padStart(2, "0")}`;
}

function validMonth(value) {
    const text = String(value || "");
    return /^\d{4}-\d{2}$/.test(text) ? text : "";
}

function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function isAdminAccessEmail(value) {
    return ADMIN_ACCESS_EMAILS.has(normalizeEmail(value));
}

function canShowAdminAccess() {
    const email = normalizeEmail(state.session?.user?.email || state.profiles.admin?.email || state.profile?.email);
    return ADMIN_ACCESS_EMAILS.has(email);
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


function unitChoicesForProduct(product) {
    const presentation = normalizePhotoText(product?.presentation || "");
    const hasKg = /(^|\s)(kg|kgs|kilo|kilos|kilogramo|kilogramos)(\s|$)/.test(presentation);
    const hasGram = /(^|\s)\d+(?:[,.]\d+)?\s*g(?:r|rs|ramos)?(\s|$)|gramo|gramos/.test(presentation);
    const hasUnit = /unidad|unidades|malla|mata|bolsa|bandeja|docena|paquete|atado|ramo|caja|frasco|sachet|pack|pieza/.test(presentation);

    if (hasKg && !hasGram && !hasUnit) {
        return [["kg", "Kg"]];
    }
    if (hasGram || hasUnit) {
        return [["unidad", "Unidad"]];
    }
    if (hasKg) {
        return [["kg", "Kg"]];
    }
    return [["kg", "Kg"]];
}

function normalizeUnitForProduct(value, product) {
    const normalized = normalizeUnit(value);
    const choices = unitChoicesForProduct(product).map(([choice]) => choice);
    return choices.includes(normalized) ? normalized : choices[0] || "kg";
}

function normalizeUnit(value) {
    return value === "unidad" ? "unidad" : "kg";
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


function formatDateOnly(value) {
    if (!value) {
        return "-";
    }
    return new Date(value).toLocaleDateString("es-CL", { dateStyle: "medium" });
}

function formatDateNumeric(value) {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) {
        return "-";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${date.getFullYear()}`;
}

function monthDisplayLabel(month) {
    const [year, monthNumber] = String(month || "").split("-").map(Number);
    if (!year || !monthNumber) {
        return String(month || "");
    }
    return new Date(year, monthNumber - 1, 1).toLocaleDateString("es-CL", {
        month: "long",
        year: "numeric",
    });
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
        must_reset_password: Boolean(row.must_reset_password),
        password_reset_at: row.password_reset_at || null,
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
        image_url: sanitizeText(row.image_url, 1000),
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
        product_id: row.product_id === null || row.product_id === undefined ? null : Number(row.product_id),
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
    return "id,name,email,phone,address,billing_type,auth_user_id,must_reset_password,password_reset_at,created_at,updated_at,last_login_at";
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

function appBaseUrl() {
    try {
        return new URL(".", currentAppUrl()).href;
    } catch (error) {
        return "./";
    }
}

function assetUrl(path) {
    try {
        return new URL(path, appBaseUrl()).href;
    } catch (error) {
        return path;
    }
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

function isMissingProductImageColumn(error) {
    const raw = typeof error === "string" ? error : error?.message || "";
    return /column .*image_url.*does not exist|Could not find .*image_url.*products|schema cache.*image_url/i.test(raw);
}

function withSupabaseTimeout(promise, message, timeoutMs = SUPABASE_TIMEOUT_MS) {
    let timeoutId = 0;
    const timeout = new Promise((_, reject) => {
        timeoutId = window.setTimeout(() => reject(new Error(message)), timeoutMs);
    });
    return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
}

async function runQuery(query, message = 'Supabase no respondió. Revisa la conexión e intenta nuevamente.') {
    const { data, error } = await withSupabaseTimeout(query, message);
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
    if (/product_id.*not null|order_items_admin_insert_manual|violates row-level security.*order_items|permission denied.*order_items/i.test(raw)) {
        return "Falta ejecutar supabase/sql/021_admin_extra_order_items.sql en Supabase para agregar productos post pedido desde el ajuste real.";
    }

    if (/clients/i.test(raw) && /must_reset_password|password_reset_at/i.test(raw)) {
        return "Falta ejecutar supabase/sql/020_client_password_reset_flow.sql en Supabase para activar el reseteo de claves de clientas.";
    }
    if (/admin-create-client-order|admin-reset-client-password|FunctionsHttpError|Edge Function|non-2xx|function.*not found/i.test(raw)) {
        return "Falta desplegar la Edge Function administradora en Supabase, o la función respondió con error.";
    }
    if (/must_reset_password|password_reset_at/i.test(raw)) {
        return "Falta ejecutar supabase/sql/011_admin_first_login_setup.sql en Supabase para activar el primer ingreso administrador.";
    }
    if (/relation .*admins.* does not exist|public\.admins/i.test(raw)) {
        return "No encontré la tabla admins en Supabase. Revisa que hayas ejecutado el esquema inicial en el SQL Editor.";
    }
    if (/column .*billing_type.*does not exist/i.test(raw)) {
        return "Falta ejecutar supabase/sql/013_client_registration_repair.sql en Supabase para completar el registro de clientas.";
    }
    if (/column .*image_url.*does not exist|function .*replace_pending_order/i.test(raw)) {
        return "Falta ejecutar supabase/sql/015_product_images_and_order_edit.sql en Supabase para editar imágenes y actualizar solicitudes pendientes.";
    }
    if (/column .*display_name.*does not exist|column .*presentation.*does not exist|products_category_check|invalid input value .*products/i.test(raw)) {
        return "Falta ejecutar supabase/sql/014_product_classification_presentation.sql y supabase/sql/018_add_seafood_category.sql en Supabase para activar las categorias disponibles.";
    }
    if (/product-images|storage|bucket|object/i.test(raw) && /permisos RLS|row-level security|permission denied|not found|unauthorized|forbidden|403|401|upload/i.test(raw)) {
        return "No pude subir la imagen al bucket product-images. Ejecuta supabase/sql/019_product_image_upload_policy.sql y confirma que el bucket exista.";
    }
    if (/column .*client_note.*does not exist|column .*other_request.*does not exist|column .*requested_unit.*does not exist|function .*create_secure_order/i.test(raw)) {
        return "Falta ejecutar supabase/sql/012_catalog_units_other_request.sql en Supabase. Abre el archivo, copia todo su contenido y pegalo en el SQL Editor; no pegues solo el nombre del archivo.";
    }
    if (/database error saving new user|error saving user|violates row-level security.*clients|new row violates row-level security/i.test(raw)) {
        return "Supabase no pudo guardar la clienta por permisos RLS. Ejecuta supabase/sql/013_client_registration_repair.sql y, para altas manuales desde administración, supabase/sql/017_admin_manual_clients.sql.";
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
    downloadBlob(filename, new Blob([contents], { type: mimeType }));
}

function downloadBlob(filename, blob) {
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
