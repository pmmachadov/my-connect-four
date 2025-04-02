import React, { useState, useEffect } from "react";
import { createGameController } from "../controller/GameController.jsx";
import "../App.css";

export const GameView = () => {
  const [game, setGame] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const ctrl = createGameController(setGame);
    ctrl.resetGame();
    setController(ctrl);
  }, []);

  if (!game) return <div>Loading...</div>;

  const handleClick = (col) => {
    if (controller && !game.winner) {
      controller.makeMove(col);
    }
  };

  const getHandleCellClick = (colIndex) => () => handleClick(colIndex);
  const getHandleCellKeyDown = (colIndex) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(colIndex);
    }
  };

  const renderBoard = () =>
    game.board.map((row, rowIndex) => (
      <div key={`row-${row.join("-")}-${rowIndex}`} className="row">
        {row.map((cell, colIndex) => {
          const uniqueKey = `row-${rowIndex}-col-${colIndex}`;
          return (
            <button
              key={uniqueKey}
              className="cell"
              onClick={getHandleCellClick(colIndex)}
              onKeyDown={getHandleCellKeyDown(colIndex)}
              tabIndex={0}
              aria-label={`Column ${colIndex + 1}`}
            >
              {cell && <div className={`piece ${cell.toLowerCase()}`}></div>}
            </button>
          );
        })}
      </div>
    ));

  return (
    <div>
      <h1>Connect Four</h1>
      <div className="board">{renderBoard()}</div>
      {game.winner && <h2>Winner: {game.winner}</h2>}
      <button className="reset-button" onClick={() => controller.resetGame()}>
        Reset
      </button>
      <div className="game-info">
        <p>Next turn: {game.currentPlayer}</p>
      </div>
    </div>
  );
};
