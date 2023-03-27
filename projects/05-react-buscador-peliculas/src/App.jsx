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
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query === "") {
      setError("No se puede buscar una pelícua vacía");
      return;
    }

    if (query.match(/^⧹d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (query.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }
  }, [query]);

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
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
