import React from "react";
import Movies from "../../molecules/movies/Movies";
import "./SectionMovies.css";

const SectionMovies = ({ loading, movies }) => {
  return (
    <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
  );
};

export default SectionMovies;
