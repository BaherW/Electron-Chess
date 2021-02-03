<script>
  import { spawnPieces , includes ,  } from './components/helper'
  import {Board , controlledPieces } from './components/board'
  import {emptyPiece} from './components/pieces'


  var chessBoard = new Board();
  chessBoard = spawnPieces(chessBoard);


  var piecePicked = false;
  var currentMove = "white";
  var checkedKing = false;
  var movedPiece;
  var oldJ = 0;
  var oldI = 0;


  function playerMove(i , j) {
    
    let selectedPiece = chessBoard.boardArray[i][j][1];
    console.log([i,j])


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




  

  function clickHandler(i, j) {


    
    let whiteControledSquares = controlledPieces("white" , chessBoard.boardArray)
    let blackControledSquares = controlledPieces("black" , chessBoard.boardArray)

    if (!inCheck) {


      console.log(chessBoard.boardArray[i][j][1].name)
    }

    else {
      checkMove(i,j)

      //Check logic goes in here.


    }
    


  }

  function checkMove(i,j) {

  }


  function pickPiece(i,j) {
  
    piecePicked = true;
    movedPiece = chessBoard.boardArray[i][j][1];
    chessBoard.boardArray[i][j][1].findValidMoves(chessBoard.boardArray);
    //console.log(chessBoard.boardArray[i][j][1].validMoves)
    
    oldJ = j;
    oldI = i;

    console.log("Piece picked!")
  }


  function releasePiece(i, j , color) {

    let pieceValidMoves = movedPiece.validMoves;
    piecePicked = false;
    modifyPiece();
    

    

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
  <!-- <button on:click={flipBoard}>FLIP BOARD HERE CUNT</button> -->
  <div class="game-container">
    <div class="this_div">
      {#each chessBoard.boardArray as row, i}
        <div class="row">
    

          {#each row as cell, j}
            {#if ((j + 1) % 2 === 1 && (i + 1) % 2 === 0) || ((j + 1) % 2 === 0 && (i + 1) % 2 === 1)}
              <div on:click={() => {playerMove(i, j)}} class="cell white " id={chessBoard.boardArray[i][j]}><img class=" rotated"  src={chessBoard.boardArray[i][j][1].icon}/></div>
            {:else}
              <div
                on:click={() => {playerMove(i, j)}} class="cell black "id={chessBoard.boardArray[i][j]}><img class=" rotated "  src={chessBoard.boardArray[i][j][1].icon}/></div>
            {/if}
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
  .flipped_board {
    transform:rotate(180deg)

  }

  .flipped_pieces {
    transform:scaleY(1);
  }

  .row {
    display: flex;
  }
  .cell {
    -moz-box-shadow:    inset 0 0 10px #00000060;
    -webkit-box-shadow: inset 0 0 10px #00000060;
    box-shadow:         inset 0 0 10px  #00000060;
    width: 65px;
    height: 65px;
  }

  .black {
    background: rgb(2,0,36);
    background: linear-gradient(45deg, #1E3655 35% ,#4E6B7D 100%);
  }

  .white {
    background:#a5a9ad ;
  }

  .rotated {
    
  }


  .bigger {
    transition: transform .2s; /* Animation */
  }

  .bigger:hover {
    transform: scale(1.25);

  }

  img {
    transform:scaleY(-1);
    width: 63px;
    height: 63px;
  }
</style>
