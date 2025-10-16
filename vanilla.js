document.addEventListener('DOMContentLoaded', function () {
   const gridDisplay = document.querySelector('.grid');
   const scoreDisplay = document.getElementById('score');
   const resultDisplay = document.getElementById('result');
   const width = 4;
   let squares = [];
   const numOfTiles = width * width;
   let scores = 0;
   
// Create the Playing Board
   function createPlayBoard(width = 4) {
      for (let index = 0; index < width * width; index++) {
         const square = document.createElement('div');
         square.classList.add('square');
         square.innerHTML = 0
         gridDisplay.appendChild(square);
         squares.push(square);

      }
      generateNumber();
      generateNumber();

   }

   createPlayBoard(width);

   // generat a new number
   function generateNumber() {
      const randomNum = Math.floor(Math.random() * squares.length);
      console.log(randomNum);
      if (squares[randomNum].innerHTML == 0) {
         squares[randomNum].innerHTML = 2;
         //write checkForGameOver() function
         checkForGameOver();
      } else generateNumber();
   }

   // Move all digits to right most
   function moveToRight() {
      for (let i = 0; i < numOfTiles; i++) {
         if (i % 4 === 0) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


            // Removing zeroes
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;
            // for (let index = 0; index < missing; index++) {
            //    filteredRow.push(0);
            // }
            let zeros = Array(missing).fill(0);
            // Moves all the 2s / numbers to the Right
            let newRow = zeros.concat(filteredRow);
            console.log(newRow)

            for (let ixx = 0; ixx < width; ixx++) {
               squares[i + ixx].innerHTML = newRow[ixx];
            }
            //   squares[i].innerHTML = newRow[0];
            //   squares[i + 1].innerHTML = newRow[1];
            //   squares[i + 2].innerHTML = newRow[2];
            //   squares[i + 3].innerHTML = newRow[3];

         }
      }

   }
   // Move all digits to left most
   function moveToLeft() {
      for (let i = 0; i < numOfTiles; i++) {
         if (i % 4 === 0) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 1].innerHTML;
            let totalThree = squares[i + 2].innerHTML;
            let totalFour = squares[i + 3].innerHTML;
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


            // Removing zeroes
            let filteredRow = row.filter(num => num);
            let missing = 4 - filteredRow.length;

            let zeros = Array(missing).fill(0);
            // Moves all the 2s / numbers to the Right
            let newRow = filteredRow.concat(zeros);
            console.log(newRow)

            for (let ixx = 0; ixx < width; ixx++) {
               squares[i + ixx].innerHTML = newRow[ixx];
            }
         }
      }
   }

   // Move all digits to top
   function moveTowardsUp() {
      for (let i = 0; i < width; i++) {
         let totalOne = squares[i].innerHTML;
         let totalTwo = squares[i + width].innerHTML;
         let totalThree = squares[i + width * 2].innerHTML;
         let totalFour = squares[i + width * 3].innerHTML;
         let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


         // Removing zeroes
         let filteredColumn = column.filter(num => num);
         let missing = 4 - filteredColumn.length;

         let zeros = Array(missing).fill(0);
         // Moves all the 2s / numbers to the Right
         let newColumn = filteredColumn.concat(zeros);


         for (let ixx = 0; ixx < width; ixx++) {
            squares[i + (width * ixx)].innerHTML = newColumn[ixx];
         }

      }
   }
   // Move all digits to bottom
   function moveTowardsDown() {
      for (let i = 0; i < width; i++) {
         let totalOne = squares[i].innerHTML;
         let totalTwo = squares[i + width].innerHTML;
         let totalThree = squares[i + width * 2].innerHTML;
         let totalFour = squares[i + width * 3].innerHTML;
         let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


         // Removing zeroes
         let filteredColumn = column.filter(num => num);
         let missing = 4 - filteredColumn.length;

         let zeros = Array(missing).fill(0);
         // Moves all the 2s / numbers to the Right
         let newColumn = zeros.concat(filteredColumn);


         for (let ixx = 0; ixx < width; ixx++) {
            squares[i + (width * ixx)].innerHTML = newColumn[ixx];
         }

      }
   }

   function combineRow() {
      for (let idx = 0; idx < numOfTiles - 1; idx++) {
         if (squares[idx].innerHTML === squares[idx + 1].innerHTML) {
            let combinedTotal = parseInt(squares[idx].innerHTML) + parseInt(squares[idx + 1].innerHTML);
            squares[idx].innerHTML = combinedTotal;
            squares[idx + 1].innerHTML = 0;
            scores += combinedTotal;
            scoreDisplay.innerHTML = scores;
         }
      }
       checkForWin();
   }
   function combineColumn() {
      for (let idx = 0; idx < 12; idx++) {
         if (squares[idx].innerHTML === squares[idx + width].innerHTML) {
            let combinedTotal = parseInt(squares[idx].innerHTML) + parseInt(squares[idx + width].innerHTML);
            squares[idx].innerHTML = combinedTotal;
            squares[idx + width].innerHTML = 0;
            scores += combinedTotal;
            scoreDisplay.innerHTML = scores;
         }
      }
      checkForWin()
   }


   // Assigning functions to Controlling Keys
   function control(e) {

      if (e.key === 'ArrowLeft') {
         keyLeft();
      } else if (e.key === 'ArrowRight') {
         keyRight();
      } else if (e.key === 'ArrowUp') {
         keyUp();
      } else if (e.key === 'ArrowDown') {
         keyDown();
      }
   }
   document.addEventListener('keydown', control);
   function keyLeft() {
      moveToLeft();
      combineRow();
      moveToLeft();
      generateNumber();
   }
   function keyRight() {
      moveToRight();
      combineRow();
      moveToRight();
      generateNumber();
   }
   function keyUp() {
      moveTowardsUp();
      combineColumn();
      moveTowardsUp();
      generateNumber();
   }
   function keyDown() {
      moveTowardsDown();
      combineColumn();
      moveTowardsDown();
      generateNumber();
   }

   // check for winner
   function checkForWin() {
      for (let i = 0; i < squares.length; i++) {
         if (squares[i].innerHTML == 2048) {
            resultDisplay.innerHTML = 'You Win!';
            document.removeEventListener('keydown', control);
            setTimeout(clearAll, 3000)
         }
      }
   }

   //check for game over and no zeros on the tiles
   function checkForGameOver() {
      let zeros = 0;
      for (let i = 0; i < squares.length; i++) {
         if (squares[i].innerHTML == 0) {
            zeros++;

         }
      }
      if (zeros === 0) {
         resultDisplay.innerHTML = 'You Lose!';
         document.removeEventListener('keydown', control);
         setTimeout(clearAll, 3000)
      }
   }

   // adding style and colors
   function addStyleColors() {
      for (let i = 0; i < squares.length; i++) {
         if (squares[i].innerHTML == 0) {
            squares[i].style.backgroundColor = '#afa192';
         }
         else if (squares[i].innerHTML == 2) {
            squares[i].style.backgroundColor = '#eed4da';
         }
         else if (squares[i].innerHTML == 4) {
            squares[i].style.backgroundColor = '#ede0c8';
         }
         else if (squares[i].innerHTML == 8) {
            squares[i].style.backgroundColor = '#f2c179';
         }
         else if (squares[i].innerHTML == 16) {
            squares[i].style.backgroundColor = '#ffcea4';
         }
         else if (squares[i].innerHTML == 32) {
            squares[i].style.backgroundColor = '#e8c064';
         }
         else if (squares[i].innerHTML == 64) {
            squares[i].style.backgroundColor = '#ffab6e';
         }
         else if (squares[i].innerHTML == 128) {
            squares[i].style.backgroundColor = '#fd9982';
         }
         else if (squares[i].innerHTML == 256) {
            squares[i].style.backgroundColor = '#ead79c';
         }
         else if (squares[i].innerHTML == 512) {
            squares[i].style.backgroundColor = '#76daff';
         }
         else if (squares[i].innerHTML == 1024) {
            squares[i].style.backgroundColor = '#beeaa5';
         }
         else if (squares[i].innerHTML == 2048) {
            squares[i].style.backgroundColor = '#d7d4f8';
         }
      }
   }
   function clearAll() {
      clearInterval(myTimer);
   }
   addStyleColors();

   let myTimer = setInterval(addStyleColors, 50)
})