const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      // Obtener todas las categorías del proyecto (separadas por espacios)
      const categories = card.dataset.category.split(" ");
      
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  
  // Detectar si es iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Alternar menú
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navLinks.classList.contains('active')) {
      body.style.overflow = 'hidden';
      // Solución específica para iOS
      if (isIOS) {
        document.documentElement.style.position = 'fixed';
        document.documentStyle.style.width = '100%';
      }
    } else {
      body.style.overflow = 'auto';
      if (isIOS) {
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
      }
    }
    
    // Actualizar atributo ARIA
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }


  hamburger.addEventListener('click', toggleMenu);
  

  hamburger.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Previene comportamiento por defecto
    toggleMenu();
  }, { passive: false });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = 'auto';
      
      if (isIOS) {
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
      }
      
      hamburger.setAttribute('aria-expanded', 'false');
    });
    
    link.addEventListener('touchstart', function() {
      this.style.opacity = '0.7';
    }, { passive: true });
    
    link.addEventListener('touchend', function() {
      this.style.opacity = '';
    }, { passive: true });
  });

  document.addEventListener('click', function(event) {
    if (navLinks.classList.contains('active') && 
        !event.target.closest('.navbar') && 
        !event.target.closest('.nav-links')) {
      toggleMenu();
    }
  });
  
  let touchStartX = 0;
  document.addEventListener('touchstart', function(e) {
    if (navLinks.classList.contains('active')) {
      touchStartX = e.changedTouches[0].screenX;
    }
  }, { passive: true });
  
  document.addEventListener('touchend', function(e) {
    if (navLinks.classList.contains('active')) {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) {
        toggleMenu();
      }
    }
  }, { passive: true });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});