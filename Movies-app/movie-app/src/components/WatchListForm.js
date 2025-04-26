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
    
      </form>
    </div>
  );
}

export default WatchlistForm;