# :book: React desde cero con Midu Dev \* Clase 2

---

## :star: Hacemos el segundo proyecto \* Ta- Te- Ti (Tic-Tac-Toe)

-> Volvemos a crear el proyecto con **Vite** (empaquetador como alternativa a Webpack y create-react-app)

```
> npm create vite@latest
> cd 02-tic-ta-toe
> npm install
> npm run dev
```

- Va a ser un **Tablero**(**board**) con **9** posiciones, las cuales van a tener como valor: **x** ó **o**.

- Necesitamos un **state** para saber **de quien es el turno**

- Cambiar al componente hijo dependndiendo del estado del componente padre, para ello con **isSelected** voy a modificar el **className** y asi muestro a quien le tocara el turno.

- En el componente `<Square />`tenemos **updateBoard()**, es la función más importante que ...

... actualiza estados, con **setTurn**

... ve de quien es el turno

... ve quien es el ganador

-> Se pasa la función (sin los parentesis), no la ejecución de la función(si va con los parentesis se manda la ejecucion de la funcion y se ejecutara al momento). Si se pasa la ejecucion de la función, ya al renderizar la UI se va a ejecutar 9 veces, por cada square, y en realidad solo quiero que se **ejecute al hacer click, no cuando se renderiza**, por eso va sin los (), por eso **se pasa como parámetro**.

---

-> :book: **La actualización de los estados en React son ASÍNCRONAS**, puede ocurrir rápido o demorarse, pero no bloquea el código que viene después (justamente porque no es síncrono).

---

## :star: Hook useEffect

Un hook que nos permite ejecutar codigo arbitrario cuando se monta el componente y cada vez que cambie la dependencia que le indicamos en el **dependency array**.

```JSX
useEffect(codoToExecute, listOfDependencies)
```

-> Siempre se va a ejecutar, como mínimo, una vez (al cargarse el componente)

-> listOfDependencies es opcional, pero... si no esta se va a ejecutar el useEffect cada vez que se renderice el componente, es mejor que tenga al menos [] asi se ejecuta al menos al renderizar por primera vez el componente, y luego si indico un valor se re renderizara si cambia dicho valor.

---

Los **state** son **inmutales**

Por eso en el **updateBoard** me creo una copia de mi board para trabajarla, asi no la modifico(si modifico el estado actual, sin llamar al set, podría tener discrepancias en el renderizado):

```JSX
const newBoard = [...board];
```

---

La **actualización del estado** es **asíncrona**, es no bloqueante, van a ir pasando otras cosas mientras se actualiza. Por eso en **checkWinner** se pasa el **boardToCheck** y no el **board**, para que funcione con el valor del estado actual y no el anterior.

---

## Canvas Confetti

- Vamos a trabajar con la librerìa de **confett** para que al terminar y tener un ganador celebremos.

- Para instalar la librería:

``` npm install canvas-confetti -E```


---


## :star: Tercer proyecto : Mouse follower

Para entender el concepto del _hook_ **useEffect**

-> **return** del useEffect, para limpiar, es el **clean up method**. Dentro del return hay que cerrar si hay llamado a API. Cada vez que vuelve a ejecutar el useEffect va a hacer el clen up y también cuando se desmonta.

---

## :star: React Developer Tools

- Aclara si usas el **modo desarrollo** o si usas **modo producción**.

- **Components** para poder ver los **state** y las **props**, podemos hacer cambios y lo vemos cuando se re renderice.

- **Profiler** es interesante para temas de rendimiento.

---

## :star: Para deployar

- Vercel

- Netlify

---

## :star: Tareas

-> Del tres en raya

- Pasar del "3 en raya" a "conecta 4"

- Mejorar estados

- Ver de poder usar el useEffect

- Guardar la información en una API

-> Del mouse follower

- Se puede convertir en un juego...

... ver cuantas veces toca algo

... ver si toca el boton que cambie el sitio

... que de forma random se dibuje un punto en la pantalla, que este unos minutos, y si el mouse esta adentro que sume puntos.

---
