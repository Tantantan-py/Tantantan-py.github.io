import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/common.css";
import "../css/game.css";

const SHIP_SIZES = [5, 4, 3, 3, 2];

function createEmptyBoard() {
  return Array(100).fill("");
}

function placeShips(board) {
  const newBoard = [...board];
  for (let size of SHIP_SIZES) {
    let placed = false;
    while (!placed) {
      const horizontal = Math.random() < 0.5;
      if (horizontal) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * (10 - size + 1));
        let canPlace = true;
        for (let i = 0; i < size; i++) {
          if (newBoard[row * 10 + col + i] === "ship") {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < size; i++) {
            newBoard[row * 10 + col + i] = "ship";
          }
          placed = true;
        }
      } else {
        const col = Math.floor(Math.random() * 10);
        const row = Math.floor(Math.random() * (10 - size + 1));
        let canPlace = true;
        for (let i = 0; i < size; i++) {
          if (newBoard[(row + i) * 10 + col] === "ship") {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          for (let i = 0; i < size; i++) {
            newBoard[(row + i) * 10 + col] = "ship";
          }
          placed = true;
        }
      }
    }
  }
  return newBoard;
}

function checkVictory(board) {
  return board.indexOf("ship") === -1;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function Game() {
  const { mode } = useParams();
  // Debugging: log the mode from the URL
  // console.log("Game mode from URL:", mode);
  // gameMode will be "normal" or "easy" (free play).
  const gameMode = mode ? mode.toLowerCase() : "normal";
  // Debugging: log the resolved gameMode
  // console.log("Resolved gameMode:", gameMode);

  const [playerBoard, setPlayerBoard] = useState([]);
  const [enemyBoard, setEnemyBoard] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("player");
  const [message, setMessage] = useState("Your turn");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const restartGame = () => {
    setGameOver(false);
    setWinner("");
    setMessage("Your turn");
    setCurrentTurn("player");
    setTimeElapsed(0);
    const initPlayerBoard = placeShips(createEmptyBoard());
    const initEnemyBoard = placeShips(createEmptyBoard());
    setPlayerBoard(initPlayerBoard);
    setEnemyBoard(initEnemyBoard);
  };

  // update title
  useEffect(() => {
    restartGame();
    document.title = `Battleship - ${
      gameMode === "normal"
        ? "Normal Game"
        : gameMode === "easy"
        ? "Free Play"
        : "Play Game"
    }`;
  }, [gameMode]);

  // Check victory
  useEffect(() => {
    if (playerBoard.length !== 100 || enemyBoard.length !== 100) return;
    if (checkVictory(enemyBoard)) {
      setWinner("Player");
      setGameOver(true);
    } else if (gameMode === "normal" && checkVictory(playerBoard)) {
      setWinner("AI");
      setGameOver(true);
    }
  }, [playerBoard, enemyBoard, gameMode]);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    const timerId = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [gameOver]);

  const handleEnemyCellClick = (index) => {
    if (gameOver || currentTurn !== "player") return;
    if (enemyBoard[index] === "hit" || enemyBoard[index] === "miss") return;

    const newEnemyBoard = [...enemyBoard];
    if (newEnemyBoard[index] === "ship") {
      newEnemyBoard[index] = "hit";
      setMessage("Hit!");
    } else {
      newEnemyBoard[index] = "miss";
      setMessage("Miss!");
    }
    setEnemyBoard(newEnemyBoard);

    setCurrentTurn("ai");
    setTimeout(aiTurn, 1000);
  };

  const aiTurn = () => {
    if (gameOver) return;
    const availableIndices = [];
    playerBoard.forEach((cell, index) => {
      if (cell !== "hit" && cell !== "miss") {
        availableIndices.push(index);
      }
    });
    if (availableIndices.length === 0) return;

    const randomIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
    const newPlayerBoard = [...playerBoard];
    if (newPlayerBoard[randomIndex] === "ship") {
      newPlayerBoard[randomIndex] = "hit";
      setMessage("AI hit your ship! Your turn.");
    } else {
      newPlayerBoard[randomIndex] = "miss";
      setMessage("AI missed! Your turn.");
    }
    setPlayerBoard(newPlayerBoard);
    setCurrentTurn("player");
  };

  const renderPlayerCell = (cell) => {
    if (cell === "hit") return "✔";
    if (cell === "miss") return "X";
    if (cell === "ship") return "⛴️";
    return "";
  };

  function getEnemyCellProps(cell) {
    if (cell === "hit") return { display: "✔", className: "hit" };
    if (cell === "miss") return { display: "X", className: "miss" };
    if (cell === "ship") {
      if (gameMode === "easy") {
        return { display: "•", className: "ship" }; // show ship with a dot
      } else {
        return { display: "", className: "" }; // hide in normal mode
      }
    }
    return { display: "", className: "" };
  }

  return (
    <main className="game-main-container">
      <div className="game-header">
        {gameOver && <h1>Game over! {winner} Won!</h1>}
        <button onClick={restartGame}>Reset</button>
        <div className="timer">Time Elapsed: {formatTime(timeElapsed)}</div>
      </div>

      <p>{message}</p>
      <div className="boards-container">
        <div className="board-section">
          <h2>Your Board</h2>
          <div className="game-board player-board">
            {playerBoard.map((cell, index) => (
              <div key={index} className={`cell ${cell}`}>
                {renderPlayerCell(cell)}
              </div>
            ))}
          </div>
        </div>

        <div className="board-section">
          <h2>Enemy Board {gameMode === "easy" && "(Easy Mode)"}</h2>
          <div className="game-board enemy-board">
            {enemyBoard.map((cell, index) => {
              const { display, className } = getEnemyCellProps(cell);
              return (
                <div
                  key={index}
                  className={`cell ${className}`}
                  onClick={() => handleEnemyCellClick(index)}
                >
                  {display}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Game;
