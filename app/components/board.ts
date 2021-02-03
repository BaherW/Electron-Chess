import { emptyPiece, Pieces } from './pieces'
import { num2chr, includes } from './helper'

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
  return (controlledSquares.filter(function (v) {
    if (tmp.indexOf(v.toString()) < 0) {
        tmp.push(v.toString());
        return v;
    }
  }))

}