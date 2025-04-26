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
            id: movie.id,
            title: movie.title,
            year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
            rating: movie.vote_average || 0,
            
    </div>
  );
}   

export default MovieList;