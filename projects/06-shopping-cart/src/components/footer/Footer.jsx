import React from "react";
import { IS_DEVELOPMENT } from "../../config";
import "./Footer.css";

const Footer = ({ filters }) => {
  return (
    <footer className="footer">
      <p>Filters: {IS_DEVELOPMENT && JSON.stringify(filters, null, 2)}</p>
      <h4>Prueba técnica de React ⚛️</h4>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  );
};

export default Footer;