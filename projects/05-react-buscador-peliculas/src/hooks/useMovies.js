import { useState, useRef, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorSearchMovies, setErrorSearchMovies] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    console.log("search en getMovies", search);
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      console.log("newMovies", newMovies);
      setMovies(newMovies);
    } catch (e) {
      setErrorSearchMovies(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading, errorSearchMovies };
}
