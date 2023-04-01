import ListOfMovies from "./ListOfMovies";
import NoMoviesResult from "./NoMoviesResult";

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
};

export default Movies;
