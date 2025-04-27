import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Movie Flex</h1>
      <nav>
        <Link to="/">Movies</Link>
        <Link to="/add">Add Movie</Link>
        <Link to="/watchlist">Watchlist</Link>
      </nav>
    </header>
  );
}

export default Header;
// This code defines a functional component called Header that renders a header section for a movie application.
// The header includes a title "Movie Flex" and a navigation menu with links to different pages: Movies, Add Movie, and Watchlist.
