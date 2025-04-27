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

