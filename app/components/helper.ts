function num2chr(n: number):string {
    return String.fromCharCode(n+97);
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
                tempArray[i][j] = [num2chr(j) + (i+1).toString() , null];
            }
        }
        return tempArray;
    }
}


export abstract class Pieces {

    position = [];
    alive:boolean = true;
    constructor(i , j) {
        this.position = [i,j];
        this.alive = true;
    }
}

export class Pawn extends Pieces {
    

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