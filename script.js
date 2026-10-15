// Cache references to the elements the script controls
const root = document.documentElement;
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = siteNav.querySelectorAll("a");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const yearLabel = document.getElementById("year");

// Show or hide the mobile navigation and keep the button's accessibility attributes in sync
function setMenu(isOpen) {
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

// Apply a theme ("light" or "dark") to the page and update the toggle button to match
function applyTheme(theme) {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Read the visitor's saved theme, returning null if storage is unavailable or empty
function getSavedTheme() {
    try {
        return localStorage.getItem("theme");
    } catch (error) {
        return null;
    }
}

// Store the visitor's theme choice so it is remembered on their next visit
function saveTheme(theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        return;
    }
}

// Open or close the menu when the hamburger button is clicked
menuToggle.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("is-open"));
});

// Close the menu after a navigation link is chosen
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        setMenu(false);
    });
});

// Close the menu when the Escape key is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

// Switch between light and dark themes when the theme button is clicked, then save the choice
themeToggle.addEventListener("click", function () {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    saveTheme(nextTheme);
});

// On load, use the saved theme or fall back to the visitor's system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

// Fill in the current year in the footer
yearLabel.textContent = new Date().getFullYear();
