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


---

## :star: 3 - Crear componente `<Link />` para hacerlo declarativo

---

## :star: 4 - Crear componente `<Router />` para hacerlo más declarativo

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