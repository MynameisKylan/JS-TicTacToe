// TODO: gameboard object - Module
const gameBoard = (() => {
  let board;
  let winDiagonals = [[]]

  function _convertToCoordinate(id) {
    return [parseInt(id / 3), id % 3]
  }

  function initializeBoard() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
  }

  function getBoard() {
    return board;
  }

  function addPiece(squareId, symbol) {
    let row, col;
    [row, col] = _convertToCoordinate(squareId);
    console.log(row, col);
    board[row][col] = symbol;
  }

  function emptyAt(squareId) {
    board[squareId] === undefined;
  }

  return {
    initializeBoard, getBoard, addPiece, emptyAt
  }
})();

// TODO: player objects - factory

// TODO: displayController object - module
const displayController = (() => {
  function displayBoard(board) {
    flatBoard = board.flat();
    squares = document.getElementById('board').children;
    for (let i = 0; i < flatBoard.length; i++) {
      let piece = squares[i].firstChild;
      if (piece.innerHTML === "") {
        piece.innerHTML = flatBoard[i];
      } 
    }
  }

  return {
    displayBoard
  }
})();

// TODO: gameController object - module

document.getElementById('board').onclick = (event) => {
  if (event.target.getAttribute('class') == 'piece') {
    let id = parseInt(event.target.id.slice(-1));
    console.log(id);
    gameBoard.addPiece(id, '&times;');
    displayController.displayBoard(gameBoard.getBoard());
  }
}

gameBoard.initializeBoard();