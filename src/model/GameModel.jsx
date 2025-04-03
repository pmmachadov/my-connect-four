export const createGameModel = () => {
  const rows = 6;
  const cols = 7;
  let board, currentPlayer, winner;

  const reset = () => {
    board = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null));
    currentPlayer = "Red";
    winner = null;
  };

  const countPieces = (
    initialRowIndex,
    initialColumnIndex,
    rowStep,
    columnStep,
    playerMarker
  ) => {
    let count = 0;
    let currentRowIndex = initialRowIndex + rowStep;
    let currentColumnIndex = initialColumnIndex + columnStep;
    while (
      currentRowIndex >= 0 &&
      currentRowIndex < rows &&
      currentColumnIndex >= 0 &&
      currentColumnIndex < cols &&
      board[currentRowIndex][currentColumnIndex] === playerMarker
    ) {
      count++;
      currentRowIndex += rowStep;
      currentColumnIndex += columnStep;
    }
    return count;
  };

  const checkWin = (initialRowIndex, initialColumnIndex, playerMarker) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    return directions.some(
      ([rowStep, columnStep]) =>
        1 +
          countPieces(
            initialRowIndex,
            initialColumnIndex,
            rowStep,
            columnStep,
            playerMarker
          ) +
          countPieces(
            initialRowIndex,
            initialColumnIndex,
            -rowStep,
            -columnStep,
            playerMarker
          ) >=
        4
    );
  };

  const dropPiece = (col) => {
    if (winner) return null;
    for (let row = rows - 1; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = currentPlayer;
        if (checkWin(row, col, currentPlayer)) {
          winner = currentPlayer;
        } else {
          currentPlayer = currentPlayer === "Red" ? "Green" : "Red";
        }
        return { row, col };
      }
    }
    return null;
  };

  reset();
  return {
    rows,
    cols,
    getBoard: () => board,
    getCurrentPlayer: () => currentPlayer,
    getWinner: () => winner,
    reset,
    dropPiece,
  };
};
