// Vanilla JavaScript
const d = document;

// Recuperamos el boton
const button = d.querySelector("button");

// al hacer click en el boton ejecutar una funcion
button.addEventListener("click", function () {
  // recuperar la id del atributo de HTML
  const id = button.getAttribute("data-id");

  // llamar a un servicio para actualizar si me gusta
  // togleLike(id)

  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    button.innerHTML = "Me gusta";
  } else {
    button.classList.add("liked");
    button.innerText = "No me gusta";
  }
});
