import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import WatchlistForm from "./components/WatchListForm";
import Watchlist from "./components/Watchlist";
import Login from "./components/Login"; // New login component
import "./styles/styles.css";

// Your API keys
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || "2d637dbf484354be7e25d40eb3f0daf8";
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token") || null, // Check for token in localStorage
  });

  // Fetch popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Fetch watchlist from backend
  useEffect(() => {
    if (auth.token) {
      const fetchWatchlist = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/watchlist`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setWatchlist(response.data);
        } catch (err) {
          console.error("Failed to fetch watchlist:", err);
        }
      };
      fetchWatchlist();
    }
  }, [auth.token]);

  // Add movie to watchlist and re-fetch the updated list
  const addMovie = async (newMovie) => {
    try {
      const configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(newMovie),
      };
      await fetch(`http://localhost:3000/watchlist`, configObj);

      // After adding, fetch the updated watchlist from the backend
      const response = await axios.get("http://localhost:3000/watchlist", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setWatchlist(response.data);
    } catch (err) {
      console.error("Failed to add movie:", err);
    }
  };

  // Login handler
  const handleLogin = (user, token) => {
    setAuth({ user, token });
    localStorage.setItem("token", token); // Store token in localStorage
  };

  // Logout handler
  const handleLogout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // Protect routes with authentication
  const ProtectedRoute = ({ children }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Header user={auth.user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MovieList movies={movies} loading={loading} error={error} />} />
        <Route path="/add" element={<ProtectedRoute><WatchlistForm addMovie={addMovie} /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist watchlist={watchlist} /></ProtectedRoute>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
