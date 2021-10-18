<<<<<<< HEAD
/*==================== SHOW NAVBAR ====================*/
=======
/*==================== Muestra el NavBar ====================*/
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId);

<<<<<<< HEAD
  // Validate that variables exist
  if (headerToggle && navbarId) {
    toggleBtn.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
      // change icon
=======
  // Valida si las variables existen
  if (headerToggle && navbarId) {
    toggleBtn.addEventListener("click", () => {
      // Agregamos la clase show-menu a la etiqueta div con la clase nav__menu
      nav.classList.toggle("show-menu");
      // Cambio de icono
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
      toggleBtn.classList.toggle("bx-x");
    });
  }
};
showMenu("header-toggle", "navbar");

<<<<<<< HEAD
/*==================== LINK ACTIVE ====================*/
=======
/*==================== LINK ACTIVO ====================*/
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
const linkColor = document.querySelectorAll(".nav__link");

function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((l) => l.addEventListener("click", colorLink));
