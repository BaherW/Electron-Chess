<script>
  import { Board , Pawn , spawnPieces , includes , emptyPiece } from './components/helper.ts'


  var chessBoard = new Board()
  chessBoard = spawnPieces(chessBoard);
  var piecePicked = false;
  var movedPiece;
  var oldJ = 0;
  var oldI = 0;























 
  function clickHandler(i, j) {

    if (piecePicked) {
      releasePiece(i,j)

    }
    else {
      pickPiece(i,j);
    }

    console.log(chessBoard.boardArray[i][j][1].name)

  }


  function pickPiece(i,j) {
  
    piecePicked = true;
    
    movedPiece = chessBoard.boardArray[i][j][1];
    chessBoard.boardArray[i][j][1].findValidMoves(chessBoard.boardArray);

    oldJ = j;
    oldI = i;
  }


  function releasePiece(i, j) {
    let pieceValidMoves = movedPiece.validMoves;
    piecePicked = false;
    modifyPiece()


  function modifyPiece() {
    if (includes(pieceValidMoves, [i,j])) {

      chessBoard.boardArray[i][j][1] = movedPiece;
      chessBoard.boardArray[i][j][1].position[0] = i;
      chessBoard.boardArray[i][j][1].position[1] = j;
      chessBoard.boardArray[i][j][1].validMoves = [];

      chessBoard.boardArray[oldI][oldJ][1] = new emptyPiece(oldI , oldJ, "invis" , null, null , false) 
      }
    }
  }
</script>

<div>
  <div class="game-container">
    <div>
      {#each chessBoard.boardArray as row, i}
        <div class="row">
          {#each row as cell, j}
            {#if ((j + 1) % 2 === 1 && (i + 1) % 2 === 0) || ((j + 1) % 2 === 0 && (i + 1) % 2 === 1)}
              <div on:click={() => {clickHandler(i, j)}} class="cell white"id={chessBoard.boardArray[i][j]}><img src={chessBoard.boardArray[i][j][1].icon}/></div>
            {:else}
              <div
                on:click={() => {clickHandler(i, j)}} class="cell black"id={chessBoard.boardArray[i][j]}><img src={chessBoard.boardArray[i][j][1].icon}/></div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .game-container {
    transform:scaleY(-1);
    color: white;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .row {
    display: flex;
  }
  .cell {
    width: 65px;
    height: 65px;
  }

  .black {
    background-color: rgb(63, 32, 15);
  }

  .white {
    background-color: burlywood;
  }

  img {
    transform:scaleY(-1);
  }
</style>
