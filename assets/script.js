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