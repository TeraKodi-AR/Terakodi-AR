<<<<<<< HEAD
/*===== LOGIN SHOW and HIDDEN =====*/
=======
/*===== Muestra o Esconde el Login y Register =====*/
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
const signUp = document.getElementById("sign-up"),
  signIn = document.getElementById("sign-in"),
  loginIn = document.getElementById("login-in"),
  loginUp = document.getElementById("login-up");

signUp.addEventListener("click", () => {
<<<<<<< HEAD
  // Remove classes first if they exist
  loginIn.classList.remove("block");
  loginUp.classList.remove("none");

  // Add classes
=======
  // Quita las clases si existen primero
  loginIn.classList.remove("block");
  loginUp.classList.remove("none");

  // Añade las clases
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
  loginIn.classList.toggle("none");
  loginUp.classList.toggle("block");
});

signIn.addEventListener("click", () => {
<<<<<<< HEAD
  // Remove classes first if they exist
  loginIn.classList.remove("none");
  loginUp.classList.remove("block");

  // Add classes
=======
  // Quita las clases si existen primero
  loginIn.classList.remove("none");
  loginUp.classList.remove("block");

  // Añade las clases
>>>>>>> e7988d503c8904a09bc68806baed4c16f297a674
  loginIn.classList.toggle("block");
  loginUp.classList.toggle("none");
});
