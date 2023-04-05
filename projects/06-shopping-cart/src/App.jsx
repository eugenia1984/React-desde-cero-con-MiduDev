import React from "react";
import { useFilters } from "./hooks/useFilters";
import { products as initialProducts } from "./mocks/products.json";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Footer from "./components/footer/Footer";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./context/cart";
import "./App.css";

function App() {
  const { filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Cart />
      <Header />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  );
}

export default App;
