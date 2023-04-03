import React from "react";
import NoMoviesResults from "../atoms/nomoviesresults/NoMoviesResults";
import ListOfMovies from "../molecules/listofmovies/ListOfMovies";


export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? (
    <ListOfMovies movies={movies} />
  ) : (
    <NoMoviesResults noMoviesResultsMessage="No movies were found for this search." />
  );
}
