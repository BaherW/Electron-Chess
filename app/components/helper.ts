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



    private findValidMoves(board){
        let [i , j] = this.position;
        if (this.color === "black") {
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
                if (this.isFirstMove) {
                    if (!board[i-1][j][1].isPiece) {
                        this.validMoves.push([i-1, j])
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

    for (let i = 0; i < chessBoard.boardArray[1].length; i++) {
        chessBoard.boardArray[1][i][1] = new Pawn(1, i, "white", "/chesspieces/Chess_plt60.png" , "pawn");
    }

    for (let i = 0; i < chessBoard.boardArray[7].length; i++) {
        chessBoard.boardArray[6][i][1] = new Pawn(6, i, "black", "/chesspieces/Chess_pdt60.png" , "pawn");
    }

    
    return chessBoard;
}