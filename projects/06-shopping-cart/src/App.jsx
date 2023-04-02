import "./App.css";
import Products from "./components/products/Products";
import { products } from "./mocks/products.json";

function App() {
  return <Products products={products} />;
}

export default App;
