function num2chr(n: number):string {
    return String.fromCharCode(n+97);
}

export function includes(myArray: [number[]], checkArray: number[]):boolean {
    for (let i = 0 ; i < myArray.length ; i++)
        if (myArray[i][0] === checkArray[0] && myArray[i][1] === checkArray[1]) {
            return true;
        }
    return false;
}


export class Board {

    boardArray:Array<[string,Pieces]> = [];

    constructor() {
        this.boardArray = this.generateBoard();
    }

    generateBoard():Array<[string,Pieces ]> {
        let tempArray = [];
        for (let i = 0 ; i < 8 ; i++) {
            tempArray[i] = []
            for (let j = 0; j < 8; j++) {
                tempArray[i][j] = [num2chr(j) + (i+1).toString() , new emptyPiece(i,j,"invis" , "/chesspieces/invisible.png" , null , false)];
            }
        }
        return tempArray;
    }
}


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







export function spawnPieces(chessBoard:Board):Board {
    /* spawn pawns */
    for (let i = 0; i < chessBoard.boardArray[1].length; i++) {
        chessBoard.boardArray[1][i][1] = new Pawn(1, i, "white", "/chesspieces/Chess_plt60.png" , "pawn");
    }

    for (let i = 0; i < chessBoard.boardArray[7].length; i++) {
        chessBoard.boardArray[6][i][1] = new Pawn(6, i, "black", "/chesspieces/Chess_pdt60.png" , "pawn");
    }
    /*****/

    /* spawn knights */
    chessBoard.boardArray[0][1][1] = new Knight(0, 1, "white", "/chesspieces/Chess_nlt60.png", "knight");
    chessBoard.boardArray[0][6][1] = new Knight(0, 6, "white", "/chesspieces/Chess_nlt60.png", "knight");
    chessBoard.boardArray[7][1][1] = new Knight(7, 1, "black", "/chesspieces/Chess_ndt60.png", "knight");
    chessBoard.boardArray[7][6][1] = new Knight(7, 6, "black", "/chesspieces/Chess_ndt60.png", "knight");
    /*****/

    /* spawn bishops */
    chessBoard.boardArray[0][2][1] = new Bishop(0, 2, "white", "/chesspieces/Chess_blt60.png", "bishop");
    chessBoard.boardArray[0][5][1] = new Bishop(0, 5, "white", "/chesspieces/Chess_blt60.png", "bishop");
    chessBoard.boardArray[7][2][1] = new Bishop(7, 2, "black", "/chesspieces/Chess_bdt60.png", "bishop");
    chessBoard.boardArray[7][5][1] = new Bishop(7, 5, "black", "/chesspieces/Chess_bdt60.png", "bishop");
    /*****/

    /* spawn rooks */
    chessBoard.boardArray[0][0][1] = new Rook(0, 0, "white", "/chesspieces/Chess_rlt60.png", "rook");
    chessBoard.boardArray[0][7][1] = new Rook(0, 7, "white", "/chesspieces/Chess_rlt60.png", "rook");
    chessBoard.boardArray[7][0][1] = new Rook(7, 0, "black", "/chesspieces/Chess_rdt60.png", "rook");
    chessBoard.boardArray[7][7][1] = new Rook(7, 7, "black", "/chesspieces/Chess_rdt60.png", "rook");
    /*****/

    /* spawn queens */
    chessBoard.boardArray[0][3][1] = new Queen(0, 3, "white", "/chesspieces/Chess_qlt60.png", "queen")
    chessBoard.boardArray[7][3][1] = new Queen(7, 3, "black", "/chesspieces/Chess_qdt60.png", "queen")
    /*****/

    /* spawn kings */
    chessBoard.boardArray[0][4][1] = new King(0, 4, "white", "/chesspieces/Chess_klt60.png", "queen")
    chessBoard.boardArray[7][4][1] = new King(7, 4, "black", "/chesspieces/Chess_kdt60.png", "queen")
    /*****/
    return chessBoard;
}