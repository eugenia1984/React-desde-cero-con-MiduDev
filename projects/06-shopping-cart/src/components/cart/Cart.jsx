import React, { useId } from "react";
import { CartIcon, ClearCartIcon } from "../Icons";
import { useCart } from "../../hooks/useCart";
import "./Cart.css";

function CartItem({ thumbnail, price, title, quantity, addToCart}) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden></input>
      <aside className="cart">
        <ul>
          {
            cart.map(product => (
              <CartItem 
                key={product.id} 
                addToCart={() => addToCart(product)}
                {...product}

                />
            ))
          }
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
};

export default Cart;
