import React from "react";
import Title from "../../atoms/title/Title";
import { useSearch } from "../../../hooks/useSearch";
import { useMovies } from "../../../hooks/useMovies";

const Header = () => {
  const { search, setSearch, error } = useSearch();
  const { errorSearchMovies, getMovies } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearch(newQuery);
  };

  return (
    <header>
      <Title />
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
  );
};

export default Header;
