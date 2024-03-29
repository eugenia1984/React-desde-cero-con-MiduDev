import React from "react";
import { IS_DEVELOPMENT } from "../../config";
import "./Footer.css";
import { useFilters } from "../../hooks/useFilters";

const Footer = () => {
  const { filters } = useFilters();

  return (
    <footer className="footer">
      <h4>Prueba técnica de React ⚛️</h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  );
};

export default Footer;
