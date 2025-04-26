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
      const configObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/watchlist`, configObj);
      const newMovie = await response.json();
      addMovie(newMovie);
      setFormData({ title: "", year: "", rating: "", poster: "" });
    } catch (err) {
      console.error("Failed to add movie:", err);
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
       
      </form>
    </div>
  );
}

export default WatchlistForm;