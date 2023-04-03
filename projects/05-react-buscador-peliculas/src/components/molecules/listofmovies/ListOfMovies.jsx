import React from "react";
import "./ListOfMovies.css";
import Movie from "../../atoms/movie/Movie";

const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
    </ul>
  );
};

export default ListOfMovies;
