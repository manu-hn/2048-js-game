
document.addEventListener('DOMContentLoaded', () => {
  let width = parseInt(prompt("Enter number of tiles (e.g., 4, 5, 6):"), 10) || 4;

  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const restartBtn = document.getElementById('restart');

  let board = [];       
  let squares = [];     
  let score = 0;

  // 4 - > Default Value
  function initializeGame(w = 4) {
    width = w;
    board = Array(width * width).fill(0);
    score = 0;
    scoreDisplay.innerHTML = score;
    resultDisplay.innerHTML = "Join the Numbers and get the 2048 tile!";

    // Make tiles properly align with Grid
    gridDisplay.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    gridDisplay.style.gridTemplateRows = `repeat(${width}, 1fr)`;

    // clear  any previous tiles
    gridDisplay.innerHTML = '';
    squares = [];

    createTiles();
    // start with 2 tiles instead of 1
    generateNumber();
    generateNumber();
    render();
  }

  function createTiles() {
    for (let i = 0; i < width * width; i++) {
      const element = document.createElement('div');
      element.classList.add('square');
      element.textContent = '0';
      gridDisplay.appendChild(element);
      squares.push(element);
    }
  }

  function render() {
    for (let i = 0; i < board.length; i++) {
      const val = board[i];
      squares[i].textContent = val === 0 ? '0' : String(val);
      applyTileStyle(squares[i], val);
    }
    scoreDisplay.innerHTML = score;
  }

  function applyTileStyle(element, val) {
   
    element.style.backgroundColor = '';
    element.style.color = '';

    if (val === 0) {
      element.style.backgroundColor = '#afa192';
      element.style.color = '#eee';
    } else if (val === 2) {
      element.style.backgroundColor = '#eed4da';
      element.style.color = '#776e65';
    } else if (val === 4) {
      element.style.backgroundColor = '#ede0c8';
      element.style.color = '#776e65';
    } else if (val === 8) {
      element.style.backgroundColor = '#f2c179';
      element.style.color = '#fff';
    } else if (val === 16) {
      element.style.backgroundColor = '#ffcea4';
      element.style.color = '#fff';
    } else if (val === 32) {
      element.style.backgroundColor = '#e8c064';
      element.style.color = '#fff';
    } else if (val === 64) {
      element.style.backgroundColor = '#ffab6e';
      element.style.color = '#fff';
    } else if (val === 128) {
      element.style.backgroundColor = '#fd9982';
      element.style.color = '#fff';
    } else if (val === 256) {
      element.style.backgroundColor = '#ead79c';
      element.style.color = '#fff';
    } else if (val === 512) {
      element.style.backgroundColor = '#76daff';
      element.style.color = '#fff';
    } else if (val === 1024) {
      element.style.backgroundColor = '#beeaa5';
      element.style.color = '#fff';
    } else if (val >= 2048) {
      element.style.backgroundColor = '#d7d4f8';
      element.style.color = '#000';
    } else {
      
      element.style.backgroundColor = '#3c3a32';
      element.style.color = '#fff';
    }
  }

  function getEmptyIndexes() {
    const empties = [];
    board.forEach((v, idx) => { if (v === 0) empties.push(idx); });
    return empties;
  }

  function generateNumber() {
    const empties = getEmptyIndexes();
    if (empties.length === 0) return false;
    const randomIndex = empties[Math.floor(Math.random() * empties.length)];
    // Pick random number 2 or 4
    board[randomIndex] = 2; 
    return true;
  }

  
  function compressAndCombineLeft(row) {
    
    const filtered = row.filter(n => n !== 0); 
    const newRow = [];
    let localScore = 0
    for (let i = 0; i < filtered.length; i++) {
      if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
        const combined = filtered[i] * 2;
        newRow.push(combined);
        localScore += combined;
        i++; 
      } else {
        newRow.push(filtered[i]);
      }
    }
    // move zeros to the right
    while (newRow.length < width) newRow.push(0);
    return { row: newRow, score: localScore };
  }

  function moveLeft() {
    const prev = board.slice();
    for (let r = 0; r < width; r++) {
      const row = board.slice(r * width, r * width + width);
      const { row: newRow, score: gained } = compressAndCombineLeft(row);
      for (let c = 0; c < width; c++) {
        board[r * width + c] = newRow[c];
      }
      score += gained;
    }
    return !boardsEqual(prev, board);
  }

  function moveRight() {
    const prev = board.slice();
    for (let r = 0; r < width; r++) {
      const row = board.slice(r * width, r * width + width).reverse();
      const { row: newRowRev, score: gained } = compressAndCombineLeft(row);
      const newRow = newRowRev.reverse();
      for (let c = 0; c < width; c++) {
        board[r * width + c] = newRow[c];
      }
      score += gained;
    }
    return !boardsEqual(prev, board);
  }

  function moveUp() {
    const prev = board.slice();
    for (let c = 0; c < width; c++) {
      const col = [];
      for (let r = 0; r < width; r++) col.push(board[r * width + c]);
      const { row: newCol, score: gained } = compressAndCombineLeft(col);
      for (let r = 0; r < width; r++) board[r * width + c] = newCol[r];
      score += gained;
    }
    return !boardsEqual(prev, board);
  }

  function moveDown() {
    const prev = board.slice();
    for (let c = 0; c < width; c++) {
      const col = [];
      for (let r = 0; r < width; r++) col.push(board[r * width + c]);
      const reversed = col.reverse();
      const { row: newColRev, score: gained } = compressAndCombineLeft(reversed);
      const newCol = newColRev.reverse();
      for (let r = 0; r < width; r++) board[r * width + c] = newCol[r];
      score += gained;
    }
    return !boardsEqual(prev, board);
  }

  function boardsEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  function checkForWin() {
    if (board.some(v => v === 2048)) {
      resultDisplay.innerHTML = 'You Win!';
      document.removeEventListener('keydown', control);
      return true;
    }
    return false;
  }

  function checkForGameOver() {
   
    if (board.some(num => num === 0)) return false;

    // checking if any possible tiles can be merged horizontally or vertically
    for (let r = 0; r < width; r++) {
      for (let c = 0; c < width - 1; c++) {
        if (board[r * width + c] === board[r * width + c + 1]) return false;
      }
    }
    for (let c = 0; c < width; c++) {
      for (let r = 0; r < width - 1; r++) {
        if (board[r * width + c] === board[(r + 1) * width + c]) return false;
      }
    }

    
    resultDisplay.innerHTML = 'You Lose!';
    document.removeEventListener('keydown', control);
    return true;
  }

  function handleMove(moveFn) {
    const changed = moveFn();
    if (changed) {
      generateNumber();
      render();
      if (!checkForWin()) checkForGameOver();
    }
  }

  // Keyboard controls
  function control(e) {
    if (e.key === 'ArrowLeft') handleMove(moveLeft);
    else if (e.key === 'ArrowRight') handleMove(moveRight);
    else if (e.key === 'ArrowUp') handleMove(moveUp);
    else if (e.key === 'ArrowDown') handleMove(moveDown);
  }
  document.addEventListener('keydown', control);

  // restart button
  restartBtn.addEventListener('click', () => {
    
    const newSize = parseInt(prompt("Enter board size (e.g., 4, 5, 6):"), 10);
    if (newSize && newSize > 1) initializeGame(newSize);
    else initializeGame(width);
  });

 
  function startColorTimer() {
    if (window._myColorTimer) clearInterval(window._myColorTimer);
    window._myColorTimer = setInterval(() => {
     
      for (let i = 0; i < board.length; i++) {
        applyTileStyle(squares[i], board[i]);
      }
    }, 200);
  }

  // Game Starts
  initializeGame(width);
  startColorTimer();

});
