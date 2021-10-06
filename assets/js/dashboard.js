/*==================== Muestra el NavBar ====================*/
const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId);

  // Valida si las variables existen
  if (headerToggle && navbarId) {
    toggleBtn.addEventListener("click", () => {
      // Agregamos la clase show-menu a la etiqueta div con la clase nav__menu
      nav.classList.toggle("show-menu");
      // Cambio de icono
      toggleBtn.classList.toggle("bx-x");
    });
  }
};
showMenu("header-toggle", "navbar");

/*==================== LINK ACTIVO ====================*/
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));
