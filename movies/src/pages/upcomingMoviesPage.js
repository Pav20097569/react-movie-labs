import React, { useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; 
import { MoviesContext } from '../contexts/moviesContext';

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcomingMovies", () => getUpcomingMovies(1));
  const { addToMustWatch } = useContext(MoviesContext); 

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error fetching upcoming movies:", error);
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  if (!movies || movies.length === 0) {
    return <h1>No upcoming movies found.</h1>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
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

export default UpcomingMoviesPage;
