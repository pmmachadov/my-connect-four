import { createGameModel } from "../model/GameModel.jsx";

export const createGameController = (onUpdate) => {
  const model = createGameModel();

  const getState = () => ({
    board: model.getBoard(),
    currentPlayer: model.getCurrentPlayer(),
    winner: model.getWinner(),
    rows: model.rows,
    cols: model.cols,
  });

  const resetGame = () => {
    model.reset();
    onUpdate(getState());
  };

  const makeMove = (col) => {
    model.dropPiece(col);
    onUpdate(getState());
  };

  return { resetGame, makeMove };
};
