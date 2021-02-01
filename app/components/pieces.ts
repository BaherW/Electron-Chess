export abstract class Pieces {

  position = [];
  alive:boolean = true;
  color:string;
  icon:string;
  name:string;
  isPiece:boolean = true;

  constructor(i , j, color, icon , name , isPiece = true) {
    this.position = [i,j];
    this.alive = true;
    this.color = color;
    this.icon = icon;
    this.name = name;
    this.isPiece = isPiece
  }
}

export class emptyPiece extends Pieces {
}

export class Pawn extends Pieces {
  validMoves:Array<[any,any]> = [];
  isFirstMove = true;

  private findValidMoves(board) {
    let [i , j] = this.position;
    if (this.color === "black") {
      if (board[i-1][j+1][1].isPiece && board[i-1][j+1][1].color != this.color ) {
        this.validMoves.push([i-1, j+1])
      }
      if (board[i-1][j-1][1].isPiece && board[i-1][j-1][1].color != this.color) {
        this.validMoves.push([i-1, j-1])
      }

      if (this.isFirstMove) {
        if (!board[i-1][j][1].isPiece) {
          this.validMoves.push([i-1, j])
        }
        if (!board[i-2][j][1].isPiece) {
          this.validMoves.push([i-2, j]);
        }

        this.isFirstMove = false;
      }
      else {
        if (!board[i-1][j][1].isPiece) {
          this.validMoves.push([i-1, j]);
        }
      }
    }
    else {
      if (this.color === "white") {
        if (board[i+1][j+1][1].isPiece && board[i+1][j+1][1].color != this.color) {
          this.validMoves.push([i+1, j+1])
        }
        if (board[i+1][j-1][1].isPiece && board[i+1][j-1][1].color != this.color) {
          this.validMoves.push([i+1, j-1])
        }
        if (this.isFirstMove) {
          if (!board[i+1][j][1].isPiece) {
            this.validMoves.push([i+1, j])
          }
          if (!board[i+2][j][1].isPiece) {
            this.validMoves.push([i+2, j]);
          }

          this.isFirstMove = false;
        }
        else {
          if (!board[i+1][j][1].isPiece) {
            this.validMoves.push([i+1, j]);
          }
        }
      }
    }
  }





}

export class Knight extends Pieces {


}

export class Bishop extends Pieces {

}

export class Rook extends Pieces {

}

export class Queen extends Pieces {

}

export class King extends Pieces {

}


