import withoutResults from "../mocks/no-results.json";
import { useState } from "react";

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([]);
  const movies = responseMovies.Search;

  const mapedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
  }));

  const getMovies = () => {
    if (search) {
      fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
        .then((res) => res.json())
        .then((json) => {
          setResponseMovies(json);
        });
    } else {
      setResponseMovies(withoutResults);
    }
  };
  return { movies: mapedMovies, getMovies };
}
