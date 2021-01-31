<script>

  import {Board} from './components/helper.ts'
  
  var chessBoard = new Board();

// board -> [a1 , a2 , a3] -> [a1, Piece.class] -> f , p
  function clickHandler(i , j) {
      console.log(chessBoard.boardArray[i][j])
      
      //isValidMove(chessBoard.boardArray[i][j].piece)
  }
</script>


<div>
  <div class="game-container">
    <div>
      {#each chessBoard.boardArray as row, i}
        <div class=row>
          {#each row as cell, j}
            {#if ((j+1) % 2 === 1 && (i+1) % 2 === 0) || ((j+1) % 2 === 0 && (i+1) % 2 === 1)}
              <div  on:click={()=> {clickHandler(i,j)}} class="cell white" id={chessBoard.boardArray[i][j]}></div>
            {:else}
              <div on:click={()=> {clickHandler(i,j)}} class="cell black" id={chessBoard.boardArray[i][j]}></div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>




<style>
  .game-container {
    transform: scaleY(-1);
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
    background-color: burlywood
  }

</style>

