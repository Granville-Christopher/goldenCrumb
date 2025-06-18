/**
 * Cart Render Script
 * Handles adding items to cart and updating cart count in navbar
 */

// Utility to get cart from localStorage
function getCart() {
  const cart = localStorage.getItem('bakeryCart');
  return cart ? JSON.parse(cart) : [];
}

// Utility to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('bakeryCart', JSON.stringify(cart));
}

// Add item to cart or update quantity if already exists
function addToCart(item) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('#cart-count');
  cartCountElements.forEach(el => {
    el.textContent = totalCount;
  });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Select all add to cart buttons (desktop and mobile)
  const addToCartBtns = document.querySelectorAll('.order-btn, .order-btn-small');
  addToCartBtns.forEach(addToCartBtn => {
    addToCartBtn.addEventListener('click', () => {
      // Determine which quantity input to use based on button clicked
      let quantityInput;
      if (addToCartBtn.classList.contains('order-btn-small')) {
        quantityInput = document.getElementById('quantity-input-d');
      } else {
        quantityInput = document.getElementById('quantity-input');
      }
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

      // Define the current item details (should be dynamic or fetched from page data)
      const item = {
        id: 'golden-flake-croissant', // Unique identifier for the item
        name: 'Golden Flake Croissant',
        price: 3.50,
        quantity: quantity,
        imageUrl: 'img/pexels-775361647-18954033.jpg'
      };

      addToCart(item);
      alert(`${quantity} ${item.name}(s) added to cart.`);
    });
  });
});
