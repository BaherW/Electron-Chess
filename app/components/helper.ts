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

export function outOfBounds(y, x) {
    if (y < 0 || y > 7 || x < 0 || x > 7 ) {
        return true;
    }
}
 

export function spawnPieces(chessBoard:Board):Board {
    /* spawn pawns */
    for (let i = 0; i < chessBoard.boardArray[1].length; i++) {
        chessBoard.boardArray[1][i][1] = new Pawn(1, i, "white", "/chesspieces/Chess_plt60.png" , "pawn", true);
    }

    for (let i = 0; i < chessBoard.boardArray[7].length; i++) {
        chessBoard.boardArray[6][i][1] = new Pawn(6, i, "black", "/chesspieces/Chess_pdt60.png" , "pawn", true);
    }
    /*****/

    /* spawn knights */
    chessBoard.boardArray[0][1][1] = new Knight(0, 1, "white", "/chesspieces/Chess_nlt60.png", "knight", true);
    chessBoard.boardArray[0][6][1] = new Knight(0, 6, "white", "/chesspieces/Chess_nlt60.png", "knight", true);
    chessBoard.boardArray[7][1][1] = new Knight(7, 1, "black", "/chesspieces/Chess_ndt60.png", "knight", true);
    chessBoard.boardArray[7][6][1] = new Knight(7, 6, "black", "/chesspieces/Chess_ndt60.png", "knight", true);
    /*****/

    /* spawn bishops */
    chessBoard.boardArray[0][2][1] = new Bishop(0, 2, "white", "/chesspieces/Chess_blt60.png", "bishop", true);
    chessBoard.boardArray[0][5][1] = new Bishop(0, 5, "white", "/chesspieces/Chess_blt60.png", "bishop", true);
    chessBoard.boardArray[7][2][1] = new Bishop(7, 2, "black", "/chesspieces/Chess_bdt60.png", "bishop", true);
    chessBoard.boardArray[7][5][1] = new Bishop(7, 5, "black", "/chesspieces/Chess_bdt60.png", "bishop", true);
    /*****/

    /* spawn rooks */
    chessBoard.boardArray[0][0][1] = new Rook(0, 0, "white", "/chesspieces/Chess_rlt60.png", "rook", true);
    chessBoard.boardArray[0][7][1] = new Rook(0, 7, "white", "/chesspieces/Chess_rlt60.png", "rook", true);
    chessBoard.boardArray[7][0][1] = new Rook(7, 0, "black", "/chesspieces/Chess_rdt60.png", "rook", true);
    chessBoard.boardArray[7][7][1] = new Rook(7, 7, "black", "/chesspieces/Chess_rdt60.png", "rook", true);
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
