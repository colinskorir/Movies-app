const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

let watchlist = [
  { id: 1, title: "Inception", year: "2010", rating: 8.8, poster: "https://image.tmdb.org/t/p/w200/abc123.jpg" },
  { id: 2, title: "The Dark Knight", year: "2008", rating: 9.0, poster: "https://image.tmdb.org/t/p/w200/xyz456.jpg" }
];

app.use(express.json());

app.use(cors());

app.get("/watchlist", (req, res) => {
  res.json(watchlist);
});

app.post("/watchlist", (req, res) => {
  const { title, year, rating, poster } = req.body;
  
  if (!title || !year || !rating || !poster) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMovie = {
    id: watchlist.length + 1,
    title,
    year,
    rating,
    poster,
  };

  watchlist.push(newMovie);
  res.status(201).json(newMovie);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
