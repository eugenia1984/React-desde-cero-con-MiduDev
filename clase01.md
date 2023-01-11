# :star: Clase 1 de React desde cero con Midu Dev

---

## React 

- Influyó incluso en el desarrollo mobil, es una de las **bibliotecas** con mayor influencia, y hace años está estanle.

---

## :star: ¿Qué conocimientos hay que tener?

- **HTML5**, el lenguaje de marcado de la web.

- **CSS3**, para estilar los componentes.

- **JavaScript** que es el lenguaje de programación qu utiliza **React**, por ejemplo: ternarios, arrow function, default values, template literals, métodos de array, promeses, asincronía, spread operator, modulos, etc.

---

## :star: ¿Qué se debe tener ya instalado?

- **Nodejs**, el entorno de ejecución de JavaScript, pudiendo utilizarlo desde la terminal, sin tener que abrir el navegador, y también **npm** / **yarn** / **pnpm** para instalar dependencias.

- Navegador web: **Chrome** / **Brave** (deben ser bsados en Chromium) para poder utilizar las **herramientas de desarrollo**.

- Un editor de código, como el **Visual Studio Code**.

---

## :star: ¿Qué es Reactjs?

- Es una **biblioteca** de **JavaScript**, para crear **UI**(interfaces de usuario), independientemente de a donde: es para web, aplicaciones móbiles, etc(hay varios paquetes, como **react-dom** para web por ejemplo).

- Es **declarativo** y está basado en **componentes**.

- Es una **biblioteca** que es **universal**, se puede ejecutar tanto en el **cliente** como en el **servidor**, por lo que se puede reutilizar el mismo código y no tener el Back End con otro lenguaje en otro seridor.

---

## :star: Despejar dudas

- [**https://reactjs.org/**](https://reactjs.org/)

- Para consultas -> [**https://beta.reactjs.org/**](https://beta.reactjs.org/)

- Para ver preguntas y respuestas a dudas frecuentes: [**https://www.reactjs.wiki/**](https://www.reactjs.wiki/)

---

## :star: Un poco de historia

- Nace en el 2011, para intentar simplificar las Interfaces de Usuario, lo crearon en **Meta**, el desarrollador trabajo con formularios en Facebook y quería evitar ataques de Cross Side Scripting. En 2012 es utilizado en Instagram. Y desde 2013 es **open source**.

---

React es una de las librerías más demandadas, muchas empresas utilizan React o Next.js(framework de React), por lo que hay mucha salida laboral.

Con React Native se pueden hacer aplicaciones móbiles. Todas las aplicaciones mobiles de Microsoft están hechas con React Native. También hay React Native para MacOS.

---

## :star: ¿Por qué aprender React ?

1. Meta lo utiliza en producción, por lo que va a ser siempre amntenido.

2. Hay una gran comunidad de desarrolladores.

3. Aprender React te va a ayudar con el resto de los frameworks, ya que comparten muchos conceptos.

4. Futuro prometedor. Siempre va ascendiendo en su uso, se ve en las tendencias de npm.

5. tiene su API estable. Los cambios son fáciles de asimilarlos, son incrementales y fáciles de migrar.

---

## Ejercicio práctico

-> Partimos desde JavaScript Vanilla para pasarlo a React.


```CSS
button {
 background: #09f;
 color: #fff;
 border: 0;
 padding: 4px 8px;
 font-size: 18px;
 cursor: pointer;
}

body {
  background-color: #222;
  color: #fff;
  font-family: system-ui;
}
```

```HTML
<button data-id="123">Me gusta</button>
```

```JavaScript
// Vanilla JavaScript

// recuperamos el boton
const button = document.querySelector("button")

// al hacer click en el boton, tenemos que ejecutar una funcion
button.addEventListener("click", function () {
  //recuperar la id del atributo del HTML
  const id = button.getAttribute("data-id")
  
  // llamar a un servicio para actualizar si me gusta
  // toggleLike(id)
  if(button.classList.contains("liked")) {
    button.classList.remove("liked")
    button.innetText="Me gusta"
  } else {
    button.classList.add("liked")
    button.innerText="Quitar me gusta"
  }
})
```

-> Pero si en vez de un solo boton, tnego más de uno, ya en vez de un if-else necesito un switch. Y si quiero reutilizar este código ya se complica, no es nada escalable.

Esto es todo **código imperativo**, voy haciendo paso a paso todo.

-> En cambio React es **código declarativo**

Para utilizar React necesitamos:

```HTML
<div id="app"></div>
```

```JavaScript
import React from "https://esm.sh/react-dom@18.2.0/client"

const appDomElement = document.getElementById("app")

const root = ReactDOM.createRoot(appDomElement)
root.render("Hola React")
```

---
