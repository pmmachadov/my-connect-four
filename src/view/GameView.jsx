import React, { useState, useEffect } from "react";
import { createGameController } from "../controller/GameController.jsx";

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
      <div key={`row-${row.join("-")}-${rowIndex}`} style={{ display: "flex" }}>
        {row.map((cell, colIndex) => {
          const uniqueKey = `row-${rowIndex}-col-${colIndex}`;
          return (
            <button
              key={uniqueKey}
              onClick={getHandleCellClick(colIndex)}
              onKeyDown={getHandleCellKeyDown(colIndex)}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: cell ? cell.toLowerCase() : "white",
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
    ));

  return (
    <div>
      <h1>Connect Four</h1>
      {renderBoard()}
      {game.winner && <h2>Winner: {game.winner}</h2>}
      <button onClick={() => controller.resetGame()}>Reset</button>
      <p>Turn: {game.currentPlayer}</p>
    </div>
  );
};
