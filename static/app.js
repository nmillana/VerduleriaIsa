function formatClp(value) {
    return "$" + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function initOrderForm() {
    const form = document.querySelector("[data-order-form]");
    if (!form) return;

    const inputs = Array.from(form.querySelectorAll("[data-quantity-input]"));
    const totalNode = form.querySelector("[data-estimated-total]");
    const subtotalNode = form.querySelector("[data-subtotal-estimated]");
    const countNode = form.querySelector("[data-selected-count]");
    const search = form.querySelector("[data-product-search]");
    const rows = Array.from(form.querySelectorAll(".product-row"));
    const deliveryFee = Number(form.dataset.deliveryFee || 0);

    const updateSummary = () => {
        let subtotal = 0;
        let selected = 0;
        for (const input of inputs) {
            const quantity = Number(input.value || 0);
            const price = Number(input.dataset.price || 0);
            if (quantity > 0) {
                selected += 1;
                subtotal += quantity * price;
            }
        }
        if (subtotalNode) subtotalNode.textContent = formatClp(subtotal);
        if (totalNode) totalNode.textContent = formatClp(subtotal + deliveryFee);
        if (countNode) countNode.textContent = selected.toString();
    };

    const filterRows = () => {
        const term = (search?.value || "").trim().toLowerCase();
        for (const row of rows) {
            const name = row.dataset.productName || "";
            row.style.display = !term || name.includes(term) ? "grid" : "none";
        }
    };

    inputs.forEach((input) => input.addEventListener("input", updateSummary));
    if (search) search.addEventListener("input", filterRows);
    updateSummary();
}

document.addEventListener("DOMContentLoaded", initOrderForm);
