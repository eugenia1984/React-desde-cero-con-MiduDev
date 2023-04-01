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

-> **useRef** es una referencia que persiste a un valor que puede cambiar.

![image](https://user-images.githubusercontent.com/72580574/229224362-1db86bd7-7a16-4e87-bce8-8a7c9007b075.png)

---

## :computer: Creamos el repositorio con Vite

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

-> Forma **CONTROLADA** de form es **manejandolo con React** a través de algún estado. Pero a veces conviene utilizar el controlado

-> Forma **NO CONTROLADA** de un form, es manejandolo sin React. Midu recomienda este modo, es más fácil, más óptimo, da menos problemas

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

4. En el boton de busqueda primero agrego un **onClick** con el **handleSubmit**, pero luego para mejorarlo, al ser un formulario ya el boton tiene **type=submit**, asi que borro en onClick. Y agrego: `<form className="form" onSubmit={handleSubmit}>`:

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

-> El **setQuery** cambia cada vez que cambia el **input**, por lo que agrego un **onClick={handleChange}** y agrego **value={query}\*\*, en el input.

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

-> Si hay error lo muestro.

-> Si hay un **useEffect** en el componente debe ser un **customHook** y debe tener dentro un hook minimo como el useEffect, y también el **useState**.

---

-> Hasta ahora **el formulario funcione**, nos falta hacer el **fetching de datos**.

---

## :star:  Grid responsive

```CSS
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}
```

La clase **main** debe tener un **width** del **100%**:

```CSS
main {
  display: flex;
  justify-content: center;
  width: 100%;
}
```

En el contenedor: _display:grid_, que ocupe todo el ancho(_100%_) y utilizar el **grid-template-column** para decirle que debe **repetirse**, utilizando el **auto-fit** ó **auto-fill**

```CSS
.movies {
  list-style: none;
  margin: 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

Alineo el texto al centro y doy un borde redondead a la imagen, para cada pelicula:

```CSS
.movie {
  text-align: center;
}

.movie img {
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;
}
```

---

## :tv: Fetching de peliculas

En el **custom hook** _useMovies_ creamos el estado **responseMovies** que va a inicializarse como un array vacio (aca voy a guardar mi lista de peliculas a renderizar).

Y me creo la función **getMovies** para hacer el fetch. Dentro con el considcionald e **si tenemos search** entonces _setResponseMovies(withResults)_ y si no tenemos search entonces _setResponseMovies(withoutResults)_. El **Search** lo va a recibir como parametro.

Y ahora lo usamos en **App**:

```JSX
 const { search, setSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };
```

Ahora en **getMovies** cambio *setResponseMovies(withResults);* por el **fetch** de datos.

siempre tengo que confiar en las **herramientas de desarrollo**:

![image](https://user-images.githubusercontent.com/72580574/229307584-b9635e6a-67d2-4a60-a14d-10b73e328af5.png)

- En **general** la **URL** que solicitamos.


Puedo corroborar los **parametros** de mi **query**:


<img src="https://user-images.githubusercontent.com/72580574/229307609-c32d5d87-458b-4cc4-a2cb-dac41fcd338e.png" alt="parametros del query" width="630">

Y que de devuelve mi fetching:

<img src="https://user-images.githubusercontent.com/72580574/229307641-fa115705-807e-443c-9011-5b9e9abfee99.png" alt="response del fecth" width="630">

En **response** lo veo todo en un solo renglón, pero por ejemplo si pse mal la APPI key, aca voy a ver la respuesta y me va a avisar lo dle API key.


<img src="https://user-images.githubusercontent.com/72580574/229307660-2af173a0-c9bf-44fa-a4c8-4ad97710bfa1.png" alt="response del fecth" width="630">


- Tal vez en la prueba técnica no te da tiempo, pero todo el **fetching de datos** es mejor tenerlo en un **service**, me creo la carpeta y el arcivo **movies.js** con la funcion **searchMovies**

Algo super importante **NO LE PASAMOS EL ESTADO** lo que hacemos es **DEVOLVER EL FETCHING DE DATOS**.

Y hacemos unas validaciones:

`if(search === '') return null` -> ni siquiera hacemos el fetching de datos

Y me traigo la logica del mapeo de datos del customHook.

-> Mejoro mi custom hook **useMovies** con un **try-catch-finally** y agrego los estados de **loading** y **error** para usarlos en mi App.


---

### :book: useMemo

### :book: useCallback

---

### ⭐ ¿Cómo manejar formularios (manera controlada y no controlada)?

---

### ⭐ Hacer debounce

---
