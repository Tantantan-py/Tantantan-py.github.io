import React from "react";
import { useGameContext } from "../context/GameContext";

function Cell({ index, type, value }) {
  const { handleEnemyCellClick, currentTurn, gameOver } = useGameContext();

  const renderContent = () => {
    if (value === "hit") return "✔";
    if (value === "miss") return "X";
    if (value === "ship" && type === "player") return "⛴️";
    return "";
  };

  let statusClass = "";
  if (value === "hit") statusClass = "hit";
  else if (value === "miss") statusClass = "miss";
  else if (value === "ship" && type === "player") statusClass = "ship";

  const handleClick = () => {
    if (!gameOver && type === "enemy" && currentTurn === "player") {
      handleEnemyCellClick(index);
    }
  };

  return (
    <div
      className={`cell ${statusClass}`}
      onClick={handleClick}
      style={{
        cursor:
          type === "enemy" && !gameOver && currentTurn === "player"
            ? "pointer"
            : "default",
      }}
    >
      {renderContent()}
    </div>
  );
}

export default Cell;
