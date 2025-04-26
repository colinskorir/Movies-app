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

 
}

export default WatchlistForm;