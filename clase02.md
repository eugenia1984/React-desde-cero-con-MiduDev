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

Los **state** son **inmutales**

Por eso en el **updateBoard** me creo una copia de mi board para trabajarla, asi no la modifico(si modifico el estado actual, sin llamar al set, podría tener discrepancias en el renderizado):

```JSX
const newBoard = [...board];
```

---

La **actualización del estado** es **asíncrona**, es no bloqueante, van a ir pasando otras cosas mientras se actualiza. Por eso en **checkWinner** se pasa el **boardToCheck** y no el **board**, para que funcione con el valor del estado actual y no el anterior.

---

## Canvas Confetti

- Vamos a trabajar con la librerìa de **confetti** para que al terminar y tener un ganador celebremos.

- Para instalar la librería:

` npm install canvas-confetti -E`

---

## :stars: HOOK USESTATE

Permite tener un **estado** en el componnete, y al cambiar permite la re renderización, para mostrar esa modificación en la Intefaz de Usuario (UI).

---

## :stars: HOOK USEEFFECT


Un hook que nos permite ejecutar codigo arbitrario cuando **se monta el componente** y cada vez que **cambie la dependencia** que le indicamos en el **dependency array**.

```JSX
useEffect(codeToExecute, listOfDependencies)
```

-> Siempre se va a ejecutar, como mínimo, una vez (al cargarse el componente)

-> listOfDependencies es opcional, pero... si no esta se va a ejecutar el useEffect cada vez que se renderice el componente, es mejor que tenga al menos [] asi se ejecuta al menos al renderizar por primera vez el componente, y luego si indico un valor se re renderizara si cambia dicho valor. Si quiero que se ejecute solo una vez, le debo pasar un **Array vacío** en el dependency array.

-> En React siempre queremos **ejecutar un efecto**, si hay un juego multipartida al cambiar quien gana, o al recuperar la información del localStorage.

### Características: 

- Se utiliza en el cuerpo del componente

- Hay que importarlo

- Es una función que recibe dos parámetros...

... código a ejecutar -> que es una función

... lista de dependencias -> un array, es **opcional**, puede que no se pase, en ese caso el código a ejecutar se va a ejecutar cada vez que se renderice el componente.

```
useEffect(codeToExecute, listOfDependencies)
```

El codeToExecute es una función:

```JSX
useEffect( () => {
  console.log("El codigo a ejecutar")
}, listOfDependencies)
```

El **console.log("El codigo a ejecutar")** se ejecutará, como mínimo una vez, es decir al montar el componente. Luego si tengo actualizaciones (modificaciones) en la **listOfDependencies**, en ese caso se volverá a ejecutar.

---

## :star: Tercer proyecto : Mouse follower

Para entender el concepto del hook **useEffect**

Ejemplo del codigo:

```JSX
// pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    // cleanup method: cuando el componente se desmonta y
    // cuando cambian las dependencias, antes de ejecutar el efecto de nuevo
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled]);

  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente
  ```
  
-> **return** del useEffect, para limpiar, es el **clean up method**. Dentro del return hay que cerrar si hay llamado a API. Cada vez que vuelve a ejecutar el useEffect va a hacer el clen up y también cuando se desmonta.

- Para poder validar que se cerro y se ejecutó bien, desde la consola del navegador podemos hacer:
```JavaScript
getEventListeners(window)
```

**window** es el objeto que le paso, en este caso es para ver el elemento window, de este modo se ve que se suscribe a ese evento, si se deja de suscribir con el return, etc.

-> Este truco solo funciona en Chronium

---

## StandardJS (Linter)

```npm install standard -D``` **-D** como dependencia de desarrollo

Lo instalo en el proyecto 02-tic-tac-toe, entonces en el **package.json** en **devDependencies** vemos:

 ```"standard": "^17.0.0",```

 Y agregamos a continuación:

 `
 "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
 `

 Entonces tenemos:

 `
  "devDependencies": {
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.9",
    "@vitejs/plugin-react-swc": "^3.0.0",
    "standard": "^17.0.0",
    "vite": "^4.0.0"
  },
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
 `

También hay que tener el pluggin **ESLint** en el VSC.

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
