// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Intersection Observer for scroll animations
const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05, // Trigger when 20% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Adjust margin to fine-tune trigger point
  }
);

animateOnScrollElements.forEach((el) => observer.observe(el));

// Form submission handling (client-side only for demonstration)
document
  .getElementById("testimonial-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const statusDiv = document.getElementById("testimonial-status");
    statusDiv.textContent = "Submitting your testimonial...";
    statusDiv.className = "mt-4 text-center text-dark-brown";

    // Simulate API call
    setTimeout(() => {
      statusDiv.textContent = "Thank you for your testimonial!";
      statusDiv.className = "mt-4 text-center text-green-600";
      this.reset();
    }, 2000);
  });

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const statusDiv = document.getElementById("contact-status");
    statusDiv.textContent = "Sending your message...";
    statusDiv.className = "mt-4 text-center text-white";

    // Simulate API call
    setTimeout(() => {
      statusDiv.textContent =
        "Message sent successfully! We will get back to you soon.";
      statusDiv.className = "mt-4 text-center text-green-400";
      this.reset();
    }, 2000);
  });

//
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const logo = header.querySelector("a");
  const links = header.querySelectorAll("nav a");
  const scrolledPast = window.scrollY > window.innerHeight * 0.9;
  const cartElement = document.getElementById("cart");
  const cartCountElement = cartElement
    ? cartElement.querySelector("#cart-count")
    : null;
  const cartIconElement = cartElement
    ? cartElement.querySelector("#cart-icon")
    : null;

  if (scrolledPast) {
    header.classList.add("bg-gray-100");
    logo.classList.add("text-dark-brown");
    if (window.innerWidth < 768) {
      if (window.innerWidth < 768) {
        if (cartCountElement) {
          cartCountElement.classList.remove("text-primary-cream");
          cartCountElement.classList.add("text-dark-brown");
        }
        if (cartIconElement) {
          cartIconElement.classList.remove("text-primary-cream");
          cartIconElement.classList.add("text-dark-brown");
        }
      }
    }
    links.forEach((link) => {
      if (link.classList.contains("reservation-link")) return;
      link.classList.remove("text-primary-cream");
      link.classList.add("text-dark-brown");
    });
  } else {
    header.classList.remove("bg-gray-100");
    logo.classList.remove("text-dark-brown");

    links.forEach((link) => {
      // Check screen width for links (as you already have)
      if (window.innerWidth < 768) {
        // For small screens, keep text-dark-brown for non-reservation links
        if (link.classList.contains("reservation-link")) return;
        if (cartCountElement) {
          cartCountElement.classList.remove("text-dark-brown");
          cartCountElement.classList.add("text-primary-cream");
        }
        if (cartIconElement) {
          cartIconElement.classList.remove("text-dark-brown");
          cartIconElement.classList.add("text-primary-cream");
        }
        link.classList.remove("text-primary-cream");
        link.classList.add("text-dark-brown");
      } else {
        // For medium and large screens, apply primary-cream
        link.classList.add("text-primary-cream");
        link.classList.remove("text-dark-brown");
      }
    });
  }
});
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
