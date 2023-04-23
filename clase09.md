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
npm install @reduxjs/toolkit -E
npm install react-redux -E
```

Y mirando **dependencies** en **package.json** ya las veo isntaladas:

```
"dependencies": {
  "@heroicons/react": "^2.0.17",
  "@reduxjs/toolkit": "^1.9.5",
  "@tremor/react": "2.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^8.0.5"
},
```

Si uso `-E` es para que no me baje las versiones `^`

- Creamos una carpeta **store**, donde se va a guardar ese **estado global**. Adentro tengo: **index.ts**. Aca voy a tener el **estado**, las **acciones**, los **reducers**, etc.

- Debemos envolver la aplicación con un **provider**:
**main-tsx**:

```TSX
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={ store }>
    <App />
  </Provider>,
)
```

Este **provider** nos permite, desde **cualquier parte de la aplicación**, poder leer la store y mandar acciones para generar nuevos estados.

- La **STORE** es como una **caja** donde se van a guardar las cosas. Dentro de la caja, hay que ser organizado, por lo que se divide esta caja en **slice**

```
> store
  > users
    slice.ts
  index.ts
```

-> Cuando se crea el **slice** voy a necesitar: **name**, **initialState** y **reducers**. El estado puede ser un objeto, un array o un string.

-> **Data flow**: es circular, esta la **vista**(**componente**), el cual envía una **Acción**, la cual cambia el **estado**y se vuelve a actualizar la **vista**.

![image](https://user-images.githubusercontent.com/72580574/233863672-0bbd77c5-fb5a-4954-9172-981d340d0012.png)


actions -> (reducers) -> state

transforman el estado, del estado previo al estado nuevo, dependiendo de la acción

![image](https://user-images.githubusercontent.com/72580574/233863939-b194bffd-6c96-40f0-ac87-194b89ddabe6.png)


![image](https://user-images.githubusercontent.com/72580574/233863883-f200cf65-a611-4c48-a51a-7efc43b843a9.png)

![image](https://user-images.githubusercontent.com/72580574/233863914-6e317160-d2c7-4b72-b636-d41077fbc06c.png)




---
