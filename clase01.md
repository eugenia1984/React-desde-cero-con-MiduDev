# :book: React desde cero con Midu Dev \* Clase 1

---

## React

- Influyó incluso en el desarrollo mobil, es una de las **bibliotecas** con mayor influencia, y hace años está estable.

---

## :star: ¿Qué conocimientos hay que tener previos para el curso?

- **HTML5**, el lenguaje de marcado de la web.

- **CSS3**, para estilar los componentes.

- **JavaScript** que es el lenguaje de programación qu utiliza **React**, por ejemplo: ternarios, arrow function, default values en los parámetros, desestructuración, template literals(para interpolar sting con variables), métodos de array, promeses(promesas), asincronía en JavaScript, spread operator, optional changing, ECMA script modules(sistema de módulos de JavaScript), etc.

---

## :star: ¿Qué se debe tener ya instalado?

- **Nodejs**, el entorno de ejecución de JavaScript, pudiendo utilizarlo desde la terminal, sin tener que abrir el navegador, y también **npm** / **yarn** / **pnpm** para instalar dependencias. Tener como mínimo la **Versión 16** de Node. Se puede instalar un **Administrador de versiones de Node**, para poder cambiar entre diferentes versiones de Node, como por ejemplo **NWM** ó **FNM**(Fast and Simple Nodejs Version Manager).

- Navegador web: **Chrome** / **Brave** / \*+Opera** / **Edge**(deben ser basados en Google Chrome -Chromium) para poder utilizar las **herramientas de desarrollo\*\*.

- Un editor de código, como el **Visual Studio Code**(en el curso se va a utilizar VSC con sus **extensiones**), Sublime, Vim, NeoNano, etc.

---

## :star: ¿Qué es Reactjs?

