import React from "react";
import Cell from "./Cell";
import { useGameContext } from "../context/GameContext";

function Board({ type }) {
  const { playerBoard, enemyBoard, gameMode } = useGameContext();
  const board = type === "player" ? playerBoard : enemyBoard;

  const shouldShowShips = type === "player" || gameMode === "easy";

  return (
    <div className={`game-board ${type}-board`}>
      {board.map((cell, index) => (
        <Cell
          key={index}
          index={index}
          type={type}
          value={cell}
          showShip={shouldShowShips}
        />
      ))}
    </div>
  );
}

export default Board;
