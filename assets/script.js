document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  // ===== Menú mobile =====
  function openMenu() {
    if (!hamburger || !navLinks) return;

    hamburger.classList.add("active");
    navLinks.classList.add("active");
    body.style.overflow = "hidden";
    hamburger.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!hamburger || !navLinks) return;

    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!navLinks) return;

    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", toggleMenu);

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      const clickedInsideNavbar = event.target.closest(".navbar");

      if (navLinks.classList.contains("active") && !clickedInsideNavbar) {
        closeMenu();
      }
    });
  }

  // ===== Filtro de proyectos =====
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {
          const categories = (card.dataset.category || "").split(" ");

          if (filter === "all" || categories.includes(filter)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  const headerEl = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    headerEl.classList.add("scrolled");
  } else {
    headerEl.classList.remove("scrolled");
  }
});
});

// ===== Dark Mode =====
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "dark"; // dark por defecto
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeIcon?.classList.replace("fa-moon", "fa-sun");
}


themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeIcon?.classList.replace(
    isDark ? "fa-moon" : "fa-sun",
    isDark ? "fa-sun" : "fa-moon"
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ===== Language Toggle =====
const langToggle = document.getElementById("langToggle");
const langLabel = langToggle?.querySelector(".lang-label");

let currentLang = localStorage.getItem("lang") || "es";

function applyLanguage(lang) {
  // Update all elements with data-es / data-en
  document.querySelectorAll("[data-es][data-en]").forEach(el => {
    const text = lang === "en" ? el.dataset.en : el.dataset.es;
    if (!text) return;
    // If the element has child elements (e.g. <strong>), use innerHTML
    if (el.dataset.en.includes("<") || el.dataset.es.includes("<")) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  // Update <html lang>
  document.documentElement.lang = lang;

  // Update button label
  if (langLabel) langLabel.textContent = lang === "en" ? "ES" : "EN";

  localStorage.setItem("lang", lang);
  currentLang = lang;
}

// Apply saved language on load
if (currentLang === "en") applyLanguage("en");

langToggle?.addEventListener("click", () => {
  applyLanguage(currentLang === "es" ? "en" : "es");
});