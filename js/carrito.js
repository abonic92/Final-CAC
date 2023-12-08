const products = [
    { id: 1, name: 'Producto 1', price: 10.99, image: 'product1.jpg' },
    { id: 2, name: 'Producto 2', price: 19.99, image: 'product2.jpg' },
    { id: 3, name: 'Producto 3', price: 5.99, image: 'product3.jpg' }
];

const cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <p>Precio: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const comenzarComprandoBtn = document.getElementById('comenzar-comprando-btn');
    const continuarComprandoBtn = document.getElementById('continuar-comprando-btn');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <p>Precio: $${item.price.toFixed(2)}</p>
            <p>Cantidad: ${item.quantity}</p>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    // Mostrar/ocultar botones según el estado del carrito
    if (cart.length === 0) {
        comenzarComprandoBtn.style.display = 'block';
        continuarComprandoBtn.style.display = 'none';
    } else {
        comenzarComprandoBtn.style.display = 'none';
        continuarComprandoBtn.style.display = 'block';
    }
}

function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }

    updateCart();
}

function increaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    cart[itemIndex].quantity += 1;

    updateCart();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    cart.splice(itemIndex, 1);

    updateCart();
}

function checkout() {
    alert('Compra realizada. Gracias por tu compra!');
    cart.length = 0;
    updateCart();
}

window.onload = displayProducts;

const app = Vue.createApp({
    data() {
        return {
            funciones: [], // Asegúrate de tener datos en funciones
            loading: false,
        };
    },
    methods: {
        showFunctionDetails(funcion) {
            // Implementa la lógica para mostrar los detalles de la función
            console.log(`Detalles de la función: ${funcion.titulo}`);
        },
        agregarAlCarrito(funcion) {
            // Implementa la lógica para agregar la función al carrito
            console.log(`Agregado al carrito: ${funcion.titulo}`);
        },
    },
});


app.mount("#app");
