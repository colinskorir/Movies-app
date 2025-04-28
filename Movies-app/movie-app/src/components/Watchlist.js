import React from "react";

function Watchlist({ watchlist }) {
  return (
    <div className="watchlist">
      <h2>My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
              <p>
                {movie.year} | Rating: {movie.rating}/10
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your watchlist is empty!</p>
      )}
    </div>
  );
}

export default Watchlist;
