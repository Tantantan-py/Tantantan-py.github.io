import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGameContext } from "../context/GameContext";
import Board from "../components/Board";
import "../css/game.css";
import { formatTime } from "../utils/formatTime";

function Game() {
  const { mode } = useParams();
  const {
    timeElapsed,
    setTimeElapsed,
    gameOver,
    winner,
    resetGame,
    message,
    setGameMode,
  } = useGameContext();

  useEffect(() => {
    if (gameOver) return;
    const timerId = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [gameOver]);

  useEffect(() => {
    setGameMode(mode ? mode.toLowerCase() : "normal");
  }, [mode]);

  return (
    <main className="game-main-container">
      <div className="game-header">
        {gameOver && <h1>Game over! {winner} Won!</h1>}
        <button onClick={resetGame}>Reset</button>
        <div className="timer">Time Elapsed: {formatTime(timeElapsed)}</div>
        <p className="game-message">{message}</p>
      </div>

      <div className="boards-container">
        <div className="board-section">
          <h2>Your Board</h2>
          <Board type="player" />
        </div>
        <div className="board-section">
          <h2>Enemy Board</h2>
          <Board type="enemy" />
        </div>
      </div>
    </main>
  );
}

export default Game;
