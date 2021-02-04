import { outOfBounds , filterList , includes} from './helper'
import {controlledPieces} from './board'


export abstract class Pieces {

  position = [];
  alive: boolean = true;
  color: string;
  icon: string;
  name: string;
  isPiece: boolean = true;
  validMoves: Array<[any, any]> = [];


  constructor(i, j, color, icon, name, isPiece = true) {
    this.position = [i, j];
    this.alive = true;
    this.color = color;
    this.icon = icon;
    this.name = name;
    this.isPiece = isPiece
  }


  public diagnonalMoves(board) {
    let possibilities: Array<number[]> = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    this.calculateMoves(board, possibilities)

  }

  public straightMoves(board) {
    let possibilities: Array<number[]> = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    this.calculateMoves(board, possibilities)
  }

  private calculateMoves(board, possibilities) {
    let [y, x] = this.position;

    for (let k = 0; k < possibilities.length; k++) {
      let possibleI = possibilities[k][0];
      let possibleJ = possibilities[k][1];
      for (let i = 1; i < 8; i++) {
        if (outOfBounds(y + i * possibleI, x + i * possibleJ)) {
          break
        } else {
          if (board[y + i * possibleI][x + i * possibleJ][1].isPiece) {
            if (board[y + i * possibleI][x + i * possibleJ][1].color != this.color) {
              this.validMoves.push([y + i * possibleI, x + i * possibleJ])
            }
            break;
          }
          this.validMoves.push([y + i * possibleI, x + i * possibleJ]);
        }
      }
    }
  }





}

export class emptyPiece extends Pieces {
}

export class Pawn extends Pieces {
  

  isFirstMove = true;

  private findValidMoves(board) {
    this.validMoves = [];
    //Check bounds

    let [i, j] = this.position;
    if (this.color === "black") {

      if (i < 6) {
        this.isFirstMove = false
      }

      if (j != 7) {
        if (board[i - 1][j + 1][1].isPiece && board[i - 1][j + 1][1].color != this.color) {
          this.validMoves.push([i - 1, j + 1])
        }
      }
      if (j != 0) {
        if (board[i - 1][j - 1][1].isPiece && board[i - 1][j - 1][1].color != this.color) {
          this.validMoves.push([i - 1, j - 1])
        }
      }
      
      if (this.isFirstMove) {
        if (!board[i - 1][j][1].isPiece) {
          this.validMoves.push([i - 1, j])
        }
        if (!board[i - 2][j][1].isPiece) {
          this.validMoves.push([i - 2, j]);
        }

      }
      else {
        if (!board[i - 1][j][1].isPiece) {
          this.validMoves.push([i - 1, j]);
        }
      }

    }
    else {
      if (this.color === "white") {

        if (i > 1) {
          this.isFirstMove = false
        }

        if (j != 7) {
          if (board[i + 1][j + 1][1].isPiece && board[i + 1][j + 1][1].color != this.color) {
            this.validMoves.push([i + 1, j + 1])
          }
        }
        if (j != 0) {
          if (board[i + 1][j - 1][1].isPiece && board[i + 1][j - 1][1].color != this.color) {
            this.validMoves.push([i + 1, j - 1])
          }
        }
        if (this.isFirstMove) {
          if (!board[i + 1][j][1].isPiece) {
            this.validMoves.push([i + 1, j])
          }
          if (!board[i + 2][j][1].isPiece) {
            this.validMoves.push([i + 2, j]);
          }
        }
        else {
          if (!board[i + 1][j][1].isPiece) {
            this.validMoves.push([i + 1, j]);
          }
        }
      }
    }
  }

  private getPawnControled(board, color) {
    let [y, x] = this.position;
    let results = []

    if (this.color == "white") {
      if (!outOfBounds(y+1, x+1)) {
        if (board[y+1][x+1][1].color != color) {
          results.push([y+1, x+1])
        }
      }
      if (!outOfBounds(y+1, x-1)) {
        if (board[y+1][x-1][1].color != color) {
          results.push([y+1, x-1])
        }
      }
    }
    if (this.color == "black") {
      if (!outOfBounds(y-1, x+1)) {
        if (board[y-1][x+1][1].color != color) {
          results.push([y-1, x+1])
        }
      }
      if (!outOfBounds(y-1, x-1)) {
        if (board[y-1][x-1][1].color != color) {
          results.push([y-1, x-1])
        }
      }

    }
    return results;
  }
}

export class Knight extends Pieces {
  

  private findValidMoves(board) {
    this.validMoves = [];
    let [i, j] = this.position;
    let possibleValid = [[i + 2, j + 1], [i + 2, j - 1], [i + 1, j - 2], [i + 1, j + 2],[i - 2, j + 1], [i - 2, j - 1], [i - 1, j - 2], [i - 1, j + 2]]

    for (let p = 0; p < possibleValid.length; p++) {
      if (!outOfBounds(possibleValid[p][0], possibleValid[p][1])) {
        if (board[possibleValid[p][0]][possibleValid[p][1]][1].color != this.color) {
          this.validMoves.push([possibleValid[p][0], possibleValid[p][1]])
        }
      }
    }
  }
}


export class Bishop extends Pieces {

  private findValidMoves(board) {
    this.validMoves = [];
    this.diagnonalMoves(board)
  }
}

export class Rook extends Pieces {
  private findValidMoves(board) {
    this.validMoves = [];
    this.straightMoves(board)
  }
}

export class Queen extends Pieces {
  private findValidMoves(board) {
    this.validMoves = [];
    this.diagnonalMoves(board);
    this.straightMoves(board);
  }
}

export class King extends Pieces {
  inCheck:boolean = false;
  hasMoved:boolean = false;
  validMoves = [];
  invalidSquares = [];
  
  private countNeighbours(board) {
    // console.log(this.color)
    //Add all 8 neighbours - the out of bound neighbours into validMoves
    let [y, x] = this.position;
    const possibleX = [1 ,1, 1, 0, 0, -1, -1,-1];
    const possibleY = [1, 0, -1, 1, -1, 1, 0, -1];

    for (let p = 0; p < possibleX.length; p++) {
      if (!outOfBounds(y + possibleY[p], x + possibleX[p])) {
        if (board[y+possibleY[p]][x+possibleX[p]][1].color != this.color) {
          // console.log([y +possibleY[p], x + possibleX[p]])
          this.validMoves.push([y +possibleY[p], x + possibleX[p]]);
        }
      }
    }
   
  }

  private findValidMoves(board) {
    this.validMoves = [];
    this.countNeighbours(board);
    // console.log(this.validMoves)


    if (this.color == "white") {
      let blackControlledSquares = controlledPieces("black" , board)
      this.validMoves = filterList(this.validMoves, blackControlledSquares );
    }

    if (this.color == "black") {
      let whiteControlledSquares = controlledPieces("white" , board) 

      this.validMoves = filterList(this.validMoves, whiteControlledSquares );
    }
  }


  private checkedKing(controledSquares) {
    let [y, x] = this.position;

    if (includes(controledSquares , this.position)) {
      this.inCheck = true;
      return true
    }
    else {
      this.inCheck = false;
      return false
    }
  }

}

