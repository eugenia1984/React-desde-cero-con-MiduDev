# :star: React Redux Toolkit + Rome Tools 

## Temas a ver: 

- Redux y Redux ToolKit, para manejar el **Estado global**

- Sincronizar los datos con una base de datos

- [**Rome**](https://rome.tools/)

- [**Tremor**](https://www.tremor.so/), para tener componentes ya armados.

- [HeroIcons](https://heroicons.com/) para los iconos

---

## Rome

En reemplazo de ESLint.

Es del creador de **Babel**, tenes: formateador, linter. 

Para instalarlo: `npm add rome -D`, en package.json en las dependencias de desarrollo ya se ve.

Para inicializarlo: `npx rome init` y veo que se creo el archivo **rome.json**. Agregamos **"formatter"** y en **"linter"** el *enabled* que quede en *true*.

- Tener la extensión de VSC **rome** de Rome LSP VS Code Extension. Y si tenemos la de ESLint, hay que hacer disable(workspace), asi en este proyecto usamos rome. Lo mismo con la extensión Prettier.

- Lo que no anda es el formateador, porque entra en conflicto con los settings que tengo ya definidos en mi VSC, entonces creo una carpeta **.vscode** con el archivo **Settings.json**

---

## TREMOR

- Para instalarlo: `npm install @tremor/react` ò `npx add @tremor/react -E`

- También utiliza **Tailwind**, por lo que debemos instalarlo: `npm add -D tailwindcss postcss autoprefixer` y al terminar: `npx tailwind init -p` para que cree el **tailwind.config.json**

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Y en **index.css*:

```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```


---

## HEROICONS

- Para instalar: `npm install @heroicons/react`.

Son los mismos creadores de Tailwind.

---

- **REDUX** -> forma de **gestionar el estado**, se puede usar con y sin React. 

---
---

## ⭐ 10mo proyecto: Crear un CRUD con Redux Toolkit y TypeScript

---

1. Desde la web de **Tremor** en [**Blocks**](https://www.tremor.so/blocks/table) ya hay componentes armados, dentro de block entramos a **table** y copiamos el codigo de **Card + Table + BadgeDelta**.

Y lo modificamos un poco, vamos a tener la tabla con:

- id

- name

- email

- actions: edit / delete

En el codigo copiado ya me trae un mockup, lo modifico para mostrar esos datos, y también modifico la table, uso los íconos de Hero Icons par alas acciones.

---

2. Redux

- Instalamos las dependencias. Usamos **Redux Toolkit**:

```
npm install @reduxjs/toolkit
npm install react-redux
```

---