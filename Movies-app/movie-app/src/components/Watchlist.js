import React from "react";

function Watchlist({ watchlist }) {
  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>
                  {movie.year} | Rating: {movie.rating}/10
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-message">Your watchlist is empty!</p>
      )}
    </div>
  );
}

export default Watchlist;
