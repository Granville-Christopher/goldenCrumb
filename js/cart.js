window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const logo = header.querySelector("a");
  const links = header.querySelectorAll("nav a");
  const scrolledPast = window.scrollY > window.innerHeight * 0;

  if (scrolledPast) {
    header.classList.add("bg-gray-100");
    logo.classList.add("text-dark-brown");

    links.forEach((link) => {
      if (link.classList.contains("reservation-link")) return;
    });
  } else {
    header.classList.remove("bg-gray-100");
    logo.classList.remove("text-dark-brown");

    links.forEach((link) => {
      // Check screen width for links (as you already have)
      if (window.innerWidth < 768) {
        // For small screens
        if (link.classList.contains("reservation-link")) return;
        
      } else {
        // For medium and large screens
       return;
      }
    });
  }
});

// UI elements
const cartItemsContainer = document.getElementById("cart-items-container");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartSubtotalSpan = document.getElementById("cart-subtotal");
const cartGrandTotalSpan = document.getElementById("cart-grand-total");
const clearCartButton = document.getElementById("clear-cart-button");
const desktopCartCount = document.getElementById("desktop-cart-count");
const mobileCartCount = document.getElementById("mobile-cart-count");

let cart = []; // Array to hold cart items

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("bakeryCart");
  cart = storedCart ? JSON.parse(storedCart) : [];
  renderCart();
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("bakeryCart", JSON.stringify(cart));
}

// Function to render cart items to the DOM
function renderCart() {
  if (!cartItemsContainer) return; // Exit if container not found

  cartItemsContainer.innerHTML = ""; // Clear previous items
  let subtotal = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.classList.remove("hidden");
    if (clearCartButton) clearCartButton.classList.add("hidden"); // Hide clear cart if empty
  } else {
    if (emptyCartMessage) emptyCartMessage.classList.add("hidden");
    if (clearCartButton) clearCartButton.classList.remove("hidden"); // Show clear cart if not empty

    cart.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      totalItems += item.quantity;

      const itemElement = document.createElement("div");
      itemElement.className =
        "flex flex-row items-center justify-between bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 animate-on-scroll";
      itemElement.setAttribute("data-item-id", item.id); // Use item.id as unique identifier

      itemElement.innerHTML = `
        <div class="flex items-center w-full ">
          <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
          <div class="text-left flex-grow">
            <h3 class="text-sm font-playfair text-dark-brown">${item.name}</h3>
            <p class="text-gray-700 text-sm">$${item.price.toFixed(2)} / unit</p>
          </div>
          <button class="remove-cart-item ml-4 text-red-500 hover:text-red-700 transition-colors" data-item-id="${item.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div class=" md:flex items-center text-center justify-between md:justify-end w-full md:w-full mt-4 md:mt-0">
          <div class="flex items-center text-center  border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <button class="quantity-btn decrement-cart-item text-3xl mx-3" data-item-id="${item.id}">-</button>
            <input type="number" value="${item.quantity}" min="1"  class="quantity-input text-center rounded-lg cart-quantity-input" data-item-id="${item.id}">
            <button class="quantity-btn increment-cart-item text-3xl mx-2" data-item-id="${item.id}">+</button>
          </div>
          <span class="text-dark-brown  font-bold text-xs md:text-lg  mt-1 md:ml-8">$${itemSubtotal.toFixed(2)}</span>

        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

  // Update totals
  if (cartSubtotalSpan) cartSubtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  if (cartGrandTotalSpan) cartGrandTotalSpan.textContent = `$${subtotal.toFixed(2)}`; // Assuming shipping/tax calculated later
  if (desktopCartCount) desktopCartCount.textContent = totalItems;
  if (mobileCartCount) mobileCartCount.textContent = totalItems;

  // Re-apply event listeners for quantity buttons and remove buttons
  addCartItemEventListeners();
  animateOnScrollElements.forEach((el) => observer.observe(el)); // Re-observe new elements
}

// Add event listeners for quantity buttons and remove buttons
function addCartItemEventListeners() {
  document.querySelectorAll(".increment-cart-item").forEach((button) => {
    button.onclick = (e) => {
      console.log("Increment button clicked for item:", e.currentTarget.dataset.itemId);
      updateCartItemQuantity(e.currentTarget.dataset.itemId, 1);
    };
  });
  document.querySelectorAll(".decrement-cart-item").forEach((button) => {
    button.onclick = (e) => {
      console.log("Decrement button clicked for item:", e.currentTarget.dataset.itemId);
      updateCartItemQuantity(e.currentTarget.dataset.itemId, -1);
    };
  });
  document.querySelectorAll(".cart-quantity-input").forEach((input) => {
    input.onchange = (e) => {
      let newQuantity = parseInt(e.target.value);
      if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
      }
      console.log("Quantity input changed for item:", e.currentTarget.dataset.itemId, "New quantity:", newQuantity);
      setCartItemQuantity(e.currentTarget.dataset.itemId, newQuantity);
    };
  });
  document.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.onclick = (e) => {
      console.log("Remove button clicked for item:", e.currentTarget.dataset.itemId);
      removeFromCart(e.currentTarget.dataset.itemId);
    };
  });
}

// Update item quantity in cart array and localStorage
function updateCartItemQuantity(itemId, change) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    let newQuantity = cart[itemIndex].quantity + change;
    if (newQuantity < 1) newQuantity = 1;
    cart[itemIndex].quantity = newQuantity;
    saveCartToLocalStorage();
    renderCart();
  }
}

// Set item quantity directly in cart array and localStorage
function setCartItemQuantity(itemId, quantity) {
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
    saveCartToLocalStorage();
    renderCart();
  }
}

// Remove item from cart array and localStorage
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveCartToLocalStorage();
  renderCart();
}

// Clear all items from cart in localStorage
clearCartButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your entire cart?")) {
    cart = [];
    saveCartToLocalStorage();
    renderCart();
  }
});

// Checkout Button (Placeholder)
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Proceeding to checkout! (This is a placeholder)");
    // In a real application, this would redirect to a checkout page.
  } else {
    alert("Your cart is empty. Please add items before checking out.");
  }
});

// Load cart from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});

// --- General Page JS ---
const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // observer.unobserve(entry.target); // Keep commented to allow re-animation on cart changes
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px",
  }
);

animateOnScrollElements.forEach((el) => observer.observe(el));

// Mobile Nav Toggler
const navToggler = document.getElementById("nav-toggler");
const mobileNav = document.getElementById("mobile-nav");
const closeNav = document.getElementById("close-nav");
const navOverlay = document.getElementById("nav-overlay");

navToggler.addEventListener("click", () => {
  mobileNav.classList.add("open");
  navOverlay.classList.remove("hidden");
});

closeNav.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  navOverlay.classList.add("hidden");
});

navOverlay.addEventListener("click", () => {
  mobileNav.classList.remove("open");
  navOverlay.classList.add("hidden");
});
