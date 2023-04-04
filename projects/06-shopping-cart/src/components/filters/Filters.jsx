import React, { useId } from "react";
import { useFilters } from "../../hooks/useFilters";
import "./Filters.css";

const Filters = () => {
  const { filters, setFilters } = useFilters();
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    // Esto huele mal
    // estamos pasando la funcionde actualizar estado
    // nativa de React a un componente hijo
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htlmFor={minPriceFilterId}>Minimum price:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1400"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        ></input>
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category:</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smart Phones</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
