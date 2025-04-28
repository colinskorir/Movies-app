import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, loading, error }) {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">Popular Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
              rating: movie.vote_average || 0,
              poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : "https://via.placeholder.com/150",
              overview: movie.overview,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
