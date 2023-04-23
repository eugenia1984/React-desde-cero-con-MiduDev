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



**Los reducers, dentro del STORE, recuperan el STATE y con el DISPATCH que les llega van a modificarlo para tener el NUEVO ESTADO**.

---

- Ahora en el store:

```TS
import { configureStore } from '@reduxjs/toolkit'
import usersReducers from './users/slice'

export const store = configureStore({
  reducer: {
    users: usersReducers
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

Para que funcione con la parte de los usuarios.

3. Vamos a leer la store, leer la información del slice.

`const users = useSelector(state => state.users)` -> **state.users**, el **users** es el mismo nombre que puse en el **reducer**


4. Creamos un **custom hook** para poder tipar a **useAppSelector** para que coincida con el estado.:

```TypeScript
import type { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 
export const useAppDispatch: () => AppDispatch = useDispatch
```

-> Esto hay que hacerlo porque Redux no puede inferir los tipos de dato, se hace cuando se usa TS. Creamos nuestro propio useSelector para decirle cuál es el estado, asi cada vez que uso el useSelector no tengo que alcarar el tipo. Y ahora en **ListOfUsers.tsx**:

```TSX
import { useAppSelector } from "../hook/store";

export default function ListOfUsers() {
const users = useAppSelector(state => state.users)
```

OJO si se estaría usando JS en vez de TS, también se podría ahacer:

```JSX
export const useAppSelector = useSelector 
export const useAppDispatch = useDispatch
```

Porque añade una capa de abstracción entre el **componente** y **React-Redux**, asi no estamos importando **React-redux** en toda la aplicación. Asi si el día de mañana se cambia Redux por otra cosa, se cambia solo ahi y listo, nos ahorramos de hacer el find and replace en todos los sitios.

5. En **slice.ts** en la parte de *Reducred** voy a tener las funciones para hacer el CRUD, ejemplo para **delete**:

```TSX
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserById: ( state, action: {type: string; payload: UserId}) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    }
  }
})
```

Pero para tipar mejor que el **id** es un **string**:

```TSX
type UserId = string;

export interface User {
  name: string,
  email: string,
  github: string
}

export interface UserWidthId extends User {
  id: UserId
}
```

Asì si el día de mañana lo cambio a number solo lo modifico en el UserId

Pero en ve de **tipar el objeto**, Redux Toolkit tiene **PayloadAction**, se usa como un genérico, solo hay que pasarle el tipo que va a tener el payload:

```TSX
deleteUserById: ( state, action: PayloadAction<UserId>) => {
  const id = action.payload
  return state.filter((user) => user.id !== id)
}
```

Y con el payload hay posibilidades de ver **metadatos** y el **error**

-> para poder **utilizar el reducer** hay que **exportar la acción**:

```TSX
export const { deleteUserById } = usersSlice.actions
```

-> Ahora hacemos lo más típico, pero es mejor usar un custom hook.

En ListOfUsers.tsx lo importamos: `import { deleteUserById } from "../store/users/slice";`.

Primero recuperamos la forma de enviar acciones: `const dispatch = useAppDispatch();`, lo que nos va a permitir enviar acciones.

Estamos en la parte del **EventHandler**, con el **dispatch** y la **action**(la ejecución de **deleteUserById**).

El **EventHandlre**:

```TSX
const handleRemoveUser = (id: UserId) => {
  dispatch(deleteUserById(id))
}
```

Y lo invoco en el evnto onClick del botón de eliminar:
```JSX
 <button
  onClick={ () => handleRemoveUser(item.id) }
  type='button'
>
```

Pero, como **no estamos persistiendo el estado** ahora podemos hacer click en el tacho de basura y se borra, pero si actualizamos la página volvemos a ver todos de nuevo.

**En memoria estamos calculando el estado**, pero una vez que refrezcamos la página se pierde.

- En **ListOfUsers.tsx**:

Hasta seniors lo hacen asi:

```TSX
const dispatch = useAppDispatch()

const handleRemoveUser = (id: UserId) => {
  dispatch(deleteUserById(id))
}
```

Pero... a nivel de compoenntes e ven las tripas de la aplicaicón, es mejor tener un **custom hook**, creamos el: **useUserActions.ts** dentro de **hooks**:

```TypeScript
import { UserId, deleteUserById } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return {removeUser}
}
```

Y en **ListOfUsers** : `const dispatch = useAppDispatch()`, asi lo usamos en el onClick


---
