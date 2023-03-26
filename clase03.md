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

Dentro del **useEffect**:

```JSX
// FETCH PARA EL TEXTO
fetch(CAT_ENDPOINT_RANDOM_FACT)
  .then((res) => res.json())
  .then((data) => {
    const { fact } = data;
    setFact(fact);
    // Si nos piden las 3 primeras palabras
    // const threeFirstWord = fact.split(' ').slice(0,3).join(' ');
    // una forma mas corta
    const threeFirstWord = fact.split(" ", 3).join(" ");
    // FETCH PARA LA IMAGEN
    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(url)
      });
  });
```

Para demostrar que sabemos utiliar bien el **useEffect** es mejor tener **2 useEffect**

- Es buena práctica que **cada useEffect tenga UNA SOLA RESPONSABILIDAD**.

```JSX
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
        setLoadingTxt(false);
      });
  }, []);

  // Efecto para recuperar la imagen cada vez que tenemos uan cita nueva
  useEffect(() => {
    if (!fact) return;

    // Si piden la primer palabra: const firstWord = fact.split(" ")[0];
    // Si nos piden las 3 primeras palabras: const threeFirstWord = fact.split(' ').slice(0,3).join(' '). Otra forma mas corta
    const threeFirstWord = fact.split(" ", 3).join(" ");
    fetch(
      `https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setLoadingImg(false);
        setImageUrl(url);
      });
  }, [fact]);
```

- Es buena práctica el **manejo de errores**, por lo que me voy a crear estados para los mismos.

```JSX
 const [factError, setFactError] = useState("");

 useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        // Handle error if !res.ok
        if (!res.ok) {
          setFactError("No se ha podido recuperar la cita");
        }
        return res.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
        setLoadingTxt(false);
      });
  }, []);

```

---

## En las prueba técnicas siempre piden agregar un botón

Entonces vamos a agregar un botón.

Y de paso vamos a separar la lógica de traer los datos en una nueva carpeta **Services** en el archivo **facts.js**:

```JavaScript
const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

// Con RES - THEN
/*
export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT) // -> Promise
  .then((res) => res.json()) // -> Promise
  .then((data) => { // -> resuelvo la promesa
    const { fact } = data;
    return fact;
  });
};
*/

// Con ASYNC - AWAIT
export const getRandomFact = async () => {
  const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  const data = await res.json() // Handle error if !res.ok
  const { fact } = data;
  return fact;
};
```

- Lo que NO debemos hacer es enviar **estados**, el **setFact** deberá setearse en App.jsx.

---

## :star: CUSTOM HOOK

Podemos crear nuestro propio hook, dentro va a tener los hooks de React.

Para reutilizar lógica de nuestros componentes en otros componentes.

-> Vamos a extraer toda la lógica de la imagen.

- Debe ser una función que comience con **use**, asi React sabe que es un custom hook.

- No puede estar dentro de un IF

- No puede estar dentro de un WHILE

- Siempre debe ser lalmado dentro del cuerpo del componente

- Dentro puede tener los hooks de React como : useState, useEffect, etc.

- No se le puede dar el nombre de que diga que hace, ya que lo de adentro puede cambiar, son como una **caja negra**.

-> Lo guardo dentro de una nueva carpeta llamada **hooks** en el archivo **useCatImage.js**(no son JSX, porque son una función, no van a retornar un componente). Y creo otro custom hook(**useCatFact**)

-> Si vamos a nuestro componente lo vemos más despejado, sin useEffect, siempre preguntarse **¿Puedo separar el useEffect a un custom hook?**

#### ¿Por que pasamos el fact como objeto?

Queremos que las funciones esten preparadas para ser extensivas, entonces si a futuro si además de pasar el fact le paso nuevos parámetros, lo puedo agregar en el objeto.

---

## Preguntas típicas

Si tuvieramos un poco más de tiempo ¿a quué te dedicarías?

Haría más features:

- handle de errores

- testing

---

## ⭐ Testing (PlayWright)

Midu usa **PlayWright**, que es una especia de Cypress.

Lo instalamos por consola:

```
npm init playwright@latest
```

```
Need to install the following packages:
  create-playwright@latest
Ok to proceed? (y)
```

Para inicializar el proyecto nos hace consultas:

```
- Do you want to use TypeScript or JavaScript?  JavaScript
- Where do you put your end-to-end tests? test
- Add a GitHub Actions workflows? (y/N) false
- Install Palywright browsers (Y/n) true
```

-> Y se me comienza a instalar

Si se instaló bien:

```
✔ Success! Created a Playwright Test project at C:\Users\juan\Desktop\react_con_midudev\projects\04-react-prueba-tecnica

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.js - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.js - Demo Todo App end-to-end tests
  - .\playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭
```

-> Al menos hacer un solo test, el más importante, el **end to end**, para asegurarme que al menos **tenemos un texto** y **sale una imagen**.


```JavaScript
// @ts-check
const { test, expect } = require("@playwright/test");

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
const LOCAL_HOST_URL = "http://127.0.0.1:5173/";

test("app shows random fact and image", async ({ page }) => {
  await page.goto(LOCAL_HOST_URL);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("src");

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
});
```

Por consola: ```npx playwright test ```

-> Da error, en **playwrightconfig tengo que cambiar la extension a **cjs**

Y cambiamos en **Example.spec.js**::

```JavaScript
const { test, expect } = require("@playwright/test");
```

Para el **import**:

```JavaScript
import { test, expect } from "@playwright/test";
```

-> Me dio OK:

```
Running 1 test using 1 worker

  ✓  1 tests\example.spec.js:7:1 › app shows random fact and image (3.3s)

  1 passed (5.2s)
```

---

## ⭐ Manejo de estados

Usamos **useState** y **useEffect**, junto a los **customHooks**

---
