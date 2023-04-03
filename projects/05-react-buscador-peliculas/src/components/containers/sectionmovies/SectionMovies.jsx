import React from "react";
import { Movies } from "../movies/Movies";

const SectionMovies = ({ movies, loading }) => {
  return (
    <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
  );
};

export default SectionMovies;
