# :star: Clase 6 - Creación de un React Router desde cero

---

**7mo proyecto: Creación de un React Router desde cero**

- 1 - Crea una forma de hacer SPA

- 2 - Poder navegar entre páginas con el botón de atrás

- 3 - Crear componente `<Link />` para hacerlo declarativo

- 4 - Crear componente `<Router />` para hacerlo más declarativo

- 5 - Soportar ruta por defecto (404)

- 6 - Soportar rutas con parámetros

- 7 - Componente `<Route />` para hacerlo declarativo

- 8 - Lazy Loading de rutas

- 9 - Testing

- 10 - Publicar el paquete en NPM

---

## SPA(Single Page Application)

La forma más sencilla es utilizando **window.location.pathname**, creo dos componentes para cada una de las páginas y las renderizo acorde a lo que muestro en el path de la URL.

De este modo en vez de ser **SPA** es una **MPA**(Multiple Page Application), ya que se recarga toda la página a medida que cambio de URL.

```JSX
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <main>
      {currentPath === "/" && <HomePage />}
      {currentPath === "/about" && <AboutPage />}
    </main>
  );
}
```

## :star: 1 - Crea una forma de hacer SPA (Single Page Applications)

- Ahora si lo transformamos en **SPA**:

App.jsx:

```JSX
const NAVIGATION_EVENT = 'pushState'

export function navigate(href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(NAVIGATION_EVENT)
  window.dispatchEvent(navigationEvent)

}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(NAVIGATION_EVENT, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange)
    }
  }, [])
```

Uso el **navigate** en las páginas:

HomePage.jsx

```JSX
import { navigate } from "../App";

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>This is a page to create a React Router from scratch.</p>
      <button onClick={() => navigate("/about")}>About</button>
    </>
  );
}
```

---

## :star: 2 - Poder navegar entre páginas con el botón de atrás

- Todavía no funciona esto, lo que pasa es que en el **useEffect** estamso escuchando la nabegación cuando vamos **hacia adelante**, pero **no escuchamos la navegación cuando vamos hacia atrás**

- **App.js**:

```JSX
useEffect(() => {
  const onLocationChange = () => {
    setCurrentPath(window.location.pathname)
  }
  window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
  window.addEventListener(EVENTS.POPSTATE, onLocationChange)

  return () => {
    window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
  }
}, [])
```

- **const.js**:

```JSX
export const EVENTS = {
  PUSHSTATE: "pushstate",
  POPSTATE: "popstate"
}
```

---

## :star: 3 - Crear componente `<Link />` para hacerlo declarativo

- Cuando hay un botón es **un problema de accesibilidad**, al hacerle click no tengo opción de abrir una nueva pestaña y otras cosas. **NO HAY QUE USAR UN BOTON PARA HACER NAVEGACIONES HAY QUE USAR ANCHOR**.

-> si hay que **ir a un sitio** si o si debe ser un `<a>`, visualmente se puede hacer que parezca un `**botón**. Un anchor es **navegar a un sitio**.

-> Si se va a **hacer algo**(como abrir un modal, dar me gusta) ahi si utilizo un `<button>`. Un botón es **hacer algo**

- **Link.jsx**:

```JSX
import { navigate } from "../../utils/navigation";

const Link = ({ target, to, ...props }) => {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0 // primary click
    const isModifiedEvent = event.metaKey || event.altKey ||event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === "_self"

    if(isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to); // navigation with SPA
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
};

export default Link;
```

- `event.button === 0 ` es el boton principal, si uno es diestro es cuando se hace click derecho del mouse y si uno es zurdo y lo cambia en la configuración, es al hacer click en el boton izquierdo del mouse.

-> De este modo si hacemos alt+click, ctrl+click, shift+key se nos va a abrir la pagina en una nueva pestaña o se abrira una nueva ventana.

-> Al hacer en **onClick** ahi solo se escucha el boton principal del mouse.

---

## :star: 4 - Crear componente `<Router />` para hacerlo más declarativo

- Todavía las rutas las manejamos con renderizado condicional:

```JSX
{currentPath === "/" && <HomePage />}
{currentPath === "/about" && <AboutPage />}
```

- Nos creamos un array de objetos, donde van a estar las rutas:

```JSX
const routes = [
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/about",
    Component: AboutPage
  }
]
```

Y toda la lógica para las rutas que teniamos dentro de App va a ir dentro del nuevo componente `<Router>`, que va a recibir como parametros:
`{routes = [], defaultComponent: DefaultComponent = () => null}`, las  **routes** es este nuevo array con las rutas.

Y para saber qué pagina debe renderizar:

```JSX
const Page = routes.find(({path}) => path === currenPath)?.Component
  return Page? <Page />: < DefaultComponent/>
```

- App.js:

```JSX
function App() {

  return (
    <main>
      <Router routes={routes} />
    </main>
  );
}
```

-> Me creo la carpeta **router**:

- con **routes.js** que tiene el array de las rutas:

```JavaScript
import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage";

export const routes = [
  {
    path: "/",
    Component: HomePage
  },
  {
    path: "/about",
    Component: AboutPage
  }
]
```

- **Router.jsx** y el compoennte:

```JSX
import { useState, useEffect } from "react";
import { EVENTS } from "../utils/const";

const Router = ({routes = [], defaultComponent: DefaultComponent = () => null}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const Page = routes.find(({path}) => path === currentPath)?.Component

  return Page? <Page />: < DefaultComponent/>
} 

export default Router;
```

Para poder renderizarlo en **App.jsx**

---

## :star: 5 - Soportar ruta por defecto (404)

---

## :star: 6 - Soportar rutas con parámetros

---

## :star: 7 - Componente `<Route />` para hacerlo declarativo

---

## :star: 8 - Lazy Loading de rutas

---

## :star: 9 - Testing

---

## :star: 10 - Publicar el paquete en NPM

---
