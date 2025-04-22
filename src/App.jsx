import { Route, Routes } from "react-router-dom";
import "./css/common.css";
import "./css/home.css";
import "./css/game.css";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home";
import Game from "./pages/Game";
import Rules from "./pages/Rules";
import HighScores from "./pages/HighScores";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:mode" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/highscores" element={<HighScores />} />
        </Routes>
      </main>
    </GameProvider>
  );
}

export default App;
