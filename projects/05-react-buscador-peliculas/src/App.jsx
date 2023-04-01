import React from "react";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";
import SectionMovies from "./components/containers/sectionmovies/SectionMovies.jsx";
import "./App.css";
import Header from "./components/containers/header/Header.jsx";

function App() {
  const { search } = useSearch();
  const { movies, loading } = useMovies({
    search,
  });

  return (
    <div className="page">
      <Header />
      <SectionMovies loading={loading} movies={movies} />
    </div>
  );
}

export default App;
