import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const UpcomingMoviesPage = () => {

  const { data, error, isLoading, isError } = useQuery("upcomingMovies", () => getUpcomingMovies(1));

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


  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
