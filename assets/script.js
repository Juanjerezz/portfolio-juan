const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Quitar "active" de todos y agregar al actual
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


// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  // Alternar menú
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navLinks.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    
    // Actualizar atributo ARIA
    const isExpanded = this.classList.contains('active');
    this.setAttribute('aria-expanded', isExpanded);
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = 'auto';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = 'auto';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Filtrado de proyectos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Agregar clase active al botón clickeado
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