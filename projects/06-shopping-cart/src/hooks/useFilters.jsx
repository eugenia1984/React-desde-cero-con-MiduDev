import React, { useState } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters (products) {
  // const [filters, setFilters] = useState({
  //   category: "all",
  //   minPrice: 0,
  // });
  const filters = useContext(FiltersContext)
  console.log(filters)
  const setFilters = () => {}
  
  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category)
      );
    });
  };

  return { filters, filterProducts, setFilters}
}