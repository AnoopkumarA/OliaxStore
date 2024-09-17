// Function to display cart items in the cart.html page
window.onload = function () {
    displayCartItems();
};

// Function to display cart items and handle empty cart
function displayCartItems() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear current cart list
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        cartTotalElement.innerText = '';
        checkoutBtn.disabled = true; // Disable checkout button if cart is empty
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            cartItemsList.innerHTML += `
                <li>
                    ${item.name} - Rs. ${item.price}
                    <button class="delete-btn" onclick="removeFromCart(${index})">Remove</button>
                </li>`;
            total += item.price;
        });

        cartTotalElement.innerText = `Total: Rs. ${total}`;
        checkoutBtn.disabled = false; // Enable checkout button if there are items in the cart
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        // Remove the item from the cart
        cart.splice(index, 1);

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Re-render the cart items
        displayCartItems();
    }
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

// Bind WhatsApp link to the checkout button
document.getElementById('checkout-btn').onclick = function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    buyOnWhatsApp(cart);
};
