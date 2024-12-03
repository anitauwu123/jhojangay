let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
    showToast(`${name} agregado al carrito`);
}

function updateCart() {
    document.getElementById("cart-items").innerHTML = `<i class="fas fa-shopping-cart me-2"></i>Carrito: ${cart.length} artículo${cart.length !== 1 ? 's' : ''}`;
    document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function searchFood() {
    const query = document.getElementById("search").value.toLowerCase();
    const items = document.querySelectorAll(".food-item");
    items.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        const cardContainer = item.closest('.col-md-4, .col-md-3');
        if (name.includes(query)) {
            cardContainer.style.display = "block";
        } else {
            cardContainer.style.display = "none";
        }
    });
}

function showToast(message) {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    
    const toastElement = document.createElement('div');
    toastElement.className = 'toast';
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');
    
    toastElement.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Notificación</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toastElement);
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

function checkout() {
    if (cart.length === 0) {
        showToast('El carrito está vacío');
        return;
    }
    
    let message = "Resumen de tu pedido:\n\n";
    cart.forEach(item => {
        message += `${item.name}: $${item.price.toFixed(2)}\n`;
    });
    message += `\nTotal: $${total.toFixed(2)}`;
    
    alert(message + "\n\n¡Gracias por tu compra!");
    cart = [];
    total = 0;
    updateCart();
}