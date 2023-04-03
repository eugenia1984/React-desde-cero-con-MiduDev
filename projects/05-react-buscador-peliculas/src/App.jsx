import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";
import Title from "./components/atoms/title/Title";
import { errorSearchMessage } from "./utils/errorSearchMessage";
import SectionMovies from "./components/containers/sectionmovies/SectionMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError(errorSearchMessage.noNull);
      return;
    }

    if (search.match(/^\d+$/)) {
      setError(errorSearchMessage.noNumber);
      return;
    }

    if (search.length < 3) {
      setError(errorSearchMessage.minLenght);
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <Title headline="Movie's search" />
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <span><input type="checkbox" onChange={handleSort} checked={sort} /> Alphabetical order</span>
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <SectionMovies loading={loading} movies={movies} />
    </div>
  );
}

export default App;
