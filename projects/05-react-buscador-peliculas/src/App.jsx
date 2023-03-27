import "./App.css";
import responseMovies from "./mocks/with-results.json";
import withoutResults from "./mocks/no-results.json";
import HasMovies from "./components/HasMovies";

function App() {
  const movies = responseMovies.Search;

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
