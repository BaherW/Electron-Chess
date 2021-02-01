import { outOfBounds } from './helper'


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
    let [i, j] = this.position;
    if (this.color === "black") {
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

        this.isFirstMove = false;
      }
      else {
        if (!board[i - 1][j][1].isPiece) {
          this.validMoves.push([i - 1, j]);
        }
      }
    }
    else {
      if (this.color === "white") {
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

          this.isFirstMove = false;
        }
        else {
          if (!board[i + 1][j][1].isPiece) {
            this.validMoves.push([i + 1, j]);
          }
        }
      }
    }
  }





}

export class Knight extends Pieces {

  private findValidMoves(board) {
    let [i, j] = this.position;
    this.validMoves.push([i + 2, j + 1], [i + 2, j - 1], [i + 1, j - 2], [i + 1, j + 2],
      [i - 2, j + 1], [i - 2, j - 1], [i - 1, j - 2], [i - 1, j + 2])
  }
}

export class Bishop extends Pieces {

  private findValidMoves(board) {
    this.diagnonalMoves(board)
  }
}

export class Rook extends Pieces {
  private findValidMoves(board) {
    this.straightMoves(board)
  }
}

export class Queen extends Pieces {
  private findValidMoves(board) {
    this.diagnonalMoves(board);
    this.straightMoves(board);
  }
}

export class King extends Pieces {
  inCheck:boolean = false;
  hasMoved:boolean = false;
  validMoves = [];
  
  private countNeighbours(board) {
    //Add all 8 neighbours - the out of bound neighbours into validMoves
    let [y, x] = this.position;
    const possibleX = [1 ,1, 1, 0, 0, -1, -1,-1];
    const possibleY = [1, 0, -1, 1, -1, 1, 0, -1];

    for (let p = 0; p < possibleX.length; p++) {
      if (!outOfBounds(y + possibleY[p], x + possibleX[p])) {
        if (board[y+possibleY[p]][x+possibleX[p]][1].color != this.color) {
          console.log([y +possibleY[p], x + possibleX[p]])
          this.validMoves.push([y +possibleY[p], x + possibleX[p]]);
        }
      }

    }
  }

  
  private findValidMoves(board) {
    this.countNeighbours(board);
  }

  // private findValidMoves(board) {
  //   const filteredArray = array1.filter(value => array2.includes(value));
  // }



}


