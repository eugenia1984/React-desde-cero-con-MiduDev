# :star: CLASE 7 - React + TypeScript (Día 01): props y state

---

- Utilizar TypeScript con React

---

## :star: Pryecto: TODO con React y TypeScript. Se sincroniza con un BackEnd(sin usar localStprage). Tiene animaciones.

## Passos:

- 1 - Inicializar proyecto con Vite

- 2 - Añadir linter para TypeScript + React

- 3- Añadir estilos del ToDoMVC

- 4- Listar todos los TODOs

- 5 - Poder borrar un TODO

- 6 - Marcar TODO como completado

- 7 - Añadir una forma de filtrar TODOs(Footer)

- 8 - Mostrar número de TODOs pendientes(Footer)

- Añadir forma de borrar todos los TODOs completados

- Crear Header con input (Header)

- Crear un TODO (Header)

- Poder editar el texto de un TODO (Doble click)

- Añadir animaciones con AutoAnimate

- Pasar a Reducer

- Sincronizar con el BackEnd

---

## PASO 1: Inicializar proyecto con Vite

- Creamos el proyecto con vite:

` npm create vite@latest 08-todo-app`

`? Select a framework: React`

`? Select a variant: TypeScript + SWC`

Ahora ejecutar, para entrar al proyecto, instalar las dependencias y verlo en el navegador:

```
cd 08-todo-app
npm install
npm run dev
```

---

## PASO 2: Añadir linter para TypeScript + React

`npx eslint --init` ò `npm init @eslint/config`

`Ok to proceed? (y)` -> `y`

`? How would you like to use ESLint?` -> ` To check syntax, find problems, and enforce code style`

`? What type of modules does your project use?` -> JavaScript modules (import/export)

`? Which framework does your project use? ` -> `React`

`? Does your project use TypeScript?` -> `Yes`

`? Where does your code run?` -> `Browser`

` How would you like to define a style for your project? ..` -> `> Use a popular style guide`

`? Which style guide do you want to follow? ...` -> `Standard: https://github.com/standard/eslint-config-standard-with-typescript`

`? What format do you want your config file to be in? ...` -> `JavaScript`

`? Would you like to install them now? » No / Yes` -> `Yes`

`? Which package manager do you want to use? ...`-> `npm`

- Ahora veo el archivo **.eslintrc.cjs**, y vamos a aese archivo para agregar **"proyect": "./tsconfig.json"** en:

```
"parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "proyect": "./tsconfig.json"
},
```

Y hay que agregar en \*rules\*\* para que no me pida que tenga que importar React de "react" es cada JSX:

```
rules: {
  "react/react-in-jsx-sxope": "off"
}
```

- Recordar siempre tener instalada la extension **EsLint** en el VSC.

---

## PASO 3 : - Añadir estilos del ToDoMVC

`npm install todomvc-app-css -E` para instalarlos como un paquete de npm

## Y luego para tenerlos: `<link rel="stylesheet" href="node_modules/todomvc-app-css/index-css">`

## :star: TypeScript

- Debemos aclarar que tipo de dato tendremos en el **return**, hay dos opciones:

-> Decir que es un elemento JSX:

```JSX
const App = (): JSX.Element => {
  return <h1>ToDo App</h1>;
}

export default App;
```

-> Decir que es un componente funcional:

```JSX
const App = (): React.FC => {
  return <h1>ToDo App</h1>;
}

export default App;
```

---

## PASO 4: Listar todos los TODOs

- En App.jsx creamos la constante **mockTodos** con un **array** de **object**, donde cada uno es una tas, tienen de **key**: id, tirle, completed

- Creamso el estado: `const [todos, setTodos] = useState(mockTodos)` y vemos que ya TS me infiere los tipos:

```TSX
const todos = {
  id: string,
  title: string,
  completed: boolean
}
```

-> Recordar ahora cada archivo creado es con extension **.tsx** y no **.jsx**, porque usamos **TS**.

- Hay que validar las porpTypes, pero como usamos TS, en el **.eslintrc.cjs** agrego en rules: `'react/props-types': 'off'`. Las propTypes solo funcionan en desarrollo, no en producción, no es recomndable usarlas.