- Es una **biblioteca** de **JavaScript**, para construir **UI**(interfaces de usuario), independientemente de donde sea: es para web, aplicaciones móbiles, aplicaciones de terminal, etc. React es **agnóstico de la plataforma**, (hay varios paquetes, como **react-dom** que es específico del navegador web.

- Es **declarativo** y está basado en **componentes**. Anteriormente no era tan sencillo reutilizar código, hoy en día también otras librerías, como VUE, se basan en componentes. Se basa en el **Atomik design**

- Es una **biblioteca** que es **universal**, se puede ejecutar tanto en el **cliente** como en el **servidor**, por lo que se puede reutilizar el mismo código y no tener el Back End con otro lenguaje en otro servidor y utilizar una biblioteca que "parchee" el HTML. Ahora se escribe una sola vez la aplicación.

---

## :star: Páginas webs para despejar dudas

- [**https://reactjs.org/**](https://reactjs.org/)

- Para consultas -> [**https://beta.reactjs.org/**](https://beta.reactjs.org/) esta versión beta es más completa, tiene ejemplos decódigos.

- Para ver preguntas y respuestas a dudas frecuentes: [**https://www.reactjs.wiki/**](https://www.reactjs.wiki/), desde consultas de principiante, pasando a intermedio, hasta avanzado, son más de 100 consultas. Está el repositorio de GitHub, la página web y el libro.

---

## :star: Un poco de historia

- Nace en el **2011**, para intentar simplificar las Interfaces de Usuario, lo crearon en **Meta**(Facebook, Twitter, Whatsapp). El desarrollador venía del Back End y de sistemas distribuidos (venía de Amazon) y trabajando con formularios en Facebook quería evitar ataques por XSS (de Cross Side Scripting).

En **2012** es utilizado en **Instagram**.

Y desde 2013 es **open source**, hasta el día de hoy inclusive.

---

React es una de las librerías más demandadas, muchas empresas utilizan React o Next.js(framework de React), por lo que hay mucha salida laboral.

Con React Native se pueden hacer aplicaciones móbiles. Todas las aplicaciones mobiles de Microsoft están hechas con React Native. También hay React Native para MacOS.

---

## :star: ¿Por qué aprender React ?

1. Es una de las bibliotecas más demandado en el mundo occidental. En general hay más opciones de React que de Angular, Vue, Svelt u otros Frameworks. **Tiene mucha salida laboral**. Se usa **NEXTjs** o **Gatsby** que son Frameworks de React. Lo usan las start ups.

2. Lo que se aprende en React, luego se puede pasar a **React Native** para hacer aplicaicones móbiles. Hay React Native para Windows y MacOS.

3. Meta lo utiliza en producción, en todos sus productos, por lo que va a ser **siempre mantenimiento**.

4. Hay una **gran comunidad** de desarrolladores, un **gran ecosistema**,

5. Aprender React **te va a ayudar con el resto de los frameworks**, ya que comparten muchos conceptos (componentes, estados, reactividad, handle clicks).

6. **Futuro prometedor**. Siempre va ascendiendo en su uso, se ve en las tendencias de npm.

7. Tiene su **API estable**. Los cambios son fáciles de asimilarlos, son incrementales y fáciles de migrar.

---

## :star2: Ejercicio práctico

-> Partimos desde JavaScript Vanilla para pasarlo a React.

:computer: -> [Aca se puede ver el código: **01_ejercicio_con_vanilla_js**](https://github.com/eugenia1984/React-desde-cero-con-MiduDev/tree/main/01_ejercicio_con_vanilla_js)

Partiendo desde un **botón** de **Me gusta**, con javaScript vanilla le vamos a dar interactividad, para que al hacer **click** cambie el texto.

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

El boton tiene un **Ddta-id**, que es la forma de recuperar qué es lo que gusta.

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

-> Es **código imperativo**, le digo **cómo** hay que hacerlo. Hago el **paso a paso** de todo.

-Selecciona el boton

-Escucha el evento **click**

-Al hacer click **recuperar el id del atributo**

-Luego **llamar al servicio** para actualizar si me gusta

-Ver si contiene **liked**, entonces sacar la clase **liked** y modificar el texto del botón. Si no tiene **liked** agregar la clase y modificar el texto.

-> Le hice una mini modificación asi ademas de cambiar el texto, cambian los colores de fondo y del texto.

Me queda así:

![image](https://user-images.githubusercontent.com/72580574/212562447-4398644a-d591-4c26-b50e-ba5de4b18aa2.png)

![image](https://user-images.githubusercontent.com/72580574/212562457-c7e28479-9090-4fb5-8678-ab4be38ddd30.png)

-> Pero si en vez de un solo boton, tengo más de uno, ya en vez de un if-else necesito un switch. Y si quiero reutilizar este código ya se complica, no es nada escalable.


```HTML
<main>
    <button data-id="123"></button>
    <button data-id="123"></button>
    <button data-id="123"></button>
  </main>
```

```JavaScript
// Vanilla JavaScript
const d = document;

// Recuperamos el boton
const button = d.querySelectorAll("button");

button.forEach(button => {
  // al hacer click en el boton ejecutar una funcion
  button.addEventListener("click", function () {
    // recuperar la id del atributo de HTML
    const id = button.getAttribute("data-id");

    // llamar a un servicio para actualizar si me gusta
    // togleLike(id)

    if (button.classList.contains("liked")) {
      button.classList.remove("liked");
      button.innerHTML = "No me gusta";
    } else {
      button.classList.add("liked");
      button.innerText = "Me gusta";
    }
  });
})
```

Esto es todo **código imperativo**, voy haciendo paso a paso todo.

El **código imperativo NO escala bien**, por cada cambio hay que ir haciendo mucha modificación de código.


-> Vamos a pasar lo mismo, pero en React con JavaScript, todavía no usamos JSX.

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

Asi se puede renderizar un Sting, pero para renderizar un elemento es distinto:

```JavaScript
import React from "https://esm.sh/react-dom@18.2.0/client"
import ReactDOM  from "https://esm.sh/react-dom@18.2.0/client"

const appDomElement = document.getElementById("app")

const root = ReactDOM.createRoot(appDomElement)

const h = React.createElement

const button1 = h("button", {"data-id": 123}, "Button 1")
const button2 = h("button", {"data-id": 456}, "Button 2")
const button3 = h("button", {"data-id": 789}, "Button 3")

//const div = React.createElement("div", bull, [button1, button2, button3])
// usando fragments
const div = h(React.Fragment, null, [button1, button2, button3])
root.render(div)
```

-> Dentro de **.createElement()** tengo tres parámetros:

1. Elemento a crear

2. Propiedades o atributos del element

3. Que envuelve al elemento

-> Solo puedo renderizar un elemento, si puedo tneer un elemento que envuelva a elementos hijos, peor no puedo renderizar elementos hermanos.

---

## :star: JSX

Extensión de ECMAScript basada en XML, nos facilita desarrollar en REact sin utilizar Vanilla JavaScript.

```JSX
import React from "https://esm.sh/react-dom@18.2.0/client"
import ReactDOM  from "https://esm.sh/react-dom@18.2.0/client"

const buttonJSX = <button data-id="123"> </button>
```

- **Babel** traspila el código de JSX a JavaScript para que lo puedan entender todos los navegadores, inclusive los antiguos.

- JSX no es HTML, es JavaScript.

- Se puede agregar **expresiones** poniendo entre **{}**

---

## :star: ¿Cómo crear proyectos ?

- Con **create-react-app**

- Con **vite**:

`npm init -y` -> para crear un proyecto en node

`mkdir projects` -> para crear la carpeta **projects** donde voy a tener los proyectos

`npm create vite@latest` -> para crearlo con [**vite**
](https://vitejs.dev/guide/)

-> Me va a pedir que complete alguna información:

1. El nombre del proyecto que quremos tener:

```
> 00-hola-mundo
```

2. Elegimos entre: Vanilla / Vue / React / preact / Lit / Svelte / others
```
> React
```

3. Elegimos entre: JavaScript /TypeScript / JavaScript + SWC / TypeScript + SWC
```
> JavaScript + SWC
```

**SWC** es un transpilador, como **Babl**, pero ás rápido porque está hecho con Rust.

4. Entramos al primer proyecto : `cd 00-hola-mundo`

5. Instalamos las dependencias : ` npm install`

6. Inicializamos el proyecto : `npm run dev`

7. Y ya lo podemos ver:
```
  VITE v4.0.4  ready in 496 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```


### La estructura del proyecto inicial

```
>node_modules
>public
> src
  > assets
        react.svg
  App.css
  App.jsx
  index.css
  main.jsx
.gitignore
index.html
package-lock.json
package.json
vite.config.js
```

-> **.gitignore** ignora los archivos que no queremos que se suban al repositorio de GitHub


-> **index.html** es el HTMl que va a renderizar la aplicación. Lo más importante es `<div id="root"></div>` y el ` <script type="module" src="/src/main.jsx"></script>` que carga el **main.js**

-> **main.js** es el puerto de entrada de toda la aplicación. Es super importante. ¿Y qué hay dentro?

-Se importa: **react**, **ReactDOM**(/client), **App** (el componente padre de todos) y el archivo **index.CSS** para que se apliquen los estilos.

-Se crea el Root y el elemento donde se renderiza la aplicación  con el **id="root"**.

-Se usa el **modo estricto**

-Se renderiza el componente `<App />`

```JavaScript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```


-> **package.json** con las dependencias y las dependencias de desarrollo.

-> **vite.config.js** la configuración que hizo Vite para poder compilar todo el proyecto.

---

## :star2: Hacemos la primer práctica con React

-> Desde la base que nos arma Vite vamos a ir modificando , sacando lo que no necesitamos. Nos quedamos solo con **main.jsx**.

-> Vamos a crear **el primer componente**, una función que crea el elemento **button**.

![image](https://user-images.githubusercontent.com/72580574/212747648-7244fcc7-475e-4ab6-a616-6848a6c6c65a.png)


Hacemos una **card** de twitter, encerrada en un `<article>`, con una `<img>` y un `<div>` con el nombre y un `<aside>` con el botón de seguir.

Le agregamos estilos...

... para agregar **estilos en linea** hay que agregar el **style** como prop y pasarle un **objeto** por lo que usamos {}, y como usamos JavaScript dentro otras {}, la diferencia es que usamos camelCase para los atributos, entonces background-color pasa a ser backgroundColor. Y se separa con **,** en vez de con punto y coma.

```JSX
<article style={{ display: "flex", alignItems: "center"}} > </<article>
```

... le podemos dar los estilos en CSS normal, guardandolos en un archivo **.css** y solo hay que **importarlo** en el archivo **.jsx\***. Como el JSX se pasa a JavaScript, como class es palabra reservada de JavaScript utilizamos **className**

... utilizar **CSS modules**

... Tailwind

...styled-components

-> Todas son tecnologías **Agnósticas** a React. No hay una mejor que otra, se utiliza bastante Tailwind. Pero también hay componentes ya armados como **Chakra UI** o **Material UI**.

---

-> Pasamos de tener todo en App.js, a separarlo en el **primer componente**.

En vez de utilizar :

```JSX
<React.Fragment>
</React.Fragment>
```

Utilizamos:

```JSX
<>
</>
```

-> Cuando no se pasa una prop, y se trata de acceder a ella, se tiene un **undefined**(un **falsy**) por eso en vez de psar:

```JSX
<TwitterFollowCard isFollowing={true} />
<TwitterFollowCard isFollowing={false} />
<TwitterFollowCard isFollowing />
```

De este modo **por defecto** es **true**(asi no tengo undefined):

```JSX
<TwitterFollowCard isFollowing />
<TwitterFollowCard isFollowing={false} />
<TwitterFollowCard isFollowing />
```

-> Como **props** se pueden pasar **variables**, **funciones**(para que el hijo cambie de estado, haga fetching de datos, etc) y **elementos**(por ejemplo **objects** o elementos JSX-XML y JS-)

Hay que recordar que en JavaScriot las funciones son **de primera clase** (se pueden pasar como parámetros)

-> :book: ¿ Cuál es la diferencia entre **componente** y **elemento**?

Un componente es una factoria de elementos. Es una **función** que al ejecutarla devuelve un **elemento**

Los **componentes** crean **elementos** y **react** renderiza el **elemento**.

-> :book: Cuando se pasan **props** deben ser **inmutables**, porque siempre debe haber **una única fuente de verdad**

-> :book: Lo que envuelve tiene dentro **children**, se puede usar también como **prop**, en children se puede renderizar un texto, una imagen, otro componente, un String, etc. Solo hay **un children**, que es **el elemento que envuelve a los demas**(hay uno solo con cuantos elementos adentros necesites).

-> :book: Para pasar todas las \*props** se puede usar el **rest operator** con las **...\*\*\*, pero es mala práctica a veces se envía información que no es necesaria, el componente se vuelve a re renderizar sin necesidad y es más complejo entender qué información se recibe en el componente. Es mejor ser declarativo, y nombrar las props.

-> :book: **state** con **useState** podemos guardar un valor inicial del estado.

---

## :star2: Para practicar se arma el juego del Ta-Te-Ti (tres en raya)

---
