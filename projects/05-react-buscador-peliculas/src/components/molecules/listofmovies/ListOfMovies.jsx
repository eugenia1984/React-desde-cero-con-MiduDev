import React from "react";

const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie, index) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
};

export default ListOfMovies;
