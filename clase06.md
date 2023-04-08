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

- con **routes.js** que tiene el array de las rutas, asi cada vez que quiera crear una nueva ruta, simplemente la declaro en este array:

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

### Para que al cargar la pagina siempre este arriba de todo:


```JSX
window.scrollTo(0,0)
```

---

## :star: 5 - Soportar ruta por defecto (404)


- Creo el componente `Page404`:

```JSX
import Link from "../compnents/link/Link";

const Page404 = () => {
  return (
    <>
      <section>
        <h1>This is not fine</h1>
        <img
          src="https://www.antevenio.com/wp-content/uploads/2017/08/15-ejemplos-de-paginas-404-que-generan-engagement-1.jpg"
          alt="page not found"
        />
      </section>
      <Link to="/">Go to Home</Link>
    </>
  );
};

export default Page404;
```

Y en `<App/>` por **default** seteo la pagina de error:

```JSX
 <Router routes={routes}  defaultComponent={Page404}/>
 ```

---

## :star: 6 - Soportar rutas con parámetros

- Vamos a necesitar instalar la dependencia : **path-to-regexp**, para las **rutas dinámicas** (lo usa Express y muchas bibliotecas más)

` npm install path-to-regexp -E`

---

## :star: 7 - Componente `<Route />` para hacerlo declarativo

- Creamos el componente `<Route />`:

```JSX
const Route = ({path, Component}) => {
  return null;
};

export default Route;
```

pero en realidad toda la lógica la tiene el componente `<Routes/>` usando **Cildren** que voy a tener ahi el **path** y el **Component**


---

## :star: 8 - Lazy Loading de rutas

- importamos `{lazy}` de `"react"` para **importar** de forma **dinámica** los componentes, es decir que hata que no los necesitamos no los renderiza. Y también debemos envolverlo en `<Suspense/>` con el **fallback** que le indica que va a renderizar en las partes de la UI que al tener **azy** todavía no se renderizan.
---

## :star: 9 - Testing
  
### Usamos vitest
  
En el archivo de la configuracion de vite agregamos:
  
```
test: {
  environment: 'happy-dom'
}
```

- Router.test.js:
  
```JSX
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'
import { Link } from './Link.jsx'
import { getCurrentPath } from './utils.js'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route
          path='/' Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go to About</Link>
              </>
            )
          }}
        />
        <Route path='/about' Component={() => <h1>About</h1>} />
      </Router>
    )

    // Click on the link
    const button = screen.getByText(/Go to About/)
    fireEvent.click(button)

    const aboutTitle = await screen.findByText('About')

    // Check that the new route is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
```
  
-> Hay uan extension de VSC: **vitest** de **Zixuan Chen** que es parecido a un debugger, pero del test.
  
-> Me armo en utils :
  
```JSX
export const getCurrentPath = () => window.location.pathname
```
  
Para mockear el enrutado:
  
```JSX
  vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn()
}))
``` 
  
Y mockeamos:
  
```JSX
it('should render the component of the first route that matches', () => {
   getCurrentPath.mockReturnValue('/about')
   const routes = [
     {
       path: '/',
       Component: () => <h1>Home</h1>
     },
     {
       path: '/about',
       Component: () => <h1>About</h1>
     }
   ]

   render(<Router routes={routes} />)
   expect(screen.getByText('About')).toBeTruthy()
 ```
  
  
  
---

## :star: 10 - Publicar el paquete en NPM

---
  
## :star: Así quedó:
  
- Home page:

<img src="https://user-images.githubusercontent.com/72580574/230736863-de83c25c-7df6-40a0-beae-6875b5d812b9.png" alt="home page" width=450 style="margin-left: 20px">

- About Page:

<img src="https://user-images.githubusercontent.com/72580574/230736884-627f6dc4-c64f-4087-8c4c-0e32e3c2eb83.png" alt="about page" width=450 style="margin-left: 20px">

- Not found(404) page:

<img src="https://user-images.githubusercontent.com/72580574/230736915-dca93c1d-2089-4846-85b2-c1936eb48e65.png" alt="not founf page" width=450 style="margin-left: 20px">
  
---
