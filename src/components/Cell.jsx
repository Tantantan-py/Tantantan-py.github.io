import React from "react";
import { useGameContext } from "../context/GameContext";

function Cell({ index, type, value }) {
  const { handleEnemyCellClick, gameOver, gameMode } = useGameContext();

  const shouldShowShips = type === "player" || gameMode === "easy";

  // Decide what icon to render
  const renderContent = () => {
    if (value === "hit") return "✔";
    if (value === "miss") return "X";
    if (value === "ship") {
      if (shouldShowShips) {
        return type === "player" ? "⛴️" : "•";
      }
      return "";
    }
    return "";
  };

  let statusClass = "";
  if (value === "hit") statusClass = "hit";
  else if (value === "miss") statusClass = "miss";
  else if (value === "ship" && shouldShowShips) statusClass = "ship";

  const handleClick = () => {
    if (!gameOver && type === "enemy") {
      handleEnemyCellClick(index);
    }
  };

  return (
    <div
      className={`cell ${statusClass}`}
      onClick={handleClick}
      style={{ cursor: type === "enemy" && !gameOver ? "pointer" : "default" }}
    >
      {renderContent()}
    </div>
  );
}

export default Cell;
