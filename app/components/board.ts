import { emptyPiece, Pieces } from './pieces'
import { num2chr, includes } from './helper'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export class Board {

  boardArray: Array<[string, Pieces]> = [];

  constructor() {
    this.boardArray = this.generateBoard();
  }

  generateBoard(): Array<[string, Pieces]> {
    let tempArray = [];
    for (let i = 0; i < 8; i++) {
      tempArray[i] = []
      for (let j = 0; j < 8; j++) {
        tempArray[i][j] = [num2chr(j) + (i + 1).toString(), new emptyPiece(i, j, "invis", "/chesspieces/invisible.png", null, false)];
      }
    }
    return tempArray;
  }
}


export function controlledPieces(color, board) {
  let controlledSquares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let selectedPiece = board[row][col][1]
      if (selectedPiece.color === color) {

        if (selectedPiece.name === "pawn") {
          let pawnOptions = selectedPiece.getPawnControled(board, color)

          if (pawnOptions.length === 1) {
            controlledSquares.push(pawnOptions[0]);
          }
          else {
            controlledSquares.push(pawnOptions[0]);
            controlledSquares.push(pawnOptions[1]);
          }
        }

        else {
          if (selectedPiece.name === "king") {
            board[row][col][1].countNeighbours(board)

          }
          else {
            board[row][col][1].findValidMoves(board)
          }

          if (board[row][col][1].validMoves.length > 0) {
            if (board[row][col][1].validMoves.length === 1) {
              controlledSquares.push(board[row][col][1].validMoves);
            }

            else {
              for (let validMove = 0; validMove < board[row][col][1].validMoves.length; validMove++) {
                controlledSquares.push(board[row][col][1].validMoves[validMove]);
              }
            }
          }
        }


      }
    }
  }
  let tmp = []
  return controlledSquares;
}

export function stopCheck() {

` Iterate over all of the checked-color pieces,
  get their valid moves and, for each valid move check if the next generation of board is out of check.
  if it is, add to blockingmoves (Array<numbers[]>). Once finished, if blocking moves is not empty`



// Checkmate -> if blockingmoves = 0


// iterate over all of your pieces (you're in check)
// call validmoves on each piece
// play each valid move
// if kingInCheck false append valid move to stopCheck array in each piece object

}




