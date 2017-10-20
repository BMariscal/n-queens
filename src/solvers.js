/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let newBoard = new Board({ 'n':n });
  for(let k = 0; k < newBoard.rows().length; k ++) {
    for (let l = 0; l < newBoard.rows().length; l++){
      newBoard.togglePiece(k,l);
      if(!newBoard.hasAnyRooksConflicts() && (k === n-1)){
        return newBoard.rows();
      }else if (newBoard.hasAnyRooksConflicts()){
        newBoard.togglePiece(k,l);
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let newBoard = new Board({'n': n});
  let counter = 0;
  function findSolution(newBoard, colIndex){
    if (colIndex === newBoard.rows().length) {
      counter++;
    }
    for (let row = 0; row < newBoard.rows().length; row++) {
      newBoard.togglePiece(row, colIndex);
      if (!newBoard.hasAnyRooksConflicts()) {
        findSolution(newBoard, colIndex + 1)
      }
      newBoard.togglePiece(row, colIndex)
    }
  }
  findSolution(newBoard, 0);
  return counter;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let newBoard = new Board({n: n});
  function findSolution(newBoard, row){
    if (row === newBoard.rows().length) {
      return newBoard.rows();
    }
    for (let colIndex = 0; colIndex < newBoard.rows().length; colIndex++) {
      newBoard.togglePiece(row, colIndex);
      if (!newBoard.hasAnyQueensConflicts()) {
        let currentBoard = findSolution(newBoard, row + 1);
        if (currentBoard) {
          return currentBoard;
        }
      }
      newBoard.togglePiece(row, colIndex);
    }
  }
   return findSolution(newBoard,0) || newBoard.rows();
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let newBoard = new Board({'n': n});
  let counter = 0;

  function findSolution(newBoard, colIndex) {
    if (colIndex === newBoard.rows().length) {
      counter++;
    }
    for (let row = 0; row < newBoard.rows().length; row++) {
      newBoard.togglePiece(row, colIndex);
      if (!newBoard.hasAnyQueensConflicts()) {
        findSolution(newBoard, colIndex + 1);
      }
      newBoard.togglePiece(row, colIndex);
    }
  }

  findSolution(newBoard, 0);
  return counter;
};

