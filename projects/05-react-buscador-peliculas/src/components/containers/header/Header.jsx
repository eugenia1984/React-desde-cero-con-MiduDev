import React, { useState, useCallback } from "react";
import Title from "../../atoms/title/Title";
import { useSearch } from "../../../hooks/useSearch";
import { useMovies } from "../../../hooks/useMovies";
import debounce from "just-debounce-it";

const Header = () => {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { errorSearchMovies, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
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
        <input type="checkbox" onChange={handleSort} checked={sort} />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
    </header>
  );
};

export default Header;
