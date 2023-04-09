# :star: CLASE 7 - React + TypeScript (Día 01): props y state

---

- Utilizar TypeScript con React

---

## :star: Pryecto: TODO con React y TypeScript. Se sincroniza con un BackEnd(sin usar localStprage). Tiene animaciones.

## Passos:

- 1 - Inicializar proyecto con Vite

- 2 - Añadir linter para TypeScript + React

- Añadir estilos del ToDoMVC

- Listar todos los TODOs

- Poder borrar un TODO

- Marcar TODO como completado

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

Y hay que agregar en *rules** para que no me pida que tenga que importar React de "react" es cada JSX:

```
rules: {
  "react/react-in-jsx-sxope": "off" 
}
```

- Recordar siempre tener instalada la extension **EsLint** en el VSC.


---

## PASO 3 : - Añadir estilos del ToDoMVC

`npm install todomvc-app-css -E` para instalarlos como un paquete de npm

Y luego para tenerlos: `<link rel="stylesheet" href="node_modules/todomvc-app-css/index-css">`
---

## :star: TypeScript

- Debemos aclarar que tipo de dato tendremos en el **return**, hay dos opciones:

- Decir que es un elemento JSX:

```JSX
const App = (): JSX.Element => {
  return <h1>ToDo App</h1>;
}

export default App;
```


- Decir que es un componente funcional:

```JSX
const App = (): React.FC => {
  return <h1>ToDo App</h1>;
}

export default App;
```

---

## PASO 4: Listar todos los TODOs

---

## PASO 5:  Poder borrar un TODO

---

## PASO 6: Marcar TODO como completado

---

## PASO 7:  Añadir forma de borrar todos los TODOs completados

---

## PASO 8:  Crear Header con input (Header)

---

## PASO 9:  Crear un TODO (Header)


---

## PASO 10: Poder editar el texto de un TODO (Doble click)


---

## PASO 11:  Añadir animaciones con AutoAnimate


---

## PASO 12:  Pasar a Reducer


---

## PASO 13:  Sincronizar con el BackEnd


---