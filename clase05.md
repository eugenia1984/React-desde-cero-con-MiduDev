# :star: Clase 5 - React Hooks: useContext, useReducer, useId

---

## Ciclo de vida de un componente

- Se monta

- Se renderiza

- Se desmonta

-> Esto para los **componentes funcionales**

-> Antes se utilizaban los **componentes de clases**, en ellos el ciclo de vida era màs largo.

---

## :star: 6to proyecto: Creación de un ecommerce con carrito de compras

### Enunciado

1. Ecommerce

- Muestra una lista de productos que vienen de un JSON

- Añade un filtro por categoría

- Añade un filtro por precio

Hacer uso del useContext para evitar pasar props innecesarias

2. Shopping Cart

- Haz que se puedan añadir los productos a un carrito.

- Haz que se puedan eliminar los productos del carrito.

- Haz que se puedan modificar los roductos del carrito.

- Sincroniza los cambios del carrito con la lista de productos.

- Guarda en un localStorage el carrtio para que se recupere al recargar la página.

---

- Para los **iconos** en vez de usar React Icons, que ocupa mucho espacio, dentro de **components** creamos **Icons.jsx** y los armo con **Svg**.

---

## Pasos:

### Ecommerce

1. Muestra una lista de productos que vienen de un JSON

-> Se crea el **mocks** -> **products.json** y se pasa en el compoennte `>Products />` para msotrar los primeros 10 productos

2. Añade un filtro por categoría. Añade un filtro por precio

-> Necesito tener un **Estado** para poder cambiar los **filtros**. Se podría tener un **estado por cada filtro**, peor vamos a tener **un estado geenral por cada filtro**.

```JSX
const [filters, setFilters ] = useState({
  category: "all",
  minPrice: 0
})
```

Y tengo la función **filterProducts** que nos permite filtrar los productos, según los filtros que se tengan. Se implementa **.filter()** para mostrar los productos cuyos precios sean iguales o mayores al filtro por producto (que por default es 0 para que se vean todos) y además si el filters.category es all se muestran todos sino mostramos los productos que coincidan con la categoría seteada en la búsqueda.

-> **HAY QUE SABER FILTRAR**

Ya tengo los filtos funcionando, para poder probarloa mano, en: ` minPrice: 0,` cambio el 0 por 1000 y veo como ya no se renderizan los productos que salen menos a 1.000. Y si en `category: "all",` cambio `all` por `laptops` voy a ver solo las laptops.

Funcionalmente no tengo en ningún lado de la app para aplicar el filtro, peor al menos ya muestro que funciona. Ahora si creaos el componente `<Header />` para poder aplicar los filtros, que están dentro del compoennte `<Filters />`.

Como para le precio utilizo un rango tengo que mostrar de donde hasta donde va el rango, para loq ue utilizo otr estado con `minPrice`.

### Prop Drilling

Como un **taladro**, haces un agujero, pasas hacia abajo las props para que funcione algo.

