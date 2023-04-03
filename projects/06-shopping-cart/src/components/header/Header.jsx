import React from "react";
import Filters from "../filters/Filters";
import { AddToCartIcon } from "../Icons";

const Header = ({ changeFilters }) => {
  return (
    <header>
      <h1>
        React shop <AddToCartIcon />
      </h1>
      <Filters onChange={changeFilters} />
    </header>
  );
};

export default Header;
