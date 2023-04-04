import React, { useState } from "react";
import { useFilters} from "./hooks/useFilters";
import { products as initialProducts } from "./mocks/products.json";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Footer from "./components/footer/Footer";
import "./App.css";

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

export default App;
