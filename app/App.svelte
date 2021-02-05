<script>
  import { spawnPieces , includes , getKingPos, filterList  } from './components/helper'
  import {Board , controlledPieces } from './components/board'
  import {emptyPiece} from './components/pieces'
import { empty } from 'svelte/internal';
import { exit } from 'process';


  var chessBoard = new Board();
  chessBoard = spawnPieces(chessBoard);

  var mate = false;
  var piecePicked = false;
  var currentMove = "white";
  var kingInCheck = false;
  var movedPiece;
  var oldJ = 0;
  var oldI = 0;
  var rotated = false;
  var stopCheckMoves = []


function nextMove(coords, board, myPurpose) {
  let results = []
  let nextMoveCheck2;
  let [passedYcoord, passedXcoord] = coords

  let piece = board[passedYcoord][passedXcoord][1]
  piece.findValidMoves(board)
  let possibleCheckStops = piece.validMoves;
  piece.validMoves = [];
  let pieceOldCoords = piece.position

  board[passedYcoord][passedXcoord][1] = piece

  let whiteControlledSquares = controlledPieces("white", chessBoard.boardArray)
  let blackControlledSquares = controlledPieces("black", chessBoard.boardArray)
    
  let [kI, jI] = getKingPos(currentMove , chessBoard.boardArray);
  if (possibleCheckStops) {
    for (let p = 0 ; p < possibleCheckStops.length; p++) {
      let oldPiece =  board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1];
      //board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1] = new emptyPiece(possibleCheckStops[p][0] , possibleCheckStops[p][1], "invis" , "/chesspieces/invisible.png", null , false)
      board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1] = piece
      board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1].position[0] = possibleCheckStops[p][0];
      board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1].position[1] = possibleCheckStops[p][1];
      if (board[passedYcoord][passedXcoord][1].name != "king") {
        board[passedYcoord][passedXcoord][1] = new emptyPiece(passedYcoord, passedXcoord, "invis" , "/chesspieces/invisible.png", null , false)
      }
      whiteControlledSquares = controlledPieces("white", chessBoard.boardArray)
      blackControlledSquares = controlledPieces("black", chessBoard.boardArray)
      if (piece.color == "white") {
        nextMoveCheck2 = chessBoard.boardArray[kI][jI][1].checkedKing(blackControlledSquares);
      }
      else {
        nextMoveCheck2 = chessBoard.boardArray[kI][jI][1].checkedKing(whiteControlledSquares);
      }
      if (myPurpose == "block") {
        if (nextMoveCheck2 == false) {
          results.push(possibleCheckStops[p])
        }
      }
      else {
        if (nextMoveCheck2 == false) {
          results.push(possibleCheckStops[p])
        }
      }
      board[passedYcoord][passedXcoord][1] = piece
      board[passedYcoord][passedXcoord][1].position[0] = passedYcoord;
      board[passedYcoord][passedXcoord][1].position[1] = passedXcoord;
      board[possibleCheckStops[p][0]][possibleCheckStops[p][1]][1] = oldPiece  
    }
  }

  board[pieceOldCoords[0]][pieceOldCoords[1]][1] = piece
  return results
}

