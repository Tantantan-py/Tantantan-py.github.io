import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header>
      <h1 className="logo">
        <Link to="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
      </h1>

      {/* Mobile Menu Toggle */}
      <input type="checkbox" id="menuToggle" />
      <label htmlFor="menuToggle">☰</label>

      <nav>
        <ul>
          <li>
            <Link to="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/game/normal"
              className={pathname.startsWith("/game") ? "active" : ""}
            >
              Play Game
            </Link>
          </li>
          <li>
            <Link to="/rules" className={pathname === "/rules" ? "active" : ""}>
              Game Rules
            </Link>
          </li>
          <li>
            <Link
              to="/highscores"
              className={pathname === "/highscores" ? "active" : ""}
            >
              High Scores
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
