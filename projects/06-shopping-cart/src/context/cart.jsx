import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // checked if the product is already in the cart
    const productInCartIndex = cart.findIndexitem(
      (item) => item.id === product.id
    );

    if(productInCartIndex >= 0) {
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      setCart(newCart)
    }

    // if product is not in cart
    setCart(preState => {[
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]})
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={(Cart, addToCart, clearCart)}>
      {children}
    </CartContext.Provider>
  );
}
