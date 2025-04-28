import React, { useState } from "react";

function WatchlistForm({ addMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    rating: "",
    poster: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the new movie object
      const newMovie = {
        title: formData.title,
        year: formData.year,
        rating: formData.rating,
        poster: formData.poster,
      };

      console.log("Adding movie:", newMovie);  // Debugging line

      // Send POST request to backend to save movie
      const response = await fetch("http://localhost:3001/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      // Get the new movie from the backend response
      const addedMovie = await response.json();

      // Update the frontend with the newly added movie
      addMovie(addedMovie);

      // Reset the form after submission
      setFormData({ title: "", year: "", rating: "", poster: "" });
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  return (
    <div className="watchlist-form">
      <h2>Add Movie to Watchlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Movie Title"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Release Year"
          required
        />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (0-10)"
          step="0.1"
          min="0"
          max="10"
          required
        />
        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          placeholder="Poster URL"
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default WatchlistForm;
