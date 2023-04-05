import React, { useId } from "react";
import { CartIcon, ClearCartIcon } from "../Icons";
import "./Cart.css";

const Cart = () => {
  const cartCheckboxId = useId();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden></input>
      <aside className="cart">
        <ul>
          <li>
            <img
              src="	https://i.dummyjson.com/data/products/6/thumbnail.png"
              alt="laptop"
            />
            <div>
              <strong>laptop</strong> - $1749
            </div>
            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
};

export default Cart;
