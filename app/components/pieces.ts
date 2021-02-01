import {outOfBounds} from './helper'


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
    let possibilities:Array<number[]> = [[1 , 1], [1, -1] , [-1 , 1] , [-1,-1]];
    let [y, x] = this.position;

    for (let k = 0; k < possibilities.length; k++) {
      let possibleI = possibilities[k][0];
      let possibleJ = possibilities[k][1];
      for (let i = 1 ; i < 8 ; i++) {
        if (outOfBounds(y + i * possibleI, x + i * possibleJ)) {
          break
        } else {
          if (board[y + i * possibleI][x + i * possibleJ][1].isPiece) {
            this.validMoves.push([y + i * possibleI, x + i * possibleJ])
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
      if (board[i - 1][j + 1][1].isPiece && board[i - 1][j + 1][1].color != this.color) {
        this.validMoves.push([i - 1, j + 1])
      }
      if (board[i - 1][j - 1][1].isPiece && board[i - 1][j - 1][1].color != this.color) {
        this.validMoves.push([i - 1, j - 1])
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
        if (board[i + 1][j + 1][1].isPiece && board[i + 1][j + 1][1].color != this.color) {
          this.validMoves.push([i + 1, j + 1])
        }
        if (board[i + 1][j - 1][1].isPiece && board[i + 1][j - 1][1].color != this.color) {
          this.validMoves.push([i + 1, j - 1])
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




    //
    // for (let i = 1; i < 8 ; i++) {
    //   console.log(this.validMoves)
    //   if (outOfBounds(y + i, x + i)) {
    //     console.log("Done")
    //     break;
    //   }
    //   else {
    //
    //     if (board[y + i][x + i][1].isPiece) {
    //       this.validMoves.push([i + y , x + i])
    //       break;
    //     }
    //     this.validMoves.push([y + i , x + i]);
    //   }
    // }
    //
    //
    // for (let i = 1; i < 8 ; i++) {
    //   if (outOfBounds(y - i, x + i)) {
    //     console.log("Done")
    //     break;
    //   }
    //   else {
    //
    //     if (board[y - i][x + i][1].isPiece) {
    //       this.validMoves.push([y - i, x + i])
    //       break;
    //     }
    //     this.validMoves.push([y - i, x + i]);
    //   }
    // }
    //
    //
    // for (let i = 1; i < 8 ; i++) {
    //   console.log(this.validMoves)
    //   if (outOfBounds(y - i , x - i)) {
    //     console.log("Done")
    //     break;
    //   }
    //   else {
    //
    //     if (board[y - i][x - i][1].isPiece) {
    //       this.validMoves.push([y - i , x - i])
    //       break;
    //     }
    //     this.validMoves.push([y - i , x - i]);
    //   }
    // }
    //
    // for (let i = 1; i < 8 ; i++) {
    //   console.log(this.validMoves)
    //   if (outOfBounds(y + i , x - i)) {
    //     console.log("Done")
    //     break;
    //   }
    //   else {
    //     if (board[y + i][x - i][1].isPiece) {
    //       this.validMoves.push([y + i , x - i])
    //       break;
    //     }
    //     this.validMoves.push([y + i , x - i]);
    //   }
    // }

  }
}

export class Rook extends Pieces {
}

export class Queen extends Pieces {
}

export class King extends Pieces {
}


