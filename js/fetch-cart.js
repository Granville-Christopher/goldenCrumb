/**
 * Fetch Cart Script
 * Fetches cart items from localStorage and renders them on the cart page
 */

(() => {
  // Use an IIFE to avoid polluting global scope and prevent duplicate declarations
  // UI elements
  const cartItemsContainerFetch = document.getElementById("cart-items-container");
  const emptyCartMessageFetch = document.getElementById("empty-cart-message");
  const cartSubtotalSpanFetch = document.getElementById("cart-subtotal");
  const cartGrandTotalSpanFetch = document.getElementById("cart-grand-total");
  const clearCartButtonFetch = document.getElementById("clear-cart-button");
  const desktopCartCountFetch = document.getElementById("desktop-cart-count");
  const mobileCartCountFetch = document.getElementById("mobile-cart-count");

  let cartFetch = []; // Array to hold cart items

  // Function to load cart from localStorage
  function loadCartFromLocalStorageFetch() {
    const storedCart = localStorage.getItem("bakeryCart");
    cartFetch = storedCart ? JSON.parse(storedCart) : [];
    renderCartFetch();
  }

  // Function to save cart to localStorage
  function saveCartToLocalStorageFetch() {
    localStorage.setItem("bakeryCart", JSON.stringify(cartFetch));
  }

  // Function to render cart items to the DOM
  function renderCartFetch() {
    if (!cartItemsContainerFetch) return; // Exit if container not found

    cartItemsContainerFetch.innerHTML = ""; // Clear previous items
    let subtotal = 0;
    let totalItems = 0;

    if (cartFetch.length === 0) {
      if (emptyCartMessageFetch) emptyCartMessageFetch.classList.remove("hidden");
      if (clearCartButtonFetch) clearCartButtonFetch.classList.add("hidden"); // Hide clear cart if empty
    } else {
      if (emptyCartMessageFetch) emptyCartMessageFetch.classList.add("hidden");
      if (clearCartButtonFetch) clearCartButtonFetch.classList.remove("hidden"); // Show clear cart if not empty

      cartFetch.forEach((item) => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        totalItems += item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className =
          "flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 animate-on-scroll";
        itemElement.setAttribute("data-item-id", item.id); // Use item.id as unique identifier

        itemElement.innerHTML = `
          <div class="flex items-center w-full md:w-2/3">
            <img src="${item.imageUrl}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg mr-4">
            <div class="text-left flex-grow">
              <h3 class="text-xl font-playfair text-dark-brown">${item.name}</h3>
              <p class="text-gray-700 text-base">$${item.price.toFixed(2)} / unit</p>
            </div>
          </div>
          <div class="flex items-center justify-between md:justify-end w-full md:w-1/3 mt-4 md:mt-0">
            <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button class="quantity-btn decrement-cart-item" data-item-id="${item.id}">-</button>
              <input type="number" value="${item.quantity}" min="1" class="quantity-input cart-quantity-input" data-item-id="${item.id}">
              <button class="quantity-btn increment-cart-item" data-item-id="${item.id}">+</button>
            </div>
            <span class="text-dark-brown font-bold text-lg ml-6 md:ml-8">$${itemSubtotal.toFixed(2)}</span>
            <button class="remove-cart-item ml-4 text-red-500 hover:text-red-700 transition-colors" data-item-id="${item.id}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        `;
        cartItemsContainerFetch.appendChild(itemElement);
      });
    }

    // Update totals
    if (cartSubtotalSpanFetch) cartSubtotalSpanFetch.textContent = `$${subtotal.toFixed(2)}`;
    if (cartGrandTotalSpanFetch) cartGrandTotalSpanFetch.textContent = `$${subtotal.toFixed(2)}`; // Assuming shipping/tax calculated later
    if (desktopCartCountFetch) desktopCartCountFetch.textContent = totalItems;
    if (mobileCartCountFetch) mobileCartCountFetch.textContent = totalItems;

    // Re-apply event listeners for quantity buttons and remove buttons
    addCartItemEventListenersFetch();
    animateOnScrollElements.forEach((el) => observer.observe(el)); // Re-observe new elements
  }

  // Add event listeners for quantity buttons and remove buttons
  function addCartItemEventListenersFetch() {
    document.querySelectorAll(".increment-cart-item").forEach((button) => {
      button.onclick = (e) => updateCartItemQuantityFetch(e.target.dataset.itemId, 1);
    });
    document.querySelectorAll(".decrement-cart-item").forEach((button) => {
      button.onclick = (e) => updateCartItemQuantityFetch(e.target.dataset.itemId, -1);
    });
    document.querySelectorAll(".cart-quantity-input").forEach((input) => {
      input.onchange = (e) => {
        let newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
        }
        setCartItemQuantityFetch(e.target.dataset.itemId, newQuantity);
      };
    });
    document.querySelectorAll(".remove-cart-item").forEach((button) => {
      button.onclick = (e) => removeFromCartFetch(e.target.dataset.itemId);
    });
  }

  // Update item quantity in cart array and localStorage
  function updateCartItemQuantityFetch(itemId, change) {
    const itemIndex = cartFetch.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      let newQuantity = cartFetch[itemIndex].quantity + change;
      if (newQuantity < 1) newQuantity = 1;
      cartFetch[itemIndex].quantity = newQuantity;
      saveCartToLocalStorageFetch();
      renderCartFetch();
    }
  }

  // Set item quantity directly in cart array and localStorage
  function setCartItemQuantityFetch(itemId, quantity) {
    const itemIndex = cartFetch.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      cartFetch[itemIndex].quantity = quantity;
      saveCartToLocalStorageFetch();
      renderCartFetch();
    }
  }

  // Remove item from cart array and localStorage
  function removeFromCartFetch(itemId) {
    cartFetch = cartFetch.filter((item) => item.id !== itemId);
    saveCartToLocalStorageFetch();
    renderCartFetch();
  }

  // Clear all items from cart in localStorage
  if (clearCartButtonFetch) {
    clearCartButtonFetch.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your entire cart?")) {
        cartFetch = [];
        saveCartToLocalStorageFetch();
        renderCartFetch();
      }
    });
  }

  // Intersection Observer for scroll animations
  const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe elements
  document.addEventListener("DOMContentLoaded", () => {
    animateOnScrollElements.forEach((el) => observer.observe(el));
    loadCartFromLocalStorageFetch(); // Load cart when the page loads
  });
})();
