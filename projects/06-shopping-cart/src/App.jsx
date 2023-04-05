import React from "react";
import { useFilters } from "./hooks/useFilters";
import { products as initialProducts } from "./mocks/products.json";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Footer from "./components/footer/Footer";
import "./App.css";
import Cart from "./components/cart/Cart";

function App() {
  const { filters, filterProducts } = useFilters();

  const filteredProducts = filterProducts(initialProducts);

  return (
    <>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </>
  );
}

export default App;
