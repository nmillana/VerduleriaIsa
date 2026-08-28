(() => {
    const originalCreateOrder = typeof createOrder === "function" ? createOrder : null;
    const originalReplacePendingOrder = typeof replacePendingOrder === "function" ? replacePendingOrder : null;

    if (!originalCreateOrder) {
        return;
    }

    async function keepOnlyActiveSelections(selections) {
        const normalizedSelections = normalizeOrderDraft({ selections }).selections;
        const productIds = Object.keys(normalizedSelections)
            .map(Number)
            .filter((productId) => Number.isInteger(productId) && productId > 0);

        if (!productIds.length || !state.client) {
            return normalizedSelections;
        }

        const { data, error } = await withSupabaseTimeout(
            state.client
                .from("products")
                .select("id")
                .in("id", productIds)
                .eq("is_active", true),
            "Supabase no respondió al validar los productos del carrito."
        );

        if (error) {
            throw error;
        }

        const activeIds = new Set((data || []).map((row) => Number(row.id)));
        const cleanedSelections = Object.fromEntries(
            Object.entries(normalizedSelections)
                .filter(([productId]) => activeIds.has(Number(productId)))
        );

        if (
            Object.keys(cleanedSelections).length !== Object.keys(normalizedSelections).length &&
            typeof readOrderDraft === "function" &&
            typeof writeOrderDraft === "function"
        ) {
            const draft = readOrderDraft();
            draft.selections = cleanedSelections;
            writeOrderDraft(draft);
        }

        return cleanedSelections;
    }

    createOrder = async function patchedCreateOrder(selections, sourceOrderId, clientNote, otherRequest) {
        const activeSelections = await keepOnlyActiveSelections(selections);
        return originalCreateOrder(activeSelections, sourceOrderId, clientNote, otherRequest);
    };

    if (originalReplacePendingOrder) {
        replacePendingOrder = async function patchedReplacePendingOrder(orderId, selections, clientNote, otherRequest) {
            const activeSelections = await keepOnlyActiveSelections(selections);
            return originalReplacePendingOrder(orderId, activeSelections, clientNote, otherRequest);
        };
    }
})();
