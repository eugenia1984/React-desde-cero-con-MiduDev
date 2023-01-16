import React from "https://esm.sh/react-dom@18.2.0"
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client";

// recupero el div con id app
// const app = document.querySelector("#app");
const app = document.getElementById("app");

// creamos el ROOT, el arbol de elementos (componentes)
// const root = ReactDOM.createRoot(domContainer)
const root = ReactDOM.createRoot(appDomElement)

// creamos el elemento BOTON
// React.createElement(<elemento a crear>, <objeto con las propiedades y atributos del elemento/null>, <lo que lo envuelve>)
const h = React.createElement

const button1 = h("button", {"data-id": 123}, "Button 1")
const button2 = h("button", {"data-id": 456}, "Button 2")
const button3 = h("button", {"data-id": 789}, "Button 3")

//const div = React.createElement("div", bull, [button1, button2, button3])
// usando fragments
const div = h(React.Fragment, null, [button1, button2, button3])
root.render(div)