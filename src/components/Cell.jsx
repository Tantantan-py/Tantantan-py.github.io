import React from "react";
import { useGameContext } from "../context/GameContext";

function Cell({ index, type, value }) {
  const { handleEnemyCellClick, currentTurn, gameOver } = useGameContext();

  const render = () => {
    if (value === "hit") return "✔";
    if (value === "miss") return "X";
    if (value === "ship" && type === "player") return "⛴️";
    if (value === "ship" && type === "enemy") return "•";
    return "";
  };

  const handleClick = () => {
    if (type === "enemy") {
      handleEnemyCellClick(index);
    }
  };

  return (
    <div
      className={`cell ${value}`}
      onClick={handleClick}
      style={{ cursor: type === "enemy" ? "pointer" : "default" }}
    >
      {render()}
    </div>
  );
}

export default Cell;
