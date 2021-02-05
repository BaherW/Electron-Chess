import {Pawn, Pieces , Bishop , Rook, King , Knight , Queen , emptyPiece} from './pieces'
import {Board} from './board'



export function num2chr(n: number):string {
    return String.fromCharCode(n+97);
}

export function includes(myArray: [number[]], checkArray: number[]):boolean {
    for (let i = 0 ; i < myArray.length ; i++)
        if (myArray[i][0] === checkArray[0] && myArray[i][1] === checkArray[1]) {
            return true;
        }
    return false;
}

export function outOfBounds(y:number, x:number) {
    if (y < 0 || y > 7 || x < 0 || x > 7 ) {
        return true;
    }
}

export function filterList(toBeF, filterArray) {

    for (let i = 0; i < filterArray.length; i++) {
        for (let j = 0; j < toBeF.length; j++) {
            if (arraysEqual(filterArray[i], toBeF[j])) {
                let index = toBeF.indexOf(toBeF[j], 0);
                if (index > -1) {
                    toBeF.splice(index, 1);
                }
            }
        }
    }
    return toBeF;
}

export function removeDuplicates(data) {
    let unique: Array<[any, any]> = [];
    let found;
    
    unique.push(data[0]);
    for (let i = 0; i < data.length; i++) {
        found = false
        for (let j = 0; j < unique.length; j++) {
            if (arraysEqual(data[i], unique[j])) {
                found = true;
            }
        }
        if (!found) {
            unique.push(data[i])
        }
    }

    return unique;
}

export function spawnPieces(chessBoard:Board):Board {
    /* spawn pawns */
    for (let i = 0; i < chessBoard.boardArray[1].length; i++) {
        chessBoard.boardArray[1][i][1] = new Pawn(1, i, "white", "/chesspieces/wP.png" , "pawn", true);
    }

    for (let i = 0; i < chessBoard.boardArray[7].length; i++) {
        chessBoard.boardArray[6][i][1] = new Pawn(6, i, "black", "/chesspieces/bP.png" , "pawn", true);
    }
    /*****/

    /* spawn knights */
    chessBoard.boardArray[0][1][1] = new Knight(0, 1, "white", "/chesspieces/wN.png", "knight", true);
    chessBoard.boardArray[0][6][1] = new Knight(0, 6, "white", "/chesspieces/wN.png", "knight", true);
    chessBoard.boardArray[7][1][1] = new Knight(7, 1, "black", "/chesspieces/bN.png", "knight", true);
    chessBoard.boardArray[7][6][1] = new Knight(7, 6, "black", "/chesspieces/bN.png", "knight", true);
    /*****/
    
    /* spawn bishops */
    chessBoard.boardArray[0][2][1] = new Bishop(0, 2, "white", "/chesspieces/wB.png", "bishop", true);
    chessBoard.boardArray[0][5][1] = new Bishop(0, 5, "white", "/chesspieces/wB.png", "bishop", true);
    chessBoard.boardArray[7][2][1] = new Bishop(7, 2, "black", "/chesspieces/bB.png", "bishop", true);
    chessBoard.boardArray[7][5][1] = new Bishop(7, 5, "black", "/chesspieces/bB.png", "bishop", true);
    /*****/

    /* spawn rooks */
    chessBoard.boardArray[0][0][1] = new Rook(0, 0, "white", "/chesspieces/wR.png", "rook", true);
    chessBoard.boardArray[0][7][1] = new Rook(0, 7, "white", "/chesspieces/wR.png", "rook", true);
    chessBoard.boardArray[7][0][1] = new Rook(7, 0, "black", "/chesspieces/bR.png", "rook", true);
    chessBoard.boardArray[7][7][1] = new Rook(7, 7, "black", "/chesspieces/bR.png", "rook", true);
    /*****/

    /* spawn queens */
    chessBoard.boardArray[0][3][1] = new Queen(0, 3, "white", "/chesspieces/wQ.png", "queen")
    chessBoard.boardArray[7][3][1] = new Queen(7, 3, "black", "/chesspieces/bQ.png", "queen")
    /*****/

    /* spawn kings */
    chessBoard.boardArray[0][4][1] = new King(0, 4, "white", "/chesspieces/wK.png", "king")
    chessBoard.boardArray[7][4][1] = new King(7, 4, "black", "/chesspieces/bK.png", "king")
    /*****/
    return chessBoard;
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }


export function getKingPos(color, board) {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let selectedPiece = board[row][col][1]
            if(selectedPiece.name === "king" && selectedPiece.color === color) {
                return [row, col];
            }
        }
    }
}
