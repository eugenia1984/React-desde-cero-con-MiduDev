import React from "react";
import "./Products.css";
import { AddToCartIcon } from "../Icons.jsx";
import { useCart } from "../../hooks/useCart";

const Products = ({ products }) => {
  const { addToCart, cart } = useCart();

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong> - $ {product.price}
            </div>
            <div>
              <button>
                <AddToCartIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Products;
