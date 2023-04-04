import React from "react";
import ReactDOM from "react-dom/client";
import { FiltersProvider } from "./context/filters";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
);
