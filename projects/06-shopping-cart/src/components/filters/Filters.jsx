import React, { useState, useId } from "react";
import "./Filters.css";

const Filters = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState(0);

  const handleChangeMinPrice = (event) => {
    // Aqui algo huele mal
    // DOS FUENTES DE LA VERDAD
    setMinPrice(event.target.value);
    onChange((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    // Esto huele mal
    // estamos pasando la funcionde actualizar estado
    // nativa de React a un componente hijo
    onChange((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htlmFor="price">Minimum price :</label>
        <input
          type="range"
          id="price"
          min="0"
          max="1400"
          onChange={handleChangeMinPrice}
        ></input>
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor="category">Category :</label>
        <select id="category" onChange={handleChangeCategory}>
          <option value="all">All</option>
          <option value="laptops">Laptops</option>
          <option value="smartphones">Smart Phones</option>
        </select>
      </div>
    </section>
  );
};

export default Filters;
