const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.id);

  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  cell.textContent = currentPlayer;
  gameState[index] = currentPlayer;
  checkForWin();
  checkForDraw();
  swapPlayer();
}

function checkForWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      message.textContent = `${currentPlayer} a castigat!`;
      gameActive = false;
      return;
    }
  }
}

function checkForDraw() {
  if (!gameState.includes('')) {
    message.textContent = "Rezultatul este egal!";
    gameActive = false;
  }
}

function swapPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
