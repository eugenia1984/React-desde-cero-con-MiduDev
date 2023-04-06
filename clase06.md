# :star: Clase 6 - Creación de un React Router desde cero

---

- **7mo proyecto: Creación de un React Router desde cero**

- Crea una forma de hacer SPA (Single Page Aplications)

- Poder navegar entre páginas con el botón de atrás

- Crear componente `<Link />` para hacerlo declarativo

- Crear componente `<Router />` para hacerlo más declarativo

- Soportar ruta por defecto (404)

- Soportar rutas con parámetros

- Componente `<Route />` para hacerlo declarativo

- Lazy Loading de rutas

- Testing

- Publicar el paquete en NPM

---

## SPA(Single Page APplication)

La fomra más sencilla es utilizando **window.location.pathname**, creo dos componentes para cada una de las páginas y las renderizo acorde a lo que muestro en el path de la URL.

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
