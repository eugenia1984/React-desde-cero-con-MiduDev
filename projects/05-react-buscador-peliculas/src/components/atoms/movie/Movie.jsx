import React from "react";

const Movie = (movie) => {
  const { id, title, year, image } = movie;
  
  return (
    <li className="movie" key={id}>
      <h3>{title}</h3>
      <p>{year}</p>
      <img src={image} alt={title} />
    </li>
  );
};

export default Movie;
