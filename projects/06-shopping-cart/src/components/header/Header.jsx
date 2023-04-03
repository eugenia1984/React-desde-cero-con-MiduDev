import React from "react";
import Filters from "../filters/Filters";
import { AddToCartIcon } from "../Icons";

const Header = () => {
  return (
    <header>
      <h1>React shop <AddToCartIcon /></h1>
      <Filters />
    </header>
  );
};

export default Header;
