const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 3000;

let watchlist = [
  { id: 1, title: "Inception", year: "2010", rating: 8.8, poster: "https://image.tmdb.org/t/p/w200/abc123.jpg" },
  { id: 2, title: "The Dark Knight", year: "2008", rating: 9.0, poster: "https://image.tmdb.org/t/p/w200/xyz456.jpg" }
];

// Example user data (you should use a real database in production)
const users = [
  { id: 1, username: "user1", password: "$2a$10$T4uMvziJMGbEMO1z6G2uM.teUbM7nwr5LwHG7vY9HQl5wkcZj7hyu" } // password is "password123"
];

app.use(express.json());
app.use(cors());

// Helper function to authenticate user
const authenticateUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) return null;

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return null;

  const token = jwt.sign({ id: user.id, username: user.username }, "your-secret-key", { expiresIn: "1h" });
  return { user, token };
};

// Route to login (authentication)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const result = authenticateUser(username, password);
  
  if (!result) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ user: result.user, token: result.token });
});

// Middleware to authenticate user using JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

// Protect the watchlist routes with authentication
app.get("/watchlist", authenticateToken, (req, res) => {
  res.json(watchlist);
});

app.post("/watchlist", authenticateToken, (req, res) => {
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
