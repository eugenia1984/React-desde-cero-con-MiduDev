import ListOfMovies from "../../atoms/listofmovies/ListOfMovies";
import NoMoviesResult from "../../atoms/nomoviesresult/NoMoviesResult";

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
};

export default Movies;
