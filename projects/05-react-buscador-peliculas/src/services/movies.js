const API_KEY = "9cd02dc3";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const json = await response.json();
    console.log("JSON -> ", json);
    const movies = json.search;
    console.log("movies", movies);

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error searching movies");
  }
};
