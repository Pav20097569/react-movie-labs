import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const HomePage = (props) => {

  const MOVIES_PER_PAGE = 10; 
  const[page, setPage] = useState(1); // Manage Current Page State

  const {  data, error, isLoading, isError }  = useQuery(['discover', { page }], getMovies)

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
    
  const movies = data.results;

   // Calculate the movies to display on the current page
   const startIndex = (page - 1) * MOVIES_PER_PAGE;
   const endIndex = startIndex + MOVIES_PER_PAGE;
   const displayedMovies = movies.slice(startIndex, endIndex);

   const handleNextPage = () => {
    if (endIndex < movies.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  };


  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <div>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies} // Pass only the limited movies to PageTemplate
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={handleNextPage} disabled={endIndex >= movies.length}>
          Next
        </button>
      </div>
    </div>
  );
};
export default HomePage;
