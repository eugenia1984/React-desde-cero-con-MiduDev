import { useState } from "react";

export function useFilters (products) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });
  
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