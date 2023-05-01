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

##:stars: 1 - Fetch 100 rows of data using the API.

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


---

## :stars: 2 - Display the data in a table format, similar to the example.

---


## :stars: 3 - Provide the option to color rows as shown un the example.

---


## :stars:  4 -  Allow the data to be sorted by country as demostrated in the example.

---


## :stars: 5 - Enable the ability to delete a row as shown in the example.

---


## :stars: 6 - Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.

---


## :stars: 7 - Handle any potential errors that may occur.

---


## :stars: 8 - Implement a feature that allows the user to filter the data by country.

---


## :stars: 9 - Avoid sorting users again the data when the user is changing filter by country.

---


## :stars: 10 - Sort by clicking on the column header

---


## :stars: 11 - Provide a README.md file with the instructions on ow to run the application

---
