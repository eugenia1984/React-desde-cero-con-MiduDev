# :stars: CLASE 3 :stars:

---

## ⭐ Prueba técnica de React para Juniors React + TypeScript (Día 01): props y state)

- **Consigna de un chico de la comunidad**: te dan una API y debés renderizar en pantalla: nombre, apellido e imagen. Para hacer un fetching de datos.

Y luego tomar los usuarios de la API y solo mostrar los primeros 25, e ir cargando el resto a medida que voy scrolleando. -> Se usa el **interception observer** suscrito en un useEffect para que cuando llegue al final cambia el estado .

Si se puede usar una librería se usarìa también un **useNearScreen**

- **Consigna de la que vamos a hacer**:

APIS:

-Facts random: [https://catfact.ninja/fact](https://catfact.ninja/fact)

-Image random: [https://cataas.com/cat/says/hello](https://cataas.com/cat/says/hello)

Recuperar un hecho de gatos de la primera API y muestra una imagen de un gato con la primera palabra del hecho recuperado usando la segunda API.

-> Peparase para un life coding.

-> La trampa: hay dos estados y uno depende del otro.

-> ¿Y qué es lo primero que harías al finalizar la aplicación? Aplicar un **Test End to End**.

### ¿Cómo empezamos ?

-> Como dan la libertad de empezar el proyecto con lo que queras, podés usar Vite -> `npm create vite@latest`, le doy el nombre `react-prueba-tecnica`, elijo el Framework: `React`, pero hay empresas que quieren ver como inicializas un proyecto, por lo que hay que elegir: `Vanilla` para ver como **creamos el punto de entrada**. Luego la variante: `JavaScript`.

-> En este paso agregamos un **pluggin**, primero me posiciono dentro de la carpeta de mi proyecto y luego: `npm install @vitejs/plugin-react -E`, porque igualmente vamos a tener que agregar la configuración.

-> Ahora ya tenemos el **proyecto iniciado** y si vamos al **package.json** no tenemos React:

```
"dependencies": {
    "@vitejs/plugin-react": "3.1.0"
  }
```

- Debemos instalar las dependencias: **react** y **react-dom**:

`npm install react react-dom -E`

Y ahora en el **package.json**:

```
"dependencies": {
    "@vitejs/plugin-react": "3.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
```

react-dom -> los binding con el navegador

react -> la biblioteca de React, con el useState, useEffect, etc.

- Creamos la **configuración de vite**, como dejan googlear se puede buscar, pero básicamente es en la carpeta raiz crear **vite.config.js**:

```JavaScript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

- Desde el **index.html** veo que se carga **main.js**:

1. Importo: **createRoot**

2. Con document busco el elemento by **id**, veo en el index-html que tengo el **div** con id=**root** que es donde se va a renderizar mi aplicación de React. Ycon el método **Render** muestro un Hola.

3. Pero si en este momento hago un `npm run dev` veo mensaje por consola, porque **no está activada al sintaxis de JSX**. Entonces el archivo main.js debería ser main.jsx y además hay que modificarlo en el index.html

4. **PRO TIP** -> Siempre si o si instalar **Linter**: `npm install standard -D` y en el package.json agrego :

```
 "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
```

- Me creo la carpeta **src** y dentro **App.jsx**, para que se vea que se renderiza pongo al menos un mensaje:

```JSX
export function App () {
  return (
    <div>App de gatitos</div>
  )
}
```

Y para que se vea la importo en main.jsx `import { App } from './src/App'` y debo renderizar el componente: `<App />`

-> **PRO TIP** es muy importante que mientras vayas trabajando se vea algo, asi solo este el mensaje de hola, que se vea el VSC y tambien la aplicaicón en un navegador ya corriendo.

### Separamos la prueba técnica en partes

-> Primero que todo...

... Leo la consigna, la interpreto bien

... Veo por el navegador las dos API para saber que me devuelven y que necesito, porque a veces nos dan una documentación y nos dicen buscar algún endpoint determinado. Por ejemplo para la de las imagenes, suponemos nos dan [https://cataas.com/#/](https://cataas.com/#/) y veo que puedo ver el JSON [https://cataas.com/cat?json=true](https://cataas.com/cat?json=true) y tengo los parametros a pasarle. Y encontré:

**/cat/:tag/says/:text** -> Will return a random cat with a :tag and saying :text

Si le doy click al boton me abre un ejemplo: [https://cataas.com/cat/cute/says/hello](https://cataas.com/cat/cute/says/hello), entonces en **hello** voy a pasar mi primer palabra

Entonces mi URL para mostrar la primer palabra es: `https://cataas.com/cat/cute/says/${firstWord}`

Y si quieor una más completa: `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true` t esta la puedo usar como **constante** del **ENDPOINT** de la **imagen** en mi fetching de data.

1. Recuperar un hecho de gatos de la primera API

- Para luego mostrar ese hecho, me desestructuro la consante **fact** con su actualizacion **setFact** con **useState** inicializdo con algún String

- Muestro en el componente App.jsx esa variable **Fact**.

- Luego con el fetch de datos voy a mostrar el hecho de la API.

- No puedo hacer el fetch dentro de App.jsx, porque sino cada vez que se renderiza App estoy haciendo el fetch y creo un loop infinito. -> usamos **useEffect** asi se usa la primera vez que se monta(por lo que pongo el **array de dependencia vacío** -SI O SI, sino hay **infinitive loop**). Empezarlo asi: `useEffect(()=> {}, [])`, asi no nos lo olvidamos

- Para hacer el fetch, no usar axios ni otro libreria:

```JSX
useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(res => res.json())
      .then(data => setFact(data.fact))
      .catch(err => console.log(err))
  }, [])
```

-> De este modo demostramos que tenemos las bases de JavaScript y no nos saltamos pasos.

-> **https://catfact.ninja/fact** es mejor guardarlo en variable

-> Para mostrar que sabemos de **Renderizado condicional**: `{fact && <p>{fact}</p>}`

-> Si piden async-await, aclaro que NO se puede en el useEffect, porque el efecto siempre debe ser una FUNCIÓN SÍNCRONA. Lo que si se puede hacer es ENVOLVERLO:

```JSX
useEffect(() => {
  async function getRandomFact () {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    const json = await res.json()
    setFact(fact)
  }

  getRandomFact()
}, [])
```

-> NUNCA hacer el FETCH fuera del USEEFFECT.

2. Recuperar la primera palabra del hecho

Para eso modifico un poco mi useEffect, para poder recordar debo si o si saber usar **split()** que me permite partir una String con el separador que le pase, en este caso va a ser el espacio vacio, asi me separa por cada palabra, y nos devuelve un **array**:

```JSX
const firstWord = fact.split(' ')[0]
```

-> Si nos piden **las 3 primeras palabras**:

```JSX
const firstWord = fact.split(' ')[0].slice(0, 3).join('')
```

Con el slice tomo las primeras 3 palabras

Pero como tego un array en vez de un string debo usar el **join()**

**PRO TIP** el split tiene un segundo parametro para decirle con cuantos quedarnos, por lo que no necesito usar el .slice():

```JSX
const firstWord = fact.split(' ', 3)[0].join('')
```

**PRO TIP** si no me lo acordaría, para buscar en Google: **mdn separate string by token** asi busca en la documentación de Mozilla para Desarrolladores, si lo quiero buscar en español: **mdn separar string por separador**. NUNCA BUSCAR LA SOLUCION, por ejemplo no buscar: get first word in string javascript, no terminar en StackOverflow.

3. Muestra una imagen de un gato con la primera palabra

- Como ya tengo la primer palabra hago el fetch de datos con ella.

---

## ⭐ Fetching de datos

## ⭐ Testing

## ⭐ Manejo de estados

---
