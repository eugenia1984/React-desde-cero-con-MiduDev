import { useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorSearchMovies, setErrorSearchMovies] = useState(null);

  const getMovies = async () => {
    try {
      setLoading(true);
      setErrorSearchMovies(null);
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, errorSearchMovies, loading };
}
