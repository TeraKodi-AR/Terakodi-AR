/*===== Muestra o Esconde el Login y Register =====*/
const signUp = document.getElementById("sign-up"),
  signIn = document.getElementById("sign-in"),
  loginIn = document.getElementById("login-in"),
  loginUp = document.getElementById("login-up");

signUp.addEventListener("click", () => {
  // Quita las clases si existen primero
  loginIn.classList.remove("block");
  loginUp.classList.remove("none");

  // Añade las clases
  loginIn.classList.toggle("none");
  loginUp.classList.toggle("block");
});

signIn.addEventListener("click", () => {
  // Quita las clases si existen primero
  loginIn.classList.remove("none");
  loginUp.classList.remove("block");

  // Añade las clases
  loginIn.classList.toggle("block");
  loginUp.classList.toggle("none");
});
