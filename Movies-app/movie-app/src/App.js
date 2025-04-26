import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import WatchlistForm from "./components/WatchlistForm";
import Watchlist from "./components/Watchlist";
import "./styles/styles.css";

// Define constants outside the component
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || "2d637dbf484354be7e25d40eb3f0daf8";
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const addMovie = (newMovie) => {
    setWatchlist([...watchlist, newMovie]);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList movies={movies} loading={loading} error={error} />} />
        <Route path="/add" element={<WatchlistForm addMovie={addMovie} />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
      </Routes>
    </Router>
  );
}

export default App;