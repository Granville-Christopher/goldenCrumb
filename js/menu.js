// Set current year in footer
document.getElementById("current-year-menu").textContent =
  new Date().getFullYear();

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const logo = header.querySelector("a");
  const links = header.querySelectorAll("nav a");
  const scrolledPast = window.scrollY > window.innerHeight * 0.1;
  if (scrolledPast) {
    header.classList.add("bg-gray-100");
    logo.classList.add("text-dark-brown");
    links.forEach((link) => {
      if (link.classList.contains("reservation-link")) return;
      link.classList.remove("text-primary-cream");
      link.classList.add("text-dark-brown");
    });
  } else {
    header.classList.remove("bg-gray-100");
    logo.classList.remove("text-dark-brown");

    links.forEach((link) => {
      // Check screen width
      if (window.innerWidth < 768) {
        // For small screens
        if (link.classList.contains("reservation-link")) return;
        link.classList.remove("text-primary-cream");
        link.classList.add("text-dark-brown");
      } else {
        // For medium and large screens
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

// Intersection Observer for scroll animations (re-initialized for this page)
const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // Removed unobserve to allow re-animation if elements are hidden/shown by filter
        // If you want animation only once per load, uncomment
        //  observer.unobserve(entry.target);
      } else {
        // Optional: remove in-view if element scrolls out of view, for re-animation
        entry.target.classList.remove("in-view");
      }
    });
  },
  {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Adjust margin to fine-tune trigger point
  }
);

animateOnScrollElements.forEach((el) => observer.observe(el));

// Form submission handling for reservation form (client-side only for demonstration)
document
  .getElementById("reservation-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const statusDiv = document.getElementById("reservation-status");
    statusDiv.textContent = "Submitting your reservation...";
    statusDiv.className = "mt-4 text-center text-dark-brown";

    // Simulate API call
    setTimeout(() => {
      statusDiv.textContent = "Table reserved! We look forward to seeing you.";
      statusDiv.className = "mt-4 text-center text-green-600";
      this.reset();
    }, 2000);
  });

// --- Menu Filtering Logic ---
const categoryFilters = document.querySelectorAll(
  "#category-filters .category-card"
);
const menuItems = document.querySelectorAll("#all-menu-items .menu-item-card");
let currentActiveCategory = "all"; // Default to show all

function filterMenuItems(category) {
  // Remove active class from all category buttons
  categoryFilters.forEach((button) => {
    button.classList.remove("active-category");
  });

  // Set current active category for logic
  if (currentActiveCategory === category) {
    // If clicking the active category again, show all
    currentActiveCategory = "all";
  } else {
    currentActiveCategory = category;
    // Add active class to the clicked button
    document
      .querySelector(`[data-category-filter="${category}"]`)
      .classList.add("active-category");
  }

  // Iterate through all menu items and show/hide based on category
  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    if (
      currentActiveCategory === "all" ||
      itemCategory === currentActiveCategory
    ) {
      item.style.display = "block"; // Show the item
      // Re-observe for animation if it was previously hidden
      observer.observe(item);
    } else {
      item.style.display = "none"; // Hide the item
      observer.unobserve(item); // Stop observing hidden items
    }
  });
}

// Add event listeners to category filter buttons
categoryFilters.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor link behavior
    const category = this.getAttribute("data-category-filter");
    filterMenuItems(category);
  });
});

filterMenuItems("pastries");
