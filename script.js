// TODO: gameboard object - Module
const gameBoard = (() => {
  let board;

  function _convertToCoordinate(id) {
    return [parseInt(id / 3), id % 3]
  }

  function _win() {
    for (let i = 0; i < 3; i++) {
        // horizontals
      if (board[i][0] !== "" && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        return true;
        //verticals
      } else if (board[0][i] !== "" && board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
        return true;
      }
    }
    // diagonals
    if (board[1][1] !== "" && board[0][0] == board[1][1] && board[1][1] == board[2][2] || board[1][1] !== "" && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
      return true;
    }
    return false;
  }

  function _full() {
    board.forEach((row) => {
      row.forEach((square) => {
        if (!square) {
          return false;
        }
      })
    })
    return true;
  }

  function gameOver() {
    return _win() || _full();
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
    board[row][col] = symbol;
  }

  function emptyAt(squareId) {
    board[squareId] === undefined;
  }

  return {initializeBoard, getBoard, addPiece, emptyAt, gameOver, _win, _full}
})();

// TODO: player objects - factory
const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return {getName, getSymbol}
}

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

  function clearBoard() {
    squares = document.getElementById('board').children;
    for (let i = 0; i < squares.length; i++) {
      squares[i].firstChild.innerHTML = "";
    }
  }

  return {displayBoard, clearBoard}
})();

// TODO: gameController object - module
const gameController = (() => {
  let players;
  let activePlayer;

  function _assignPlayers(p1, p2) {
    players = [p1, p2];
    activePlayer = p1;
  }

  function _setNotification() {
    let notification = document.getElementById('notification');
    notification.innerHTML = `It is ${activePlayer.getName()}'s turn`;
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function switchActivePlayer() {
    activePlayer = activePlayer == players[0] ? players[1] : players[0];
  }

  function startGame() {
    gameBoard.initializeBoard();
    displayController.clearBoard();
    let p1 = Player(document.getElementById('p1').value, '&times;');
    let p2 = Player(document.getElementById('p2').value, 'o');
    _assignPlayers(p1, p2);
    _setNotification();
  }

  function playTurn(id) {
    gameBoard.addPiece(id, getActivePlayer().getSymbol());
    displayController.displayBoard(gameBoard.getBoard());
    switchActivePlayer();
    _setNotification();
  }

  return {startGame, switchActivePlayer, getActivePlayer, playTurn}
})();

document.getElementById('board').onclick = (event) => {
  if (event.target.getAttribute('class') == 'piece') {
    let id = parseInt(event.target.id.slice(-1));
    gameController.playTurn(id)
  }
}

document.getElementById('start').onclick = () => {
  gameController.startGame();
}