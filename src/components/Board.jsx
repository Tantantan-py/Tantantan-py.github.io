import React from "react";
import Cell from "./Cell";
import { useGameContext } from "../context/GameContext";

function Board({ type }) {
  const { playerBoard, enemyBoard } = useGameContext();
  const board = type === "player" ? playerBoard : enemyBoard;

  return (
    <div className={`game-board ${type}-board`}>
      {board.map((cell, index) => (
        <Cell key={index} index={index} type={type} value={cell} />
      ))}
    </div>
  );
}

export default Board;
