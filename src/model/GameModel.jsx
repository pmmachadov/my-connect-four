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

  const countPieces = (row, col, dr, dc, player) => {
    let count = 0;
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  };

  const checkWin = (row, col, player) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    return directions.some(([dr, dc]) => {
      const count =
        1 +
        countPieces(row, col, dr, dc, player) +
        countPieces(row, col, -dr, -dc, player);
      return count >= 4;
    });
  };

  const dropPiece = (col) => {
    if (winner) return null;
    for (let row = rows - 1; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = currentPlayer;
        if (checkWin(row, col, currentPlayer)) {
          winner = currentPlayer;
        } else {
          currentPlayer = currentPlayer === "Red" ? "Yellow" : "Red";
        }
        return { row, col };
      }
    }
    return null; // Column is full
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
