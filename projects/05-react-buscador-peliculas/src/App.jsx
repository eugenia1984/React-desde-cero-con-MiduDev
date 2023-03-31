import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies.js";
import HasMovies from "./components/HasMovies";
import "./App.css";

function App() {
  const { movies } = useMovies();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ query });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (newQuery.match(/^⧹d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (newQuery.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
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
            value={query}
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
