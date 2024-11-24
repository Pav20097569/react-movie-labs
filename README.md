# Assignment 1 - ReactJS app.

Name: Pawel Jaglarz

## Overview.
This assignment is a progression of the lab work done in class and adding additional features to a movie app using the TMDB database to create the app


### Features.

+ Static Endpoint for Popular Movies
+ Static Endpoint for Weekly Trending Movies
+ Pagination on all available pages
+ Cast Feature searching actors on google when clicked
+ Cast list when actor clicked shows related movies page (parameterized endpoint)
+ Recommended movies based on user's movie picked
+ Dark Mode 
+ Firebase Authentication
+ Search Feature

## Setup requirements.
+ npm install
+ npm install firebase
## API endpoints.

+ person/${actorId}/movie_credits  - Movies Actors Starred In
+ search/movie? - Movie Search
+ movie/${movieId}/recommendations? - Movie Recommendations
+ trending/movie/week? - Weekly Trending Movies
+ movie/${id}/credits? - Used to Show Actor Cards
+ movie/popular? - Popular Movies Currently



## Routing.

[ List the __new routes__ supported by your app and state the associated page.]


+ Google Search of Actors
+ /actor/:id - Displays Specific Actors Movies
+ /search/:query - Displays Searched Movies
+ /recommendations/:id - Displays Recommended Movies
+ /movies/trending - Displays Trending Movies
+ /movies/popular - Displays Popular Movies
