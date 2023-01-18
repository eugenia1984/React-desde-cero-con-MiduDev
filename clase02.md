# :book: React desde cero con Midu Dev * Clase 2

---

## Hacemos el segundo proyecto * Ta- Te- Ti (Tic-Tac-Toe)

Va a ser un **Tablero**(**board**) con **9** posiciones, las cuales van a tener como valor: **x** ó **o**.

- Necesitamos un **state** para saber **de quien es el turno**

- Cambiar al componente hijo dependndiendo dle estado del componente padre, para ello con **isSelected** voy a modificar el **className** y asi muestro a quien le tocara el turno.

- En el componente `<Square />`tenemos **updateBoard()**, es la función más importante que ...

... actualiza estados

... ve de quien es el turno

... ve quien es el ganador

-> Se pasa la función (sin los parentesis), no la ejecución de la función(si va con los parentesis se manda la ejecucion de la funcion y se ejecutara al momento)

---
