import React, { useContext } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; 
import { MoviesContext } from '../contexts/moviesContext';

const PopularMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("popularMovies", () => getPopularMovies(1));
  const { addToMustWatch } = useContext(MoviesContext); 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error fetching Popular movies:", error);
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  if (!movies || movies.length === 0) {
    return <h1>No Popular movies found.</h1>;
  }

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon 
          onClick={() => addToMustWatch(movie.id)} 
          style={{ cursor: 'pointer' }} 
        />
      )}
    />
  );
};

export default PopularMoviesPage;
