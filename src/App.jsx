import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./css/common.css";
import "./css/home.css";
import logo from "./assets/logo.png";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-main-container">
      <p className="game-intro">
        Welcome to Battleship Game! <br />
        Strategically place your fleet, aim your shots, and sink your opponent’s
        ships before they sink yours.
      </p>
      <p className="game-invite">
        Let's test your tactical skills in our naval combat game.
      </p>
      <button className="play-btn" onClick={() => navigate("/game/normal")}>
        Normal Game
      </button>
      <button className="play-btn" onClick={() => navigate("/game/easy")}>
        Free Play
      </button>
      <button className="rules-btn" onClick={() => navigate("/rules")}>
        New to the Game?
      </button>
    </div>
  );
}

function App() {
  const closeMenu = () => {
    const menuToggle = document.getElementById("menuToggle");
    if (menuToggle) menuToggle.checked = false; // Uncheck checkbox
  };

  return (
    <div>
      <header>
        <h1 className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Logo" />
          </Link>
        </h1>

        {/* Mobile Navigation Toggle */}
        <input type="checkbox" id="menuToggle" />
        <label htmlFor="menuToggle">☰ Menu</label>

        <nav>
          <label htmlFor="menuToggle">Close</label>
          <ul>
            <li>
              <Link to="/" className="active" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/game/normal" onClick={closeMenu}>
                Play Game
              </Link>
            </li>
            <li>
              <Link to="/rules" onClick={closeMenu}>
                Game Rules
              </Link>
            </li>
            <li>
              <Link to="/highscores" onClick={closeMenu}>
                High Scores Rank
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:mode" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/highscores" element={<HighScores />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
