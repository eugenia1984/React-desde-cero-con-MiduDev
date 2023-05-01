# :star: CLASE 10 * Prueba técnica de React con TypeScript

---

Es una prueba técnica real que toman en una empresa en al cual pagar EUR 50.000 anuales

---

# :stars:PRUEBA TÉCNICA - CONSIGNA

The objective of this technical test is to create a similar application to the one provided in this link: https://xxxxxx. To achive this, you must use the APi provided by [**https://randomuser.me/**](https://randomuser.me/).


Here are the steps to follow:

1. Fetch 100 rows of data using the API.

2. Display the data in a table format, similar to the example.

3. Provide the option to color rows as shown un the example.

4. Allow the data to be sorted by country as demostrated in the example.

5. Enable the ability to delete a row as shown in the example.

6. Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.

7. Handle any potential errors that may occur.

8. Implement a feature that allows the user to filter the data by country.

9. Avoid sorting users again the data when the user is changing filter by country.

10. Sort by clicking on the column header

11. Provide a README.md file with the instructions on ow to run the application



---
---

# :stars:PASOS:

---

## Primero creo el proyecto con VITE:

`npm create vite@latest 11-prueba-tecnica` > `y` > 
`React` > `TypeScript + SWC` 

Entro al proyecto: `cd 11-prueba-tecnica`. Instalo: `npm install` y lo corro: `npm run dev`

Agrego ESLint: `npm init @eslint/config`: `y` > `To check syntax, find problems, and enforce code style` > `JavaScript modules (import/export)` > ` React` > ` Does your project use TypeScript?: Yes` > `Browser` > `Use a popular style guide` > ` Standard: https://github.com/standard/eslint-config-standard-with-typescript` > `JavaScript`

```
Checking peerDependencies of eslint-config-standard-with-typescript@latest
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.43.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
? Would you like to install them now?
```

> `Yes` > `npm`

Y veo que tengo el archivo **.eslintrc.cjs**, y para que funcione linter en **parserOptions** agrego: `proyect: './tsconfig.json'` (esto se hace por usar TS).

Y saco algunas reglas del ESLint:

```
rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off'
}
```

---

## :stars: 1 - Fetch 100 rows of data using the API.

Veo que en la primer busqueda no me trae los 100, por defecto: ```https://randomuser.me/api``` trae solo uno, pero viendo la documentación:

### Requesting Multiple Users

Random User Generator allows you to fetch up to 5,000 generated users in one request using the results parameter.

``https://randomuser.me/api/?results=100``

- Para hacer el **fetch** tenemos que tener un **useEffect** y los datos los guardo en un **estado**

```TSX
const [users, setUsers] = useState([])
useEffect(() => {
  fetch('https://randomuser.me/api/?results=100')
    .then(async res => await res.json())
    .then(res => {
        setUsers(res.results) 
    })
    .catch(err => {
      console.warn(`Error: ${err}`)
    })
}, [])
```

-> **Siempre tener el dependency array** en el **useEffect**

Y para no solo verlo en el console.log, en el return: 
```TSX
{JSON.stringify(users)}
```

