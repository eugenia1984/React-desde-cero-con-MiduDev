import React, { useState } from "react";
import "./Filters.css";

const Filters = () => {
  const [minPrice, setMinPrice] = useState(0);
  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
  }

  return (
    <section className="filters">
      <div>
        <label htlmFor="price">Minimum price :</label>
        <input
          type="range"
          id="price"
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        ></input>
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor="category">Category :</label>
        <select id="category">
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smart Phones</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
