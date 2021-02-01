import { emptyPiece, Pieces } from './pieces'
import { num2chr } from './helper'

export class Board {

  boardArray:Array<[string, Pieces]> = [];

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
