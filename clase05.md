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

---

## :book: useReducer

Para manejar el estado de una forma diferente.

---

## :book: useId

Es un hook lanzado en React versión 18, una identificación única en toda la aplicación. 

Genera un **identificador único**, que **siempre** va a ser el **mismo**.                                                                                                                  

---