import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import MovieCredits from "../components/credits"; // Adjust path as needed
import { getMovie, getMovieCredits } from "../api/tmdb-api";  // Import both getMovie and getMovieCredits


//import useMovie from "../hooks/useMovie";

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );


    // Fetch movie credits (cast and crew)
    const { data: credits, isLoading: creditsLoading, isError: creditsError } = useQuery(
      ['movie', { id: id, endpoint: 'credits' }],
      getMovieCredits
    );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <MovieCredits credits={credits} /> {/* Render credits */}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;