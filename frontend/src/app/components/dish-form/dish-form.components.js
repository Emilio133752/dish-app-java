document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    // Quantity control
    const quantityBtn = document.querySelector('.quantity-btn');
    let currentQuantity = 1;

    quantityBtn.addEventListener('click', () => {
        const newQuantity = prompt('Digite a quantidade desejada:', currentQuantity);
        if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
            currentQuantity = parseInt(newQuantity);
            document.querySelector('.quantity-label').textContent = 
                `${currentQuantity} (Quantidade)`;
        }
    });

    // Add button functionality
    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
        const observations = document.querySelector('.observations-input').value;
        const orderData = {
            quantity: currentQuantity,
            observations: observations,
            // Add other necessary data
        };
        
        // Send to cart/backend
        console.log('Order data:', orderData);
        // Redirect to cart or show confirmation
        window.location.href = '/cart';
    });
});

// dish-list.component.js
document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', () => {
        window.history.back();
    });

    // Add to cart buttons functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemName = cartItem.querySelector('h3').textContent;
            const itemPrice = cartItem.querySelector('.price').textContent;
            
            // Add to cart logic
            addToCart({
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        });
    });

    function addToCart(item) {
        // Get existing cart items from localStorage or initialize empty array
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add new item
        cartItems.push(item);
        
        // Save updated cart
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update total
        updateCartTotal();
        
        // Optional: Show confirmation message
        alert(`${item.name} adicionado ao carrinho!`);
    }

    function updateCartTotal() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            return sum + (price * item.quantity);
        }, 0);
        
        document.querySelector('.cart-total p').textContent = 
            `Total: R$ ${total.toFixed(2)}`;
    }
});