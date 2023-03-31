import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";
import HasMovies from "./components/HasMovies";
import "./App.css";

function App() {
  const { movies } = useMovies();
  const { search, setSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearch(newQuery);
  };

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
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
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>
        <HasMovies movies={movies} />
      </main>
    </div>
  );
}

export default App;
