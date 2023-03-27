# :stars: CLASE 4 :stars:

---

## ⭐Prueba tecnica para Juniors

Con **useState** y **useEffect** vas a hacer el 80% del cósigo, peor ese 20% restante marca la diferencia de que realmente se tiene un conocimiento más transversal de React.

### Consigna

-Crear una **aplicación para buscar películas**

-API a usar: [https://www.omdbapi.com/](https://www.omdbapi.com/) - API_KEY: 4287ad07

-Requerimientos:

- Necesita mostrar un input para buscar la película y un botón para buscar.

- Lista de películas encontradas y muestra el título, año y poster.

- Haz que las películas se muestren en un grid responsive.

-Primera iteración

- Evitar que se haga la misma búsqueda dos veces seguidas.

- Haz que la búsqueda se haga automáticamente al escribir.

- Evita que se haga la búsqueda coninuamente al escribir (debounce).

---

## Creamos el repositorio con Vite

**Vite** es un empaquetador de aplicaciones web, como alternativa a WebPack y a Create-React-App.

- Me situo en la carpeta de **projects**

- Inicializo un nuevo proyecto:

`npm create vite@latest` -> para inicializarlo.

`Need to install the following packages:
  create-vite@latest
Ok to proceed? (y)`
-> **y**

`? Project name: ` -> **05-react-buscador-peliculas**

`? Select a framework:` -> **React**

`? Select a variant:` -> **JavaScript + SWC** SWC es la alternativa a Babel, esa hecha con Rust

- Me situo dentro de **05-react-buscador-peliculas** e instalo con: `npm install` ò `pnpm install`(va más rápido)

- Corro el proyecto: `npm run dev`

- Lo abro en: http://127.0.0.1:5173/

- Limpiamos el proyecto, sacamos todo lo que viene pre cargado. Borro todos los estilos de index.css y App.css y usaremos [**Water.css**](https://watercss.kognise.dev/), un Framework **class less**(no utiliza clases), otro es: **Bolt.css**.

Elejimos el **automatic** y en el `<head>` hay que agregar:

`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">`

O como hizo Midu se abrio el archivo y copio todo el codigo en **index.css**.

En **App.jsx** dejo el return con un titulo "Prueba Técnica"

---

## Empezamos el proyeto

1. Necesita mostrar un input para buscar la película y un botón para buscar.

-> **input** y **boton** -> tenemos que empezar con el **form**

2. API a usar: [https://www.omdbapi.com/](https://www.omdbapi.com/) - API_KEY: 4287ad07

-> Voy a la página de la API para ver bien el endpoint que necesito.

-Send all data requests to: http://www.omdbapi.com/?apikey=[yourkey]&

-Poster API requests: http://img.omdbapi.com/?apikey=[yourkey]&

-Parametros: Voy a **By Search**

-Hago una busqueda pra ver que trae: `https://www.omdbapi.com/?apikey=4287ad07&s=Avengers`

`Search: [
  {
    Title: "The Avengers",
    Year: "2012",
    imdbID: "tt0848228",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  }
]`

-> Si tenemos le JSON FORMATTER CHROME EXTENSION se va a ver más claro el JSON


-> **Nunca usar console.log en el fetch para ver como es el objeto** siempre primero **Ver la documentacion**, hacer una busqueda, y crear un MOCK de la respuesta, con el archivo **with-results.json**.

Y también pensar en el caso de que **no tenga resultados**, me hago una busqueda con un nombre de algo que no sea una pelicula, lo pego y agrego en **mock** con nombre **no-results.json**.

Uso este mock y me lo importo en App. Se que tengo resultados cuando tengo el Search con el array.


3. Lista de películas encontradas y muestra el título, año y poster.

-> Utilizo mi mock y hago un map del Search si el array tieen al menos un elemento y renderizo los datos.

- Hasta el momento ya tenemos la interfaz, ahora nos falta darle la funcionalidad para poder hacer la búsqueda.

---

### ⭐ React Hooks: useRef, useMemo, useCallback

---

### ⭐ ¿Cómo manejar formularios (manera controlada y no controlada)?

---

### ⭐ Hacer debounce

---
