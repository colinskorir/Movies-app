import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} onError={(e) => (e.target.src = "https://via.placeholder.com/150")} />
      <h3>{movie.title}</h3>
      <p>Year: {movie.year}</p>
      <p>Rating: {movie.rating.toFixed(1)}</p>
      <div className="hover-overlay">
        <h4>{movie.title}</h4>
        <p>Year: {movie.year}</p>
        <p>Rating: {movie.rating.toFixed(1)}</p>
        <p>Overview: {movie.overview || "No overview available"}</p>
      </div>
    </div>
  );
}

export default MovieCard;