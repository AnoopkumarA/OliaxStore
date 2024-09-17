// Function to add items to the cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({ name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} has been added to your cart!`);
}

// Function to display cart items
function viewCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear current cart list
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `<li>${item.name} - Rs. ${item.price}</li>`;
        });
    }

    // Show cart container
    cartContainer.style.display = 'block';

    // Bind WhatsApp link to the checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.onclick = () => buyOnWhatsApp(cart);
}

// Function to buy the entire cart on WhatsApp
function buyOnWhatsApp(cart) {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Create a message for WhatsApp
    let message = 'I would like to buy the following items:\n\n';

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Rs. ${item.price}\n`;
    });

    // WhatsApp link
    const whatsappLink = `https://wa.me/7025768294?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
}

// Function to buy a specific product via WhatsApp directly
function buyNowOnWhatsApp(productName, productPrice) {
    // Create a WhatsApp message for a single product
    let message = `I would like to buy the following product:\n\n`;
    message += `${productName} - Rs. ${productPrice}`;

    // WhatsApp link
    const whatsappLink = `https://wa.me/7025768294?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappLink, '_blank');
}
