# :star: CLASE 08 - React + TypeScript + ChatGPT 

---

## :star: 9no Proyecto: Crear un Google Translate con ChatGPT y TypeScript

---

- 1 - Creamos el proyecto con: `npm create vite@latest 09-code-editor` Y despues elegir: `React` y `TypeScript + SWC` . Listo, se creo, luego:  `cd 09-code-editor`, `npm install` y `npm run dev`. 

- 2 - Instalamos todas las dependencias que necesitaremos: 

**ESLinter**: `npx eslint --init` y luego: ` To check syntax, find problems, and enforce code style`, `JavaScript modules (import/export)`, `React`, `Does your project use TypeScript? -> Yes` , `Where does your code run? -> Browser`, `Use a popular style guide` -> ` Standard: https://github.com/standard/eslint-config-standard-with-typescript`, ` What format do you want your config file to be in? -> JavaScript`. Y lo instalo ahora con `npm`

Y necesitamos agregar en **.eslintrc.cjs** en `parserOptions` agregar: ` proyect: './tsconfig.json'` asi ve el archivo que tiene la configuración de TypeScript. Y en `rules` agregar: `'@typescript-eslint/explicit-function-return-type': 'off'` y `'react/eact-in-jsx-scope': 'off'`

**React Bootstrap**: [Web: https://react-bootstrap.github.io/](https://react-bootstrap.github.io/). Entonces en consola: `npm install react-bootstrap bootstrap -E`. En **pakage.json** en `dependencies` ya veo:
```
"bootstrap": "5.2.3",
"react-bootstrap": "2.7.2",
```

También debemo importar los estilos en el proyecto, en **App.tsx**: `import 'bootstrap/dist/css/bootstrap.min.css';`

- 3 - Empezamos con el proyecto, creando el **initialState** y vamos a utilizar un **Reducer** que recibe dos parámetros...

... **state**

... **action**

---