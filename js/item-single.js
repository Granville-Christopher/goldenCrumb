function updateNavLinkColors() {
  const header = document.querySelector("header");
  // const logo = header.querySelector("a");
  const links = header.querySelectorAll("nav a");
  const scrolledPast = window.scrollY > window.innerHeight * 0;

  if (scrolledPast) {
    header.classList.add("bg-gray-100");
    // logo.classList.add("text-dark-brown");
    links.forEach((link) => {
      if (link.classList.contains("reservation-link")) return;
      // link.classList.remove("text-primary-cream");
      // link.classList.add("text-dark-brown");
    });
  } else {
    header.classList.remove("bg-gray-100");
    // logo.classList.remove("text-dark-brown");

    links.forEach((link) => {
      // Remove text-dark-brown by default
      // link.classList.remove("text-dark-brown");

      // Check screen width
      if (window.innerWidth < 768) {
        // For small screens
        if (link.classList.contains("reservation-link")) return;
        // link.classList.add("text-primary-cream");
      } else {
        // For medium and large screens
        // link.classList.add("text-primary-cream");
      }
    });
  }
}

window.addEventListener("scroll", updateNavLinkColors);
window.addEventListener("load", updateNavLinkColors);

//

const navToggler = document.getElementById("nav-toggler");
const mobileNav = document.getElementById("mobile-nav");
const navOverlay = document.getElementById("nav-overlay");
const closeNav = document.getElementById("close-nav");
const togglerIcon = navToggler.querySelector("i");

function openNav() {
  mobileNav.classList.remove("translate-x-full");
  navOverlay.classList.remove("hidden");
  navOverlay.classList.add("block");
  togglerIcon.classList.replace("fa-bars", "fa-times");
}

function closeMobileNav() {
  mobileNav.classList.add("translate-x-full");
  navOverlay.classList.add("hidden");
  togglerIcon.classList.replace("fa-times", "fa-bars");
}

navToggler.addEventListener("click", () => {
  const isOpen = !mobileNav.classList.contains("translate-x-full");
  isOpen ? closeMobileNav() : openNav();
});

closeNav.addEventListener("click", closeMobileNav);
navOverlay.addEventListener("click", closeMobileNav);
// Close mobile nav on link click
document.querySelectorAll("#mobile-nav a").forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

// Intersection Observer for scroll animations
const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Animate once
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Adjust margin
  }
);

animateOnScrollElements.forEach((el) => observer.observe(el));

// Image Thumbnail Switching Logic
const mainProductImage = document.getElementById("main-product-image");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Update main image source
    mainProductImage.src = this.dataset.fullSrc;

    // Remove 'active' class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add 'active' class to the clicked thumbnail
    this.classList.add("active");
  });
});

const quantityInput = document.getElementById("quantity-input");
const decrementBtn = document.getElementById("decrement-btn");
const incrementBtn = document.getElementById("increment-btn");
const orderStatusDiv = document.getElementById("order-status"); // Assuming this exists for feedback

function updateDecrementButtonState() {
  const currentValue = parseInt(quantityInput.value);
  decrementBtn.disabled = currentValue <= 1;
}

decrementBtn.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
    updateDecrementButtonState();
  }
});

incrementBtn.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = currentValue + 1;
  updateDecrementButtonState();
});

// Ensure quantity input is always a valid number and at least 1
let inputTimeout;
quantityInput.addEventListener("input", () => {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
      quantityInput.value = 1;
    }
    updateDecrementButtonState();
  }, 300);
});

// Prevent non-numeric input
quantityInput.addEventListener("keydown", (e) => {
  if (
    !(
      (e.key >= "0" && e.key <= "200") ||
      e.key === "Backspace" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab"
    )
  ) {
    e.preventDefault();
  }
});

// Initialize decrement button state on page load
updateDecrementButtonState();

//

// mobile add to cart button functionality

const quantityInputSmall = document.getElementById("quantity-input-d");
const decrementBtnSmall = document.getElementById("decrement-btn-d");
const incrementBtnSmall = document.getElementById("increment-btn-d");
const orderStatusDivSmall = document.getElementById("order-status"); // Assuming this exists for feedback

function updateDecrementButtonStateSmall() {
  const currentValue = parseInt(quantityInputSmall.value);
  decrementBtnSmall.disabled = currentValue <= 1;
}

decrementBtnSmall.addEventListener("click", () => {
  let currentValue = parseInt(quantityInputSmall.value);
  if (currentValue > 1) {
    quantityInputSmall.value = currentValue - 1;
    updateDecrementButtonStateSmall();
  }
});

incrementBtnSmall.addEventListener("click", () => {
  let currentValue = parseInt(quantityInputSmall.value);
  quantityInputSmall.value = currentValue + 1;
  updateDecrementButtonStateSmall();
});

// Ensure quantity input is always a valid number and at least 1
let inputTimeoutSmall;
quantityInputSmall.addEventListener("input", () => {
  clearTimeout(inputTimeoutSmall);
  inputTimeoutSmall = setTimeout(() => {
    let value = parseInt(quantityInputSmall.value);
    if (isNaN(value) || value < 1) {
      quantityInputSmall.value = 1;
    }
    updateDecrementButtonStateSmall();
  }, 300);
});

// Prevent non-numeric input
quantityInputSmall.addEventListener("keydown", (e) => {
  if (
    !(
      (e.key >= "0" && e.key <= "200") ||
      e.key === "Backspace" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab"
    )
  ) {
    e.preventDefault();
  }
});

// Initialize decrement button state on page load
updateDecrementButtonStateSmall();

// Remove add to cart event listeners to avoid ReferenceError and rely on cart-render.js for add to cart functionality
// document.querySelector(".order-btn").addEventListener("click", () => { ... });
// document.querySelector(".order-btn-small").addEventListener("click", () => { ... });