- Lo que si hayque hacer es **tipar** la **prop**;

```TSX
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
```

-> Pero el Linter nos avisa: **Use an `inteface` instead of a `type`**

### type vs interface

- Type es para un tipo

- Interface me permite extender, es un contrato de un objeto.

```TSX
type TodoTitle = string

interface Todo {
  id: string
  title: TodoTitle
  completed: boolean
}

type ListOfTodos = Todo[] // o tambien type ListOfTodos = Array<Todo>
```

- Dclaro las props en una **interface** y se la paso al componente, con los `<>` le estamos pasando parametros utilizando un generic peor aclarando que van a ver dle tipo de interface **Props**:

```JSX

interface Props {
  todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({ todos}) => {
  return (
   // aca mi componente
  );
};
```

- Las **interfaces** tambien pueden **Extender**, en vez de desestruturar con ... como hacemos con JavaScript, aca extendemos:

```TSX
interface Props extends TodoType {
  onRemoveTodo: (id: string) => void
}
```

- [**Repositorio: typescript-cheatsheets/react**](https://github.com/typescript-cheatsheets/react) repositorio con trucos, tectnicas basicas y avanzadas, lo unico malo es que hay cosas que no estan muy actualizadas al dia de hoy. Al dia de hoy si se puede utilizar `React.FC<>` porque en la version 18 de React solucionaron el tema de los childrens.

- Para reutilizar la interface, creamos **types.d.ts** (d por declaraciones) y lo pasamos ahi y lo vamos a importar en Todos.tsx para utilizarlos: `import { type ListOfTodos } from "../types";`

- Creamos los componentes: `<Todo/>` y `<Todos />`

---

## PASO 5: Poder borrar un TODO

- Creamos la funciçon que filtre todos los todo que sean disitntos la id que quiero borrar y luego seteo el nuevo estado con este nuevo array de Todos.

```TSX
const handleRemove = (id: string): void => {
  const newTodos = todos.filter(todo => todo.id !== id)
  setTodos(newTodos)
}
```

- Falta que persista, pero al menos hahora la hacerle click en el boton de la Todo se elimina.

---

- Si justo pasa que el id pasa de ser **string** a **number**, tendria que cambiarloe n todos slo lados de la app, entonces eso es mejor manejarlo siempre en **types.d.ts**:

```TypeScript
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// esto seria por la negacion, diciendo que me omite
export type TodoId = Omit<Todo, 'completed' | 'title'> 
// esto seria por el lado de que elijo
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[];
```

Y ahora el **id** es un **number**

Tengo que cambiar en el mock que el id sea number.

---

## PASO 6: Marcar TODO como completado

- Creo la función para modificar el estado a completado:

```TSX
onst handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
  const newTodos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed
      }
    }
    return todo
  })
  setTodos(newTodos)
}
```

Y le paso como **props** al componente `<Todos/>`: **onToggleCompleteTodo={handleCompleted}**

Y en el `<input/>` del `<Todo/>` agrego **onChange={ handleChangeCheckbox }**:

```TSX
<input
  className='toggle'
  type='checkbox'
  checked={ completed }
  onChange={ handleChangeCheckbox }
/>
```

Creando anteriormente la función:

```TSX
const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
  onToggleCompleteTodo({
    id,
    completed: event.target.checked
  })
}
```

---

## PASO 7: Añadir una forma de filtrar TODOs (Footer)

- Hay que crear el componente `<Footer />` y el componente `<Filters />`

--- 

## as const (solo lectura)

```TypeScript
export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const
```

Para tener los estados  en constantes, al poner **as const** en TypeScript indicamos que son **de solo lectura**, asi no se le reasigna valor

---

## PASO 8 - Mostrar número de TODOs pendientes (Footer)

---

## PASO 9: Añadir forma de borrar todos los TODOs completados

---

## PASO 10: Crear Header con input (Header)

---

## PASO 11: Crear un TODO (Header)

---

## PASO 10: Poder editar el texto de un TODO (Doble click)

---

## PASO 11: Añadir animaciones con AutoAnimate

---

## PASO 12: Pasar a Reducer

---

## PASO 13: Sincronizar con el BackEnd

---
