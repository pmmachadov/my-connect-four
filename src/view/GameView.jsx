import React, { useState, useEffect } from "react";
import { createGameController } from "../controller/GameController.jsx";
import "../App.css";

export const GameView = () => {
  const [game, setGame] = useState(null);
  const [controller, setController] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctrl = createGameController(setGame);
    ctrl.resetGame();
    setController(ctrl);
  }, []);

  if (!game || loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );

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
              {cell && (
                <div className={`piece ${cell.toLowerCase()} bounce`}></div>
              )}
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
