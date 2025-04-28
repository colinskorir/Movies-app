import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {  // Use onLogout instead of setUser
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    onLogout();  // Call onLogout prop passed from App.js
    navigate("/login");  // Redirect to login page
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Movie Flex</h1>
      </div>
      <nav>
        {/* Show these links only if the user is logged in */}
        {user ? (
          <div className="nav-links">
            <Link to="/">Movies</Link>
            <Link to="/add">Add Movie</Link>
            <Link to="/watchlist">Watchlist</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          // If user is not logged in, show login link
          <div className="nav-links">
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
