import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, loading, error }) {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
 <div className="movie-list">
      <h2>Popular Movies</h2>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={{
            
    </div>
  );
}   

export default MovieList;