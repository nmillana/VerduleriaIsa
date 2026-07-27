const CATEGORY_CHOICES = [
    ["frutas", "Frutas"],
    ["verduras", "Verduras"],
    ["hierbas y complementos", "Hierbas y Complementos"],
    ["legumbres y otros", "Legumbres y otros"],
];

const CATEGORY_LABELS = Object.fromEntries(CATEGORY_CHOICES);
const STATUS_LABELS = {
    pendiente: "Pendiente",
    comprado: "Comprado",
    pagado: "Pagado",
};
const DELIVERY_FEE = 5000;
const APP_NAME = "Verduleria Isa";

const state = {
    client: null,
    session: null,
    role: null,
    profile: null,
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
        const { data, error } = await state.client.auth.getSession();
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
}

async function handleAuthChange(event) {
    try {
        await syncIdentity(event);
    } catch (error) {
        console.error(error);
        state.flash = { tone: "error", message: friendlyError(error) };
    }

    if (event === "SIGNED_OUT") {
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
    if (route.path === "/cliente/pedido/nuevo") {
        refreshOrderSummary();
        filterOrderRows();
    }
}

async function resolveRoute(route) {
    const month = validMonth(route.query.get("month")) || currentMonthValue();

    if (route.path === "/") {
        if (state.role === "admin") {
            return redirectView("/admin/dashboard", "", "notice", "Abriendo panel administrador...");
        }
        if (state.role === "client") {
            return redirectView("/cliente/dashboard", "", "notice", "Abriendo tu panel...");
        }
        return { title: "Acceso", content: renderHomePage() };
    }

    if (route.path === "/registro") {
        if (state.role === "client") {
            return redirectView("/cliente/dashboard", "", "notice", "Abriendo tu panel...");
        }
        return { title: "Registro", content: renderClientRegisterPage() };
    }

    if (route.path === "/login-cliente") {
        if (state.role === "client") {
            return redirectView("/cliente/dashboard", "", "notice", "Abriendo tu panel...");
        }
        return { title: "Ingreso clienta", content: renderClientLoginPage() };
    }

    if (route.path === "/admin/login") {
        if (state.role === "admin") {
            return redirectView("/admin/dashboard", "", "notice", "Abriendo panel administrador...");
        }
        return { title: "Ingreso administrador", content: renderAdminLoginPage() };
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
            title: "Tu panel",
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

    if (route.path === "/cliente/pedido/nuevo") {
        const redirect = requireRole("client", "/login-cliente", "Debes ingresar como clienta.");
        if (redirect) {
            return redirect;
        }
        const products = await fetchProducts();
        const sourceId = Number(route.query.get("source") || 0);
        const sourceOrder = sourceId ? await fetchOrderById(sourceId, { clientId: state.profile.id }) : null;
        const draft = sourceOrder
            ? { quantities: buildRepeatQuantities(sourceOrder), client_note: sourceOrder.client_note || "" }
            : readOrderDraft();
        return {
            title: "Nuevo pedido",
            content: renderClientOrderFormPage(products, draft.quantities, sourceOrder, draft.client_note),
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

async function syncIdentity(event = "") {
    if (!state.session?.user) {
        state.role = null;
        state.profile = null;
        return;
    }

    const user = state.session.user;
    const admin = await linkAndFetchAdmin(user);
    if (admin) {
        state.role = "admin";
        state.profile = admin;
        return;
    }

    const client = await linkAndFetchClient(user);
    if (client) {
        state.role = "client";
        state.profile = client;
        if (event === "SIGNED_IN") {
            await touchClientLogin(client.id);
        }
        return;
    }

    state.role = null;
    state.profile = null;
}

async function linkAndFetchAdmin(user) {
    const email = normalizeEmail(user.email);
    const fields = "id,name,email,auth_user_id";

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
    const fields = "id,name,email,phone,address,billing_type,auth_user_id,created_at,updated_at,last_login_at";

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
        .select("id,name,category,estimated_price,is_active,created_at,updated_at")
        .order("name");

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
        .select("id,client_id,source_order_id,status,admin_note,client_note,estimated_total,actual_total,created_at,updated_at,purchased_at")
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
        .select("id,client_id,source_order_id,status,admin_note,client_note,estimated_total,actual_total,created_at,updated_at,purchased_at")
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
            .select("id,order_id,product_id,product_name,quantity,estimated_price,estimated_total,actual_price,actual_total,item_note,was_missing")
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

async function createOrder(quantities, sourceOrderId, clientNote) {
    const items = buildSecureOrderItems(quantities);
    if (!items.length) {
        throw new Error("No hay productos seleccionados.");
    }

    const { data, error } = await state.client.rpc("create_secure_order", {
        p_items: items,
        p_source_order_id: sourceOrderId || null,
        p_client_note: sanitizeText(clientNote, MAX_CLIENT_NOTE_LENGTH) || null,
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

    const fields = "id,name,email,phone,address,billing_type,auth_user_id,created_at,updated_at,last_login_at";
    const updatedRows = await runQuery(
        state.client
            .from("clients")
            .update(payload)
            .eq("id", state.profile.id)
            .select(fields)
    );

    state.profile = normalizeClient(updatedRows[0] || { ...state.profile, ...payload });
}

async function saveProduct(values) {
    const payload = {
        name: sanitizeText(values.name, 120),
        category: CATEGORY_LABELS[values.category] ? values.category : "verduras",
        estimated_price: Math.max(0, Math.round(Number(values.estimated_price) || 0)),
        is_active: values.is_active === true,
    };

    if (!payload.name) {
        throw new Error("El nombre del producto es obligatorio.");
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
        state.flash = { tone: "error", message: friendlyError(error) };
        await renderCurrentRoute();
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
            default:
                break;
        }
    } catch (error) {
        state.flash = { tone: "error", message: friendlyError(error) };
        await renderCurrentRoute();
    }
}

function handleInput(event) {
    if (event.target.matches("[data-quantity-input]")) {
        refreshOrderSummary();
        const form = event.target.closest("[data-order-form]");
        if (form) {
            persistOrderDraft(form);
        }
    }
    if (event.target.matches("[data-client-note]")) {
        const form = event.target.closest("[data-order-form]");
        if (form) {
            persistOrderDraft(form);
        }
    }
    if (event.target.matches("[data-product-search]")) {
        filterOrderRows();
    }
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

    const { data, error } = await state.client.auth.signUp({
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
    });

    if (error) {
        throw error;
    }

    if (data.session) {
        state.session = data.session;
        await syncIdentity("SIGNED_IN");
        state.flash = { tone: "notice", message: "Registro completado. Ya puedes hacer tu pedido." };
        navigate("/cliente/dashboard", true);
        return;
    }

    state.flash = {
        tone: "notice",
        message: "Revisa tu correo para confirmar la cuenta y luego ingresa.",
    };
    navigate("/login-cliente", true);
}

async function submitClientLogin(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    const { data, error } = await state.client.auth.signInWithPassword({ email, password });
    if (error) {
        throw error;
    }

    state.session = data.session;
    await syncIdentity("SIGNED_IN");
    if (state.role !== "client") {
        await state.client.auth.signOut();
        throw new Error(buildRoleLinkError("client", email));
    }

    state.flash = { tone: "notice", message: "Bienvenida de vuelta." };
    navigate("/cliente/dashboard", true);
}

async function submitAdminLogin(form) {
    const formData = new FormData(form);
    const email = normalizeEmail(formData.get("email"));
    const password = String(formData.get("password") || "");

    const { data, error } = await state.client.auth.signInWithPassword({ email, password });
    if (error) {
        throw error;
    }

    state.session = data.session;
    await syncIdentity("SIGNED_IN");
    if (state.role !== "admin") {
        await state.client.auth.signOut();
        throw new Error(buildRoleLinkError("admin", email));
    }

    state.flash = { tone: "notice", message: "Ingreso administrador correcto." };
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
    const quantities = collectOrderQuantities(form);
    const sourceOrderId = Number(form.querySelector('input[name="source_order_id"]')?.value || 0);
    const clientNote = sanitizeText(new FormData(form).get("client_note"), MAX_CLIENT_NOTE_LENGTH);
    const orderId = await createOrder(quantities, sourceOrderId || null, clientNote);
    clearOrderDraft();
    state.flash = { tone: "notice", message: "Pedido guardado. El total fue calculado en Supabase." };
    navigate(`/cliente/pedido/${orderId}`, true);
}

async function submitProductSave(form) {
    const formData = new FormData(form);
    await saveProduct({
        id: Number(formData.get("product_id") || 0) || null,
        name: formData.get("name"),
        category: formData.get("category"),
        estimated_price: formData.get("estimated_price"),
        is_active: formData.get("is_active") === "1",
    });
    state.flash = { tone: "notice", message: "Producto guardado." };
    await renderCurrentRoute();
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
    const lines = [["semana", "producto", "cantidad", "precio_unitario", "total"]];

    for (const week of consolidation) {
        for (const product of week.products) {
            lines.push([
                week.label,
                product.product_name,
                formatQty(product.cantidad),
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

    const lines = [
        `Hola ${order.client_name || ""},`,
        `te comparto el resumen del pedido #${order.id}.`,
        "",
        ...order.items.map((item) => `- ${item.product_name} x ${formatQty(item.quantity)}`),
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

    appRoot.innerHTML = `
        <div class="page-shell">
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
            `<button type="button" data-action="logout">Salir</button>`,
        ].join("");
    }

    if (state.role === "admin") {
        return [
            `<a href="#/admin/dashboard">Panel</a>`,
            `<a href="#/admin/pedidos">Pedidos</a>`,
            `<a href="#/admin/consolidado">Consolidado</a>`,
            `<a href="#/admin/productos">Productos</a>`,
            `<a href="#/admin/clientes">Clientas</a>`,
            `<button type="button" data-action="logout">Salir</button>`,
        ].join("");
    }

    return [
        `<a href="#/login-cliente">Ingreso clienta</a>`,
        `<a href="#/registro">Registro</a>`,
        `<a href="#/admin/login">Administrador</a>`,
    ].join("");
}

function renderFlash(flash) {
    const boxClass = flash.tone === "error" ? "error-box" : "notice-banner";
    return `<div class="${boxClass}"><p>${e(flash.message)}</p></div>`;
}

function renderHomePage() {
    return `
        <section class="access-landing">
            <div class="access-card">
                <div class="access-card__logo-wrap">
                    <img class="access-card__logo" src="./static/logo-verduleria-isa.png" alt="${e(APP_NAME)}">
                </div>
                <p class="eyebrow">GitHub Pages</p>
                <h1>Haz tu pedido semanal.</h1>
                <p class="lead">Esta versión ya corre como sitio estático. Las clientas entran con correo y contraseña usando Supabase Auth.</p>
                <form class="stacked-form access-form" data-form="client-login">
                    <label>Correo
                        <input type="email" name="email" placeholder="clienta@correo.cl" required>
                    </label>
                    <label>Contraseña
                        <input type="password" name="password" placeholder="Tu contraseña" required>
                    </label>
                    <button class="button primary full-width" type="submit">Ingresar</button>
                </form>
                <a class="button ghost full-width" href="#/registro">Crear mi usuario</a>
                <a class="button ghost full-width admin-access" href="#/admin/login">Administrador</a>
            </div>
        </section>
    `;
}

function renderClientRegisterPage() {
    return `
        <section class="form-panel narrow">
            <h1>Registro de clienta</h1>
            <p class="muted">Esta versión usa correo y contraseña para que GitHub Pages no dependa de un backend privado.</p>
            <form class="stacked-form" data-form="client-register">
                <div class="split-grid">
                    <label>Nombre
                        <input type="text" name="name" required>
                    </label>
                    <label>Correo
                        <input type="email" name="email" required>
                    </label>
                    <label>Contraseña
                        <input type="password" name="password" minlength="8" required>
                    </label>
                    <label>Confirmar contraseña
                        <input type="password" name="confirm_password" minlength="8" required>
                    </label>
                    <label>Teléfono
                        <input type="text" name="phone" required>
                    </label>
                    <label>Tipo de pago
                        <select name="billing_type">
                            <option value="semanal">Semanal</option>
                            <option value="mensual">Mensual</option>
                        </select>
                    </label>
                </div>
                <label>Dirección
                    <textarea name="address" rows="3" required></textarea>
                </label>
                <p class="field-note">Si en tu proyecto Supabase está activa la confirmación por correo, primero te llegará un email para validar la cuenta.</p>
                <button class="button primary" type="submit">Guardar registro</button>
            </form>
        </section>
    `;
}

function renderClientLoginPage() {
    return `
        <section class="form-panel narrow">
            <h1>Ingreso de clienta</h1>
            <p class="muted">Ingresa con tu cuenta autenticada en Supabase.</p>
            <form class="stacked-form" data-form="client-login">
                <label>Correo
                    <input type="email" name="email" required>
                </label>
                <label>Contraseña
                    <input type="password" name="password" required>
                </label>
                <p class="field-note">Si ya existías con este correo, la app intentará volver a enlazarte automáticamente.</p>
                <button class="button primary" type="submit">Entrar</button>
            </form>
            <p class="muted">¿Aún no estás registrada? <a href="#/registro">Crear registro</a></p>
        </section>
    `;
}

function renderAdminLoginPage() {
    return `
        <section class="form-panel narrow">
            <h1>Ingreso administrador</h1>
            <p class="muted">Usa el mismo correo que ya figura en la tabla <code>admins</code>. Si antes quedó ligado a otro usuario de Auth, la app intentará re-enlazarlo.</p>
            <form class="stacked-form" data-form="admin-login">
                <label>Correo
                    <input type="email" name="email" required>
                </label>
                <label>Contraseña
                    <input type="password" name="password" required>
                </label>
                <button class="button primary" type="submit">Ingresar</button>
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
        <section class="section-head">
            <div>
                <p class="eyebrow">Panel clienta</p>
                <h1>${e(client.name)}</h1>
                <p class="muted">Correo: ${e(client.email)} | Dirección: ${e(client.address)}</p>
            </div>
            <div class="hero-actions">
                <form class="month-filter" data-form="client-dashboard-filter">
                    <input type="month" name="month" value="${e(month)}">
                    <button class="button ghost" type="submit">Ver mes</button>
                </form>
                <button class="button ghost" type="button" data-action="print-month" data-month="${e(month)}">Imprimir resumen</button>
                <a class="button primary" href="#/cliente/pedido/nuevo">Hacer pedido</a>
            </div>
        </section>

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
                ${order.items.map((item) => `<li>${e(item.product_name)} x ${e(formatQty(item.quantity))}</li>`).join("")}
            </ul>
            <p class="order-total">Total: ${formatCurrency(order.display_total)}</p>
        </article>
    `;
}

function renderClientOrderFormPage(products, quantities, sourceOrder, clientNote = "") {
    const groupedProducts = groupProducts(products);
    const hasProducts = products.length > 0;
    const groupsMarkup = CATEGORY_CHOICES
        .map(([category, label]) => {
            const items = groupedProducts.get(category) || [];
            if (!items.length) {
                return "";
            }
            return `
                <div class="panel product-group">
                    <h2>${e(label)}</h2>
                    <div class="product-table">
                        ${items.map((product) => `
                            <label class="product-row" data-product-name="${e(product.name.toLowerCase())}">
                                <div>
                                    <strong>${e(product.name)}</strong>
                                    <span class="muted">${formatCurrency(product.estimated_price)}</span>
                                </div>
                                <input
                                    type="number"
                                    step="0.25"
                                    min="0"
                                    max="${MAX_QUANTITY}"
                                    inputmode="decimal"
                                    name="qty_${product.id}"
                                    value="${quantities[product.id] ? e(formatQty(quantities[product.id]).replace(",", ".")) : ""}"
                                    data-price="${product.estimated_price}"
                                    data-quantity-input
                                >
                            </label>
                        `).join("")}
                    </div>
                </div>
            `;
        })
        .join("");

    if (!hasProducts) {
        return `
            <section class="section-head">
                <div>
                    <p class="eyebrow">Pedido semanal</p>
                    <h1>Arma tu pedido</h1>
                </div>
            </section>
            <section class="empty-state">
                <p class="eyebrow">Catálogo</p>
                <h2>Sin productos activos</h2>
                <p class="muted">Cuando la administradora active productos, aparecerán aquí.</p>
            </section>
        `;
    }

    return `
        <section class="section-head">
            <div>
                <p class="eyebrow">Pedido semanal</p>
                <h1>Arma tu pedido</h1>
                <p class="muted">El total considera un despacho fijo de ${formatCurrency(DELIVERY_FEE)}.</p>
            </div>
            ${sourceOrder ? `<div class="badge-block">Basado en el pedido #${sourceOrder.id} del ${e(formatDateTime(sourceOrder.created_at))}</div>` : ""}
        </section>

        <form class="order-layout" data-form="client-order-create" data-order-form data-delivery-fee="${DELIVERY_FEE}">
            <input type="hidden" name="source_order_id" value="${sourceOrder ? sourceOrder.id : ""}">
            <aside class="panel summary-panel">
                <h2>Resumen</h2>
                <label>Buscar producto
                    <input type="search" data-product-search placeholder="Ej. tomate, palta, huevo">
                </label>
                <div class="summary-stats">
                    <div>
                        <span class="muted">Productos elegidos</span>
                        <strong data-selected-count>0</strong>
                    </div>
                    <div>
                        <span class="muted">Subtotal productos</span>
                        <strong data-subtotal-estimated>${formatCurrency(0)}</strong>
                    </div>
                    <div>
                        <span class="muted">Despacho fijo</span>
                        <strong>${formatCurrency(DELIVERY_FEE)}</strong>
                    </div>
                    <div>
                        <span class="muted">Total estimado</span>
                        <strong data-estimated-total>${formatCurrency(DELIVERY_FEE)}</strong>
                    </div>
                </div>
                <label>Observaciones
                    <textarea name="client_note" rows="3" maxlength="${MAX_CLIENT_NOTE_LENGTH}" data-client-note>${e(clientNote || "")}</textarea>
                </label>
                <p class="field-note" data-draft-status>Carrito guardado en este dispositivo.</p>
                <button class="button primary full-width" type="submit">Enviar pedido</button>
            </aside>
            <section class="product-columns">
                <p class="empty-search" data-product-search-empty hidden>No hay productos con esa búsqueda.</p>
                ${groupsMarkup}
            </section>
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
                    ${order.items.map((item) => `
                        <tr>
                            <td>${e(item.product_name)}</td>
                            <td>${e(formatQty(item.quantity))}</td>
                            <td>${formatCurrency(item.estimated_total)}</td>
                            <td>${item.actual_total === null ? "-" : formatCurrency(item.actual_total)}</td>
                            <td>${e(item.item_note || "-")}</td>
                        </tr>
                    `).join("")}
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
                <td>${e(formatQty(item.total_quantity))}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="3">Todavía no hay pedidos este mes.</td></tr>`;

    const lowRows = dashboard.low_products.length
        ? dashboard.low_products.map((item) => `
            <tr>
                <td>${e(item.product_name)}</td>
                <td>${item.request_count}</td>
                <td>${e(formatQty(item.total_quantity))}</td>
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
                    ${order.items.map((item) => `
                        <tr data-item-row data-item-id="${item.id}" data-quantity="${item.quantity}">
                            <td>${e(item.product_name)}</td>
                            <td>${e(formatQty(item.quantity))}</td>
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
                    `).join("")}
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
                <label>Nombre
                    <input type="text" name="name" required>
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
                    <form class="table-form-row" data-form="admin-product-update">
                        <input type="hidden" name="product_id" value="${product.id}">
                        <input type="text" name="name" value="${e(product.name)}" required>
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
                                        <td>${e(formatQty(product.cantidad))}</td>
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
                <p>2. Ejecuta <code>supabase/sql/009_github_pages_auth.sql</code> y luego <code>supabase/sql/010_secure_order_creation.sql</code> en el SQL Editor.</p>
                <p>3. Crea el usuario administrador en Supabase Auth con el mismo correo que ya tienes en <code>admins</code>.</p>
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
                <p>Archivos clave: <code>supabase/sql/009_github_pages_auth.sql</code> y <code>supabase/sql/010_secure_order_creation.sql</code></p>
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
    const totalNode = form.querySelector("[data-estimated-total]");
    const subtotalNode = form.querySelector("[data-subtotal-estimated]");
    const countNode = form.querySelector("[data-selected-count]");
    const deliveryFee = Number(form.dataset.deliveryFee || DELIVERY_FEE);

    let subtotal = 0;
    let selected = 0;
    for (const input of inputs) {
        const quantity = Number(String(input.value || "").replace(",", "."));
        const price = Number(input.dataset.price || 0);
        if (quantity > 0) {
            selected += 1;
            subtotal += quantity * price;
        }
    }

    if (subtotalNode) {
        subtotalNode.textContent = formatCurrency(subtotal);
    }
    if (totalNode) {
        totalNode.textContent = formatCurrency(subtotal + deliveryFee);
    }
    if (countNode) {
        countNode.textContent = String(selected);
    }
}

function filterOrderRows() {
    const search = document.querySelector("[data-product-search]");
    if (!search) {
        return;
    }
    const term = search.value.trim().toLowerCase();
    let visibleRows = 0;
    for (const row of document.querySelectorAll(".product-row")) {
        const name = row.dataset.productName || "";
        const isVisible = !term || name.includes(term);
        row.style.display = isVisible ? "grid" : "none";
        if (isVisible) {
            visibleRows += 1;
        }
    }
    const emptySearch = document.querySelector("[data-product-search-empty]");
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
            const bucket = grouped.get(item.product_name) || {
                product_name: item.product_name,
                request_count: 0,
                total_quantity: 0,
                revenue: 0,
            };
            bucket.request_count += 1;
            bucket.total_quantity += item.quantity;
            bucket.revenue += item.actual_total ?? item.estimated_total;
            grouped.set(item.product_name, bucket);
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
    const topNames = new Set(topProducts.map((row) => row.product_name));
    const lowProducts = [...grouped.values()]
        .filter((row) => !topNames.has(row.product_name))
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
            const current = products.get(item.product_name) || {
                product_name: item.product_name,
                cantidad: 0,
                precio_unitario: item.actual_price ?? item.estimated_price,
                total: 0,
            };
            const unitPrice = item.actual_price ?? item.estimated_price;
            current.cantidad += item.quantity;
            current.precio_unitario = unitPrice;
            current.total += Math.round(unitPrice * item.quantity);
            products.set(item.product_name, current);
        }
    }

    return [...weeks.entries()].map(([label, products]) => ({
        label,
        products: [...products.values()].sort((a, b) => a.product_name.localeCompare(b.product_name, "es")),
        total: [...products.values()].reduce((sum, product) => sum + product.total, 0),
    }));
}

function buildRepeatQuantities(order) {
    const values = {};
    for (const item of order.items || []) {
        values[item.product_id] = item.quantity;
    }
    return values;
}

function readOrderDraft() {
    const emptyDraft = { quantities: {}, client_note: "" };
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
        const draft = {
            quantities: collectOrderQuantities(form, { relaxed: true }),
            client_note: sanitizeText(new FormData(form).get("client_note"), MAX_CLIENT_NOTE_LENGTH),
        };
        if (!Object.keys(draft.quantities).length && !draft.client_note) {
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
    const draft = { quantities: {}, client_note: sanitizeText(raw?.client_note, MAX_CLIENT_NOTE_LENGTH) };
    const quantities = raw?.quantities || {};
    for (const [rawProductId, rawQuantity] of Object.entries(quantities)) {
        const productId = Number(rawProductId);
        const quantity = normalizeQuantity(rawQuantity);
        if (productId && quantity > 0) {
            draft.quantities[productId] = quantity;
        }
    }
    return draft;
}

function collectOrderQuantities(form, options = {}) {
    const quantities = {};
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
        quantities[productId] = quantity;
    }
    return quantities;
}

function buildSecureOrderItems(quantities) {
    return Object.entries(quantities)
        .map(([productId, quantity]) => ({
            product_id: Number(productId),
            quantity: normalizeQuantity(quantity),
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
                    ${order.items.map((item) => `
                        <tr>
                            <td>${e(item.product_name)}</td>
                            <td>${e(formatQty(item.quantity))}</td>
                            <td>${formatCurrency(item.estimated_total)}</td>
                            <td>${item.actual_total === null ? "-" : formatCurrency(item.actual_total)}</td>
                            <td>${e(item.item_note || "-")}</td>
                        </tr>
                    `).join("")}
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
    return a.name.localeCompare(b.name, "es");
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
    return {
        id: Number(row.id),
        name: String(row.name || "").trim(),
        category: CATEGORY_LABELS[row.category] ? row.category : "verduras",
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
        return `Ingresaste en Supabase Auth con ${normalizedEmail}, pero esta app no encontró una administradora asociada en el proyecto ${project}. Revisa la tabla admins y confirma que docs/static/config.js apunte al Supabase correcto.`;
    }

    return `Ingresaste en Supabase Auth con ${normalizedEmail}, pero esta app no encontró una clienta asociada en el proyecto ${project}. Si ya estabas registrada, revisa que uses el mismo correo y que docs/static/config.js apunte al Supabase correcto. Si eres nueva, entra por Crear registro.`;
}

function setFormBusy(form, busy) {
    form.dataset.busy = busy ? "1" : "";
    for (const field of form.querySelectorAll("button, input, select, textarea")) {
        field.disabled = busy;
    }
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
