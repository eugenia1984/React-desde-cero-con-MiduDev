import React, { useState, useCallback } from "react";
import Title from "../../atoms/title/Title";
import { useSearch } from "../../../hooks/useSearch";
import { useMovies } from "../../../hooks/useMovies";
import debounce from "just-debounce-it";
import SectionMovies from "../sectionmovies/SectionMovies";

const Header = () => {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, loading, errorSearchMovies, getMovies } = useMovies({
    search,
    sort,
  });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    console.log("getMovies({ search })", getMovies({ search }));
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
    <>
      <header>
        <Title text="Movie Search" />
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
      <SectionMovies loading={loading} movies={movies} />
    </>
  );
};

export default Header;
