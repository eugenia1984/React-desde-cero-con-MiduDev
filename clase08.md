# :star: CLASE 08 - React + TypeScript + ChatGPT

---

## :star: 9no Proyecto: Crear un Google Translate con ChatGPT y TypeScript

---

- 1 - Creamos el proyecto con: `npm create vite@latest 09-code-editor` Y despues elegir: `React` y `TypeScript + SWC` . Listo, se creo, luego: `cd 09-code-editor`, `npm install` y `npm run dev`.

- 2 - Instalamos todas las dependencias que necesitaremos:

**ESLinter**: `npx eslint --init` y luego: ` To check syntax, find problems, and enforce code style`, `JavaScript modules (import/export)`, `React`, `Does your project use TypeScript? -> Yes` , `Where does your code run? -> Browser`, `Use a popular style guide` -> ` Standard: https://github.com/standard/eslint-config-standard-with-typescript`, ` What format do you want your config file to be in? -> JavaScript`. Y lo instalo ahora con `npm`

Y necesitamos agregar en **.eslintrc.cjs** en `parserOptions` agregar: ` proyect: './tsconfig.json'` asi ve el archivo que tiene la configuración de TypeScript. Y en `rules` agregar: `'@typescript-eslint/explicit-function-return-type': 'off'` y `'react/eact-in-jsx-scope': 'off'`

**React Bootstrap**: [Web: https://react-bootstrap.github.io/](https://react-bootstrap.github.io/). Entonces en consola: `npm install react-bootstrap bootstrap -E`. En **pakage.json** en `dependencies` ya veo:

```
"bootstrap": "5.2.3",
"react-bootstrap": "2.7.2",
```

También debemo importar los estilos en el proyecto, en **App.tsx**: `import 'bootstrap/dist/css/bootstrap.min.css';`

- 3 - Empezamos con el proyecto, creando el **initialState** y vamos a utilizar un **hook useReducer** que recibe dos parámetros...

... **state**

... **action** -> **reducer**, cada vez que se llama a la acción, se despacha. El Reducer lo recibe y genera un nuevo state.

![image](https://user-images.githubusercontent.com/72580574/231193699-1bd15ea9-4696-4b9c-9060-be8bc9ac896e.png)

Un ejemplo de dispatch es: ++setLanguage\*\*, para que actualice el lenguaje.

![image](https://user-images.githubusercontent.com/72580574/231193958-e798f5c4-8864-4106-90ef-4e9c273714c3.png)

-> PASO 1 : crear el estado inicial

-> PASO 2: crear el reducer: `function reducer (state, action) {}`

-> PASO 3: hook useReducer: `const [state, dispatch] = useReducer(reducer, initialState)` y empezamos con la primer accion que es la de invertir el orden de los lenguajes. Hacemos le caso para cambiar el lenguaje. Si el type cumple la condicion dle if lo que hago es retornar el nuevo estado que uso el spread (...)del state, y sobrrescribo lo que debo modificar en el nuevo estado.

(Todo esto Midu lo hace con IF pero puede ser también con SWITCH)

**Un reducer siempre debe devolver un NUEVO ESTADO**

**payload** -> lo que se envia de informacion, la acción para poder actualizar el estado

-> Como usamos TS me creo el **types.d.ts** para hacer la interface del State.

-> Para las actions, cada uno tiene un type distinto y esperara un payload distinto.

```TypeScript
export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: string }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: string }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
```

- Hago una prueba con un boton para apsar el lenguaje a español:

![image](https://user-images.githubusercontent.com/72580574/231209383-29a619cd-b067-4aac-a84b-7066353d0ffd.png)

- Empieza en **auto**:

![image](https://user-images.githubusercontent.com/72580574/231209537-d5aeea10-b100-4a4d-8259-a44bdddc4d43.png)

- Y pasa a **es** de español:

![image](https://user-images.githubusercontent.com/72580574/231209709-4c46e266-4ef9-4beb-914e-d6d09e0fa083.png)

- Para que App no quede tan cargada hacemos un custom hook: **hooks** /**useStore.ts**

-> SUPER IMPORTANTE: **que no esten los dispatch** por la aplicación, por eso armo:

`const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' })` y lo retorno

Y asi con cada una de las acciones que tengo, asi no retorno dispatch.

- Y ahora App directamente uso el setFromLanguage y paso 'es', queda mas legible el componente, y abstraigo toda la logica dle reducer.

![image](https://user-images.githubusercontent.com/72580574/231214895-f7ef09a3-0cbf-43e3-9ba4-766a1eb044c6.png)

Necesitamos ajustar que el payload no sea solo **String** porque sino en vez de pasarle 'es' le paso cualquier caracter y me lo toma, pero yo necesito ciertos caracteres para cada lenguaje.

Me creo **constants.ts**:

```TypeScript
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Spanish',
  de: 'Deutsch'
}

export const AUTO_LANGUAGE = 'auto'
```

Y esto lo aplico en **types.d.ts**: `export type Language = keyof typeof SUPPORTED_LANGUAGES` , `export type AutoLanguage = typeof AUTO_LANGUAGE` y `export type FromLanguage = Language | AutoLanguage // because we have the option to detect language`.

De este modo vamos a tipar el tipo string de lenguaje, y asi ajustamos los lenguajes.

-> PASO 4: Creo los componentes `<LanguageSelector/>` y `<TextArea/>` para armar la parte del ``select` para elegir el idioma de entrada y salida y el `teextarea` para el texto a traducir.

---

## CHAT GPT

En realidad esto debería manejarlo el BackEnd, pero... como nos enfocamos en React + TS, lo hacemos con Chat GPT, en el cliente.

- Intalamos: `npm install openai -E`

- Creamos **Services** / **translate.ts** y el archivo **.env** para poner la API key desde [https://platform.openai.com/](https://platform.openai.com/)

---

`if (result == null) return` -> En TS es mejor aca tener `==` por el **undefined**, asi me aseguro que ni es **null** ni es **undefined**. Es para simplificarnos y no tener que poner: `if (result === null || result === undefined) return`

---

## custom hook con debounce para que la busqueda de la traducción se realice al terminar de escribir


debounce -> un valor que espera cierto tiempo antes de ser cambiado.

Asi no estamos haciendo el llamdo a la APi por cada letra que ingresa el usuario.

-> Usando **generics**:

```TypeScript
export function useDebounce<T> (value: T, delay = 500) {
  const [debouncedValue, setDebounceValue] = useState(value)
}

useDebounce<string>('Hello', 300)
```
---