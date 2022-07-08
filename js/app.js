/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const menu = document.getElementById("navbar__list");
const sections = Array.from(document.querySelectorAll("section[data-nav]"));

const map = new Map();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function generateMenuItem(section) {
  const menuItem = document.createElement("li");
  menuItem.classList.add("menu__link");
  menuItem.innerText =
    section.getAttribute("data-nav") ?? section.getAttribute("id");

  // Scroll to section on link click
  menuItem.addEventListener("click", () => {
    // Scroll to section
    document.getElementById(section.id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return menuItem;
}

function addMenuItem(menuItem) {
  menu.appendChild(menuItem);
}

function clearState() {
  sections.forEach((section) => section.classList.remove("active-section"));
  Array.from(map.values()).forEach((section) =>
    section.classList.remove("active-menu-item")
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
sections.forEach((section) => {
  // Build menu
  const menuItem = generateMenuItem(section);
  addMenuItem(menuItem);
  map.set(section.id, menuItem);
});

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Set sections as active
        clearState();
        entry.target.classList.add("active-section");
        map.get(entry.target.id).classList.add("active-menu-item");
      }
    });
  },
  { rootMargin: "-100px" }
);
document.querySelectorAll("section[data-nav]").forEach((section) => {
  observer.observe(section);
});

/**
 * End Main Functions
 *
 */
