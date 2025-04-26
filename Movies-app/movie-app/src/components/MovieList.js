import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, loading, error }) {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    

export default MovieList;