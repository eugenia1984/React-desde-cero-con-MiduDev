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

## :computer:  Creamos el repositorio con Vite

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

## :computer: Empezamos el proyecto

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

-> Utilizo mi mock y hago un map del Search si el array tiene al menos un elemento y renderizo los datos.

- Hasta el momento ya tenemos la interfaz, ahora nos falta darle la funcionalidad para poder hacer la búsqueda.

- Mejoramos el código...

... pasamos a un componente la parte de renderizar la lista de peliculas o el mensaje de ue no se encontraron peliculas. Y a su vez la lista y el mensaje tambien son componentes.

... creamos el custom hook **useMovie** para transformar las key que nos vienen desde la APi en un nuevo objeto movie, asi a futuro si la APi cambia algo lo cambio solo ahi y listo, no tengo que ir componente por componente a cambiarlo.

---

### ⭐ React Hooks: useRef, useMemo, useCallback

### :book: useRef

-> explicacion mala -> Te permite crear una referencia a un elemento del DOM

-> explicación completa -> **useRef** es un **hook** que te permite crear una **referencia, mutable** que **persiste** durante todo el **ciclo de vida** de tu componente(su valor no es reiniciado). Es muy útil para **guardar cualquier valor** que puedas **mutar** (como un identificador, un elemento del DOM, un contador) y **cada vez que cambia no vuelve a renderizar el componente**.

-> cada vez que cambia no vuelve a renderizar el componente -> es lo que lo hace diferente al **useState**, porque en el useState cada vez que cambia el estado se vuelve a renderizar el componente.

-> También es útil para **guardar referencia de un evento del DOM**, porque obtiene una vez el elemento, y siempre que lo queramos utilizar lo podemos hacer.

- Vamos a utilizarlo para guardar una referencia del DOM.

1. Lo importo: 
```JSX
import { useRef } from "react";
```

2. Lo declaro: 
```JSX 
const inputRef = useRef();
```

3. Lo relaciono con mi input: 
```JSX
<input ref={inputRef} placeholder="Avengers, Star Wars, The Matrix..." />
```

4. En el boton de busqueda primero agrego un **onClick** con el  **handleSubmit**, pero luego para mejorarlo, al ser un formulario ya el boton tiene **type=submit**, asi que borro en onClick. Y agrego: `<form className="form" onSubmit={handleSubmit}>`:
```JSX
const handleSubmit = () => {
  const value = inputRef.current.value;

}
```

**current** es nativo de React, accedo al valor por medio de current, ya que al ser un **objeto** puede mutar el valor. 

Paso a paso sería:

```JSX
const handleSubmit = () => {
  const inputElement = inputRef.current;
  const value = inputElement.value;
}
```

- Otro modo de obtener el valor es, sin usar el useRef, agrego un **name** al input:
```JSX
<input
  name="query"
  placeholder="Avengers, Star Wars, The Matrix..."
/>
```

Y:
```JSX
const handleSubmit = (event) => {
  event.preventDefault();
  const fields = new window.FormData(event.target);
  const query = fields.get("query");
  console.log(query);
};
```


-> Es usando **JavaScript** vanilla, sin depender de React:

```JSX
const handleSubmit = (event) => {
  event.preventDefault();
  const query = Object.fromEntries(new window.FormData(event.target));
  
  if(query === '') {
    setError("No se ingreso ninguna pelicula")
  }
};
```

De este modo en **fields** se me crea un objeto con key el input name y en el value el valor, y asi tenga muchos input, se me van a guardar todos.

Y además puedo hacer validaciones, por ejemplo si viene vacio seteo un error.

- Estamos **gestionando el formulario de forma descontrolada**(no controlada), lo hacemos a través del DOM. Ya sea leer la información a través dle evento o con el useRef.

- También se puede utilizar **de forma controlada**, React va a tener un **Estado** con el **control** del formulario, para determinar que se valida, cuando, etc.

-> Me creo el estado:
```JSX
const [query, setQuery ] = useState('');
```

-> El *setQuery** cambia cada vez que cambia el **input**, por lo que agrego un **onClick={handleChange}** y agrego **value={query}**, en el input.

```JSX
const handleChange = (event) => {
  setQuery(event.target.value)
}
```

Como ahora el valor lo manejo en el estado, en el handleChange ya no necesito `const query = Object.fromEntries(new window.FormData(event.target));`

-> Esta es la **forma controlada**, la desventaja es que hace todo mucho mas lento porque cada vez que se actualiza el input, hay un render. La ventaja es que **simplifica la validación de formularios**.

-> Vamos a validarlo ocn un **useEffect**:

-Creo un estado para el error: `const [error, setError] = useState(null);`

-Creo el useEffect:
```JSX
useEffect(() => {
  if(query ==='') {
    setError("No se puede buscar una pelícua vacía")
    return;
  }

  if(query.match(/^⧹d+$/)) {
    setError("No se puede buscar una película con un número")
    return
  }

  if(query.length < 3 ) {
    setError("La búsqueda debe tener al menos 3 caracteres")
    return
  }

}, [query])
```

-Si hay error lo muestro.

### :book: useMemo

### :book: useCallback

---

### ⭐ ¿Cómo manejar formularios (manera controlada y no controlada)?

---

### ⭐ Hacer debounce

---