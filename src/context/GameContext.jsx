import React, { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

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

      const row = horizontal
        ? Math.floor(Math.random() * 10)
        : Math.floor(Math.random() * (10 - size + 1)); // ✅ vertical placement: constrain rows

      const col = horizontal
        ? Math.floor(Math.random() * (10 - size + 1)) // ✅ horizontal placement: constrain cols
        : Math.floor(Math.random() * 10);

      let canPlace = true;

      for (let i = 0; i < size; i++) {
        const index = horizontal ? row * 10 + col + i : (row + i) * 10 + col;
        if (newBoard[index] === "ship") {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < size; i++) {
          const index = horizontal ? row * 10 + col + i : (row + i) * 10 + col;
          newBoard[index] = "ship";
        }
        placed = true;
      }
    }
  }
  return newBoard;
}

function checkVictory(board) {
  return board.every((cell) => cell !== "ship");
}

export function GameProvider({ children }) {
  const [playerBoard, setPlayerBoard] = useState(
    placeShips(createEmptyBoard())
  );
  const [enemyBoard, setEnemyBoard] = useState(placeShips(createEmptyBoard()));
  const [currentTurn, setCurrentTurn] = useState("player");
  const [message, setMessage] = useState("Your turn");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameMode, setGameMode] = useState("normal");

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
    setTimeout(aiTurn, 500);
  };

  const aiTurn = () => {
    const available = playerBoard
      .map((cell, i) => (cell !== "hit" && cell !== "miss" ? i : null))
      .filter((i) => i !== null);

    if (available.length === 0) return;

    const target = available[Math.floor(Math.random() * available.length)];
    const newPlayerBoard = [...playerBoard];
    if (newPlayerBoard[target] === "ship") {
      newPlayerBoard[target] = "hit";
      setMessage("AI hit your ship!");
    } else {
      newPlayerBoard[target] = "miss";
      setMessage("AI missed!");
    }
    setPlayerBoard(newPlayerBoard);
    setCurrentTurn("player");
  };

  const resetGame = () => {
    setGameOver(false);
    setWinner("");
    setMessage("Your turn");
    setCurrentTurn("player");
    setTimeElapsed(0);
    setPlayerBoard(placeShips(createEmptyBoard()));
    setEnemyBoard(placeShips(createEmptyBoard()));
  };

  useEffect(() => {
    if (playerBoard.length !== 100 || enemyBoard.length !== 100) return;

    if (checkVictory(enemyBoard)) {
      setWinner("Player");
      setMessage("You sank all enemy ships!");
      setGameOver(true);
    } else if (gameMode === "normal" && checkVictory(playerBoard)) {
      setWinner("AI");
      setMessage("Your fleet has been sunk!");
      setGameOver(true);
    }
  }, [playerBoard, enemyBoard, gameMode]);

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        setPlayerBoard,
        enemyBoard,
        setEnemyBoard,
        currentTurn,
        setCurrentTurn,
        message,
        setMessage,
        gameOver,
        setGameOver,
        winner,
        setWinner,
        timeElapsed,
        setTimeElapsed,
        handleEnemyCellClick,
        aiTurn,
        resetGame,
        gameMode,
        setGameMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
