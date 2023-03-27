import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import HasMovies from "./components/HasMovies";

function App() {
  const { movies } = useMovies();

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form">
          <label>Movie name:</label>
          <input placeholder="Avengers, Star Wars, The Matrix..." />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <HasMovies movies={movies} />
      </main>
    </div>
  );
}

export default App;