-> Error muy común que hace perder tiempo no empezar **a tipar a lo loco**, utilizar [**https://quicktype.io/**](https://quicktype.io/)


![image](https://user-images.githubusercontent.com/72580574/235514486-18c4d72a-3caf-4196-a35c-d6432ae510de.png)

Me copio todos los tipos y los guardo en **types.d.ts**

También por si necesito me creo una carpeta `API` y el archivo **results-mock.json** para tener el ejemplo dle JSON, asi se que datos necesito luego ir mostrando.

- Paso todos los users a un componente `<UsersList>`

---

## :stars: 2 - Display the data in a table format, similar to the example.

Para poder mostrarlos voy a tener el componente `UsersList` y al necesitar una tabla tendre:

- `<table></table>` y dentro: `thead` para la cabecera (`th` para el table header) y `tbody` para el body. Y adentro: `tr` para las rows y `td` de table data para las cell.

- Como usamos TS **tipamos**:


```TSX
import { type Result } from '../types.d'

interface Props {
  users: Result[]
}

function UsersList({ users }: Props) {..}
```

-> Para la **key** usar el **id**.value, no usar **index**(porque después hay que eliminar) ni generar ids.

-> Completamos los datos de las table row que necesitamos mostrar y lo renderizamos en App.jsx

---


## :stars: 3 - Provide the option to color rows as shown un the example.

- Necesito un state: `const [showColors, setShowColors] = useState(false)`

- Y un modo de actualizar ese estado, con la función `toggleColors`:

```TSX
const togglecolors = () => {
  setShowColors(!showColors)
}
```

- Creo el `header` con los botones:

```JSX
<header>
  <button onClick={togglecolors}>Color rows</button>
</header>
```

- Y paso el estado como prop al componente `UsersList` y como necesito hacer el efecto cebra voy a utilizar el index, en el **user.map**: `const backgroundColor = index % 2 === 0 ? '#333' : '#555'` y `const color = showColors? backgroundColor: 'transparent'` y aplico el estilo: ` <tr key={ user.id.value } style={{backgroundColor: color}}>`

-> **OJO parece que no nos funciona, porque primero hay keys en NULL** usando el **user.id.value** como key es que tengo null, para ahora solucionarlo momenaneamente usamos el **index**

---


## :stars:  4 -  Allow the data to be sorted by country as demostrated in the example.

- Empiezo creando un estado booleano(después lo mejor): `const [ sortByCountry, setSortByCountry ] = useState(false)` y el botón: ` <button onClick={() => setSortByCountry(prevState => !prevState)}>Sort by country</button>`.

-Primer idea:

```TSX
const sortedUsers = sortByCountry
  ? users.sort((a, b) => { // ESTO ESTA MAL, MUTA EL ARRAY ORIGINAL
    // return a.location.country > b.location.country ? 1: -1
    return a.location.country.localeCompare(b.location.country)
  })
  : users //YA ESTA ORDENADO POR DEFFECTO
```

Con el **localeCompare** voy a tener en ceunta los asentos y demás, si lo dejo asi va a devolver en modo **ASC**(ascendente)

Pero está mal -> Solo me funciona LA PRIMERA VEZ, cuando hago nuevamente click en el botón NO me los reordena.

- ¿Qué tenemos mal? -> El **sort muta** el **array original**

-> Algo rápido para salir del paso, ordeno una copia, no el array original:

```TSX
const sortedUsers = sortByCountry
  ? [...users].sort((a, b) => {
    // return a.location.country > b.location.country ? 1: -1
    return a.location.country.localeCompare(b.location.country)
  })
  : users
```

Esta forma de solucionarlo sería un **7**.

Si en vez de `[...users]` hacemos `structureClone(users)` aca estaríamos peor, seríamso un **5,5**, porque hacemos una copia profunda.


Mucho mejor si utilizamos el nuevo método de JavaSCript **toSorted** (ya que al usar Babel va a tener compatibilidad con los navegadores viejos) y este sí sería un **10**, muestro que estoy al día con JavaScript. En este caso **Devuelvo un nuevo array**, no muto el original. Pero...tenemso un problema, `Property 'toSorted' does nos exist on type 'User[]'`, TS todavía no lo soporta, entonces en **types.d.ts**:

```TypeScript
declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}
```

Aclaramos que el **toSorted** es una **función**

-> Otro error a evitar: crearnos un estado para cada cosa. NO tenemos UN SOLO ESTADO y luego hacemos los cálculos para ordenr o lo que necesitemos. Porque asi si el estado cambia nuestro sorted va a cambiar también.

---


## :stars: 5 - Enable the ability to delete a row as shown in the example.

- Primer intento:

```JSX
const handleDelete = (index: number) => {
  const filteredUsers = users.filter((user, userIndex) => userIndex !== index)
  setUsers(filteredUsers)
}
```

Pero nos va a traer problemas. Porque al tener la **key** con el **index** si por ejemplo borro el index=2, entonces el que es index=3 pasa a ser el 2, se me van a cambiar las keys. Y **las keys son inmutalbes** sino React no uede identificar al usuario. -> Cambio que me va a dar la **key**: `  <tr key={ user.login.uuid } style={ { backgroundColor: color } }>` otra cosa que se podría utilizar es el `email`, se supone que es uno por persona(único). Y ajusto la función para borrar:

```TSX
const handleDelete = (email: string) => {
  const filteredUsers = users.filter((user) => user.email !== email)
  setUsers(filteredUsers)
}
```


Pasamos a **handleDelete** como props y se lo agregamos al boton de action Delete.

Actualizo la popr de `UsersList`: `deleteUser: (email: string) => void`

Y ajusto: `<td><button onClick={ () => { deleteUser(user.email) } }>Delete</button></td>`

---

## :stars: 6 - Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.


- Un **error** muy comun es crear otro estado: `const [originalUsers, setOriginalUsers] = useStte<User[]>([])` y en el ftch debería setearlo.

- Otro **error** es ``let originalUsers: Users[] = []`` y en el fetch lo seteo. Solo funciona porque este componente es Singleton, lo tenes en una única isntancia, si lo tuvieras en otro lado no funcionaría, se comparte el valor y hay inconveneintes.

- ¿Cuál es el mejor modo? Usando **useRef**: `const originalUsers = useRef<User[]>([])`

**useRef** -> para guardar un valor que queremos que **se comparta entre renderizados** pero que al cambiar **no vuelva a renderizar el componente**. Es decir es similar al useSate con dos diferencias...

... cada vez que cambia el ref no vuelve a renderizarse el componente

... para acceder al valor de una referencia y cambiarla hay que usar el `.current`

Nos permite guardar valores que se preserven entre renderizados.

El useRef se puede utilizar para guardar un elemento del DOm, peor no es solo para eso.

---

## :stars: 7 - Handle any potential errors that may occur.

Ya lo vamos haciendo en cada punto que vamos resolviendo

---

## :stars: 8 - Implement a feature that allows the user to filter the data by country.

- Hay que agregar un `input` para poder **filtrar por pais**:

```TSX
<input 
  placeholder='Filter by country'
  onChange={(e) => {
    setFilterCountry(e.target.value)
  }}
/>
```

- Voy a tener el estado `filterCountry`

- Lo que podemos hacer es primeros filtrarlos y lueog ordenarlos, si es que primero los filtro, por eso voy a tener **filteredUsers**

```TSX
const filteredUsers = typeof filterCountry === 'string' && filterCountry.length > 0
  ? users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })
  : users
```

Usamos **toLowerCase** para que no sea **case sensitie**

Entonces si tengo filtrados por pais los ordeno:

```JSX
const sortedUsers = sortByCountry
  ? filteredUsers.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country)
  })
  : filteredUsers
```

-> Es un plus si lo hacemos en este orden

-> Un **error** es meter el filteredUsers en un estado, ya que es un **Valor derivado** teniendo el estado se puede hacer el filtro.

Pero todavía s epuede mejorar con el próximo punto.

---

## :stars: 9 - Avoid sorting users again the data when the user is changing filter by country.

- Hay que usar el **useMemo**, asi no se vuelve a ordenar cuando hago lo del colorear o que se vuelva a ordenar si no hay cambios.

```TSX
const sortedUsers = useMemo(() => {
    return sortByCountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

}, [filteredUsers, sortByCountry]) // filteredUsers pasa a ser users cuando uso useMemo en filteredUsers
```

Asi guardo el valor de **sortedUers** y solo la vuelvo a renderizar si cambia el valor de **filterdUsers** o de **sortByCountry**

Pero aca **tenemos un problema**: el filteredUsers **siempre cambia**, en cada re renderizado se calcula de nuevo.

Ya lo arreglamso en el colorear y en el ordenar, ahora falta solucionarlo en el input. -> El **filterdUsers** también necesita un **useMemo**:

```TSX
const filteredUsers = useMemo(() => {
  return typeof filterCountry === 'string' && filterCountry.length > 0
    ? filteredUsers.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    : filteredUsers
}, [filteredUsers, filterCountry])
```


---

## :stars: 10 - Sort by clicking on the column header

- Para refactorizar y como gestionamos el estado.

- Usamos un **enum**:

```
export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}
```

Para cambiar el **sortByCountry** por **sorting**: ` const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)` y:

```TSX
const toggleSortByCountry = () => {
  const newSortingValue = sorting === SortBy.NONE? SortBy.COUNTRY : SortBy.NONE
  setSorting(newSortingValue)
}
```

- Primer opcion:

```TSX
 const sortedUsers = useMemo(() => {
    console.log('Calculate sortedUsers')

    if(sorting === SortBy.NONE) return filteredUsers

    let sortedFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if(sorting === SortBy.NAME) {
      sortedFn = (a, b) => a.name.first.localeCompare(b.name.first)
    }

    if(sorting === SortBy.LAST) {
      sortedFn = (a, b) => a.name.last.localeCompare(b.name.last)
    }

    return filteredUsers.toSorted(sortedFn)

  }, [filteredUsers, sorting])
  ```

- otro modo:

```TSX
const sortedUsers = useMemo(() => {
  console.log('Calculate sortedUsers')

  if(sorting === SortBy.NONE) return filteredUsers

  const compareProperties: Record<string, (user: User) => any> = {
    [SortBy.COUNTRY]: user => user.location.country,
    [SortBy.NAME]: user => user.name.first,
    [SortBy.LAST]: user => user.name.last
  }

  return filteredUsers.toSorted((a,b) => {
    const extractProperty = compareProperties[sorting]
    return extractProperty(a).locaeCompare(extractProperty(b))
  })

}, [filteredUsers, sorting])
```

---

## :stars: 11 - Provide a README.md file with the instructions on how to run the application


---