function checkMate(color, board) {
  let checkList = []

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let selectedPiece = board[row][col][1]
      if (selectedPiece.color != color && selectedPiece.name != null && selectedPiece.name != "king") {
        selectedPiece.findValidMoves(chessBoard.boardArray);
        selectedPiece.validMoves = nextMove(selectedPiece.position, chessBoard.boardArray, "notblock")
        checkList.push(selectedPiece.validMoves)
      }
    }
  }
  
  console.log(checkList)

  for (let i = 0; i < checkList.length; i++) {
    if (checkList[i].length > 0) {
      return false
    }
  }
  return true;    
}
  


  function flipBoard() {
    rotated = !rotated;
  }

  function playerMove(i , j) {
    let selectedPiece = chessBoard.boardArray[i][j][1];
    if (currentMove === "white" ) {
      if (selectedPiece.color === "white" ) {
        pickPiece(i,j);
      }
      else if (piecePicked && movedPiece.color === "white") {
      releasePiece(i,j , "black")
      }
    }
    if (currentMove === "black" ) {
      if (selectedPiece.color === "black" ) {
        pickPiece(i,j);
      }
      else if (piecePicked && movedPiece.color === "black") {
        releasePiece(i,j , "white")
      }
    }
  }


  var selectedPiece = [-1,-1];
  function clickHandler(i, j) {
    if (!mate) {
      playerMove(i , j)
    }
  }
  function checkMove(i,j) {
  }

  function pickPiece(i,j) {
    selectedPiece = [i,j]
    piecePicked = true;
    movedPiece = chessBoard.boardArray[i][j][1];

    if (kingInCheck) {
      movedPiece.validMoves = nextMove(chessBoard.boardArray[i][j][1].position, chessBoard.boardArray, "block")
    }
    else {
      chessBoard.boardArray[i][j][1].findValidMoves(chessBoard.boardArray);
      chessBoard.boardArray[i][j][1].validMoves = nextMove([i, j], chessBoard.boardArray, "notblock")
    }

    oldJ = j;
    oldI = i;

    console.log("Piece picked!")


  }


  function releasePiece(i, j , color) {
    let pieceValidMoves = movedPiece.validMoves;
    selectedPiece = [-1,-1];
    piecePicked = false;



    modifyPiece();

    
    let whiteControlledSquares = controlledPieces("white", chessBoard.boardArray)
    let blackControlledSquares = controlledPieces("black", chessBoard.boardArray)
    let [kI, jI] = getKingPos(currentMove , chessBoard.boardArray);

    if (currentMove == "white") {
      kingInCheck =chessBoard.boardArray[kI][jI][1].checkedKing(blackControlledSquares)
    }
    else {
      kingInCheck =chessBoard.boardArray[kI][jI][1].checkedKing(whiteControlledSquares)
    }

    if (kingInCheck) {
      if (checkMate(movedPiece.color, chessBoard.boardArray)) {
        console.log("Checkmate");
        mate = true;
      }
    } 
    


  function modifyPiece() {
    if (includes(pieceValidMoves, [i,j])) {

      chessBoard.boardArray[i][j][1] = movedPiece;
      chessBoard.boardArray[i][j][1].position[0] = i;
      chessBoard.boardArray[i][j][1].position[1] = j;
      chessBoard.boardArray[i][j][1].validMoves = [];

      chessBoard.boardArray[oldI][oldJ][1] = new emptyPiece(oldI , oldJ, "invis" , "/chesspieces/invisible.png", null , false)
      currentMove = color;
      console.log("Piece released!")

      }
    }
  }

</script>

<main>
   <button on:click={flipBoard}>FLIP BOARD HERE CUNT</button>
   {#if mate}
    
   {/if}
   <h1>{kingInCheck}</h1>
  <div class="game-container {rotated ? 'rotated' : ''}">
    <div class="this_div">
      {#each chessBoard.boardArray as row, i}
        <div class="row">
          {#each row as cell, j}


              <div on:click={() => {clickHandler(i, j)}}  class="
  {((j + 1) % 2 === 1 && (i + 1) % 2 === 0) || ((j + 1) % 2 === 0 && (i + 1) % 2 === 1) ? ' white' : 'black'}  cell
  {(selectedPiece[0] === i && selectedPiece[1] === j) ? 'green' : ' '}" id={chessBoard.boardArray[i][j]}>
                <img class="  {rotated ? 'rotatedPiece' : ''} bigger"  src={chessBoard.boardArray[i][j][1].icon}/>
              </div>
          {/each}


        </div>
      {/each}
    </div>
  </div>
</main>

<style>

  main {
    padding-top: 1.5rem;
  }
  .game-container {

    transform:scaleY(-1);
    color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .this_div {
    -webkit-box-shadow: 0px 0px 15px 4px rgba(0,0,0,0.53);
    box-shadow: 0px 0px 15px 4px rgba(0,0,0,0.53);
    cursor: pointer;
  }

  .row {
    display: flex;
  }
  .cell {
      position: relative;
    -moz-box-shadow:    inset 0 0 10px #00000060;
    -webkit-box-shadow: inset 0 0 10px #00000060;
    box-shadow:         inset 0 0 10px  #00000060;
    width: 65px;
    height: 65px;
    transform: rotate(180deg);
  }

  .black {
    background: rgb(2,0,36);
    background: linear-gradient(45deg, #1E3655 35% ,#4E6B7D 100%);
  }

  .white {
    background:#e0ded8 ;
  }

  img {
      position: absolute;
      top:0%;
      left:0%;
    transition: transform .2s;
    width: 65px;
    height: auto;
  }

  .green_circle {

  }

  .green {
      background: green;
      opacity: 100;
  }

  .rotated {
      transform: scaleX(-1);
  }

  .rotatedPiece {
      transform: scale(1);
      transform: rotate(180deg);
  }



</style>

<!-- {#if  movedPiece && includes( movedPiece.validMoves , [i,j]) ? 'green_circle' : ''}
<h1 class="green_circle">Hey</h1>
{/if} -->
