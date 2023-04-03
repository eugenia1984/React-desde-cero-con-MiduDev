# :star: Clase 5 - React Hooks: useContext, useReducer, useId

---

## Ciclo de vida de un componente

- Se monta

- Se renderiza

- Se desmonta

-> Esto para los **componentes funcionales**

-> Antes se utilizaban los **componentes de clases**, en ellos el ciclo de vida era màs largo.

---

## 6to proyecto: Creación de un ecommerce con carrito de compras

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


Ya tengo los filtos funcionando, para poder probarloa  mano, en: ` minPrice: 0,` cambio el 0 por 1000 y veo como ya no se renderizan los productos que salen menos a 1.000. Y si en `category: "all",` cambio `all` por `laptops` voy a ver solo las laptops.

Hacer uso del useContext para evitar pasar props innecesarias


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

---

## :book: useId

---
