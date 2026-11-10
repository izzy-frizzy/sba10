import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

export default function Navbar() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const onSubmit = (e) => {
    e.preventDefault();
    const q = term.trim();
    if (q) navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">Pantry Pages</Link>
        <form onSubmit={onSubmit} className="search" role="search">
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search recipes"
            aria-label="Search recipes by name"
          />
          <button type="submit" className="btn">Search</button>
        </form>
        <nav>
          <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
        </nav>
      </div>
    </header>
  );
}