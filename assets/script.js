document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // ===== Alto exacto del hero (evita el hueco por redondeo de vh/dvh) =====
  const hero = document.querySelector(".hero");
  if (hero) {
    const setHeroHeight = () => {
      hero.style.minHeight = `${window.innerHeight}px`;
    };
    setHeroHeight();
    window.addEventListener("resize", setHeroHeight);
    window.addEventListener("orientationchange", setHeroHeight);
  }

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
  const scrollProgress = document.getElementById("scrollProgress");

  function updateOnScroll() {
    if (window.scrollY > 60) {
      headerEl.classList.add("scrolled");
    } else {
      headerEl.classList.remove("scrolled");
    }

    if (scrollProgress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }
  }

  window.addEventListener("scroll", updateOnScroll);
  updateOnScroll();

  // ===== Animaciones dinámicas al hacer scroll =====
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealTargets = document.querySelectorAll(
    "main section > h2, .section-description, .about-text, .about-summary-card, .experience-card, .project-card, .certificate-card, .contact-info, .contact-form-container"
  );

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add("reveal", "in-view"));
  } else if (revealTargets.length) {
    const groups = new Map();
    revealTargets.forEach(el => {
      el.classList.add("reveal");
      const siblings = groups.get(el.parentElement) || [];
      siblings.push(el);
      groups.set(el.parentElement, siblings);
    });
    groups.forEach(siblings => {
      siblings.forEach((el, index) => {
        el.style.transitionDelay = `${Math.min(index, 6) * 80}ms`;
      });
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // ===== Link activo del navbar según sección visible =====
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  if (sections.length && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(a => a.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          activeLink?.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

  // ===== Tilt sutil de la foto en el hero =====
  const heroImageWrap = document.querySelector(".hero-image-wrap");
  const heroImageShape = document.querySelector(".hero-image-shape");

  if (heroImageWrap && heroImageShape && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    heroImageWrap.addEventListener("mousemove", event => {
      const rect = heroImageWrap.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroImageShape.style.transform = `rotateY(${x * 14}deg) rotateX(${y * -14}deg)`;
    });

    heroImageWrap.addEventListener("mouseleave", () => {
      heroImageShape.style.transform = "";
    });
  }
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