![image](https://user-images.githubusercontent.com/72580574/229617132-b99ebe6d-d74b-464b-8f8f-aa9bd7b3837a.png)

EL **filtrado** lo tenemos en `<App/>`, pero se lo pasamos coo **prop** a `<Header changeFilters={setFilters} />` y dentro de `<Header />` se lo pasamos como prop a: `<Filters onChange={changeFilters} />`

-> Hacer uso del **useContext** para evitar pasar props innecesarias

### Shopping Cart

- Haz que se puedan añadir los productos a un carrito.

- Haz que se puedan eliminar los productos del carrito.

- Haz que se puedan modificar los roductos del carrito.

- Sincroniza los cambios del carrito con la lista de productos.

- Guarda en un localStorage el carrtio para que se recupere al recargar la página.

---

## :book: useContext

Te permite tener **un nuevo contexto** en React.


Para manejar el estado de una forma diferente.

```JSX
function App() {
  const [products] = useState(initialProducts);
  const { filters, filterProducts, setFilters} = useFilters()
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      <Footer filters={filters}/>
    </>
  );
}
```

Como tenemos ahora la App es responsable de ir orquestando y psando los filtros a los componentes. Vamos a evitar el **drop drilling** creando un **contexto**, es **State** va a estar el el **FiltersContext** y cada componente va a leer de ahi lo que necesite, sin tneer que esperar que la App le vaya pasando por props todo. 

**Desacoplamos la lógica de los filtros en una aprte separada** y **cualquiera que lo necesite lo leer de ahi**.



![image](https://user-images.githubusercontent.com/72580574/229920712-d331a873-04d7-469a-bb28-a875577d4bed.png)

Envolvemos la app en **FiltersContextProvider**:

Son tres pasos:

1. Crear el contexto

2. Proveer el Context, decirle que parte de nuestra aplicación puede acceder a este contexto

3. Consumir el contexto, desde filters


-> **PASO 1**: Para **crear el contexto**...

... Creo una carpeta **context** y dentro el contexto: **filters.jsx**

... importo: `import { createContext } from "react";` 

... exportamos una contaste que va a crear el contexto: `export const FiltersContext = createContext()`

-> **PASO 2**: **proveer el contexto** para lo cual debemos...

... crear el **Provider**

```JSX
export function FiltersProvider({children}) {
  return (
    <FiltersContext.Provider value={{
      category: "all",
      minPrice: 0
    }}>
      {children}
    </FiltersContext.Provider>
  )
}
```

Luego va a ser un estado general para toda mi aplicación, peor ahora empezamos con un objeto que tiene mi valor inicial para category u minPrice.


Vuelvo al punto de entrada: **main.js** y envuelvo **App** con el **FiltersProviders**:

```JSX
ReactDOM.createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);
```

-> **PASO 3**: **consumir** el context. Vamos a tener que envolver toda la aplicación asi se puede usar desde todos lados.

![image](https://user-images.githubusercontent.com/72580574/229934299-2aa8d399-fb34-45cb-ba3f-1e0aadfac659.png)


Vamos a evitar el prorp drilling:
App.js
```JSX
function App() {
  const [products] = useState(initialProducts);
  const { filters, filterProducts, setFilters} = useFilters()
  
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      <Footer filters={filters}/>
    </>
  );
}
```

Saco tanto de la desestructuración de `useFilters()`(a **setFilters**) como del compoennte `<Header>`(a **changeFilters**), también lo saco desde HEader que se lo pasaba al compoente hijo `Filter` y en este uso: `const { setFilters } = useFilters();` para setear los filtros usando del context el **Estado de los filtros**.


Igual todavía tnemos que arreglar esto (**que mucha gente lo hace mal**):

```JSX
const handleChangeMinPrice = (event) => {
  // Aqui algo huele mal
  // DOS FUENTES DE LA VERDAD
  setMinPrice(event.target.value);
  setFilters((prevState) => ({
    ...prevState,
    minPrice: event.target.value,
  }));
};
```

`setMinPrice(event.target.value);` es un estado local, que se repite con el estado global del context.

Dejo de usar `const [minPrice, setMinPrice] = useState(0);` y uso `const {filters, setFilters } = useFilters();`, en **handleChangeMinPrice** solo uso el **setFilters** , en el input del valor minimo: `value={filters.minPrice}` y en el `<span>` que muestra el valor: `<span>${filters.minPrice}</span>`

-> **la fuente de la verdad siempre es una sola**


A los componentes hijos no debemos pasarle las cosas que ahora tenemos en el context.

-> Puede haber **contextos estáticos** como e caso de crear un contexto para el **theme**(los colores de mi app), para **inyectar configuración**, **tokens**, **traducciones**. No es sólo para hacer **Estados globales**.

-> **EL CONTEXTO ES UNA FORMA DE INYECCIÓN DE DEPENDENCIAS**. Use contaxt como estado global está pensado para **contextos pequeños** que **cambien con poca frecuencia**, por ejemplo para ver **si el usuario esta con sesión iniciada o no**(cambia muy pocas veces, no esta todo el tiempo logueandose y desloguendose, y además al estar loguedo si cambian muchas cosas en la aplicación).


---

## :book: useReducer

---

## :book: useId

Es un hook lanzado en React versión 18, una identificación única en toda la aplicación.

Genera un **identificador único**, que **siempre** va a ser el **mismo**.

Necesitamos dos: una para el **minPriceFilterId** y otra para el **categoryFilterId**. Y la aplicamos:

```JSX
<div>
  <label htlmFor={minPriceFilterId}>Minimum price :</label>
  <input
    type="range"
    id={minPriceFilterId}
    min="0"
    max="1400"
    onChange={handleChangeMinPrice}
  ></input>
  <span>${minPrice}</span>
</div>
```

Lo mismo con la categoria.

-> Mantiene el orden de llamada dentro del componente.

![image](https://user-images.githubusercontent.com/72580574/229823311-faf54be0-6648-4062-a602-749d44d5eb26.png)



-> No se puede usar como index para una key en algo que se esta iterando. Porque estas todo el tiempo creando un nuevo id, y se puede entender que te estas refiriendo la mismo elemento. En el map siempre hay que usar **un identificador unico para ese elemento**.


---
