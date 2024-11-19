import { createBoard, printBoard, makeMove, checkWinner } from './game.ts';
import { prompt } from './utils.ts';

async function main(){
  let playAgain = true;

  while (playAgain){
    const board = createBoard();
    let currentPlayer = 'X';
    let winner = null;
    let moves = 0;

    console.log("Welcome to Tic Tac Toe!");
    printBoard(board);

    while(!winner && moves < 9){
      const position = await prompt(
        `Player ${currentPlayer}, enter a position (1-9): `
      );

      if(!makeMove(board, position, currentPlayer)){
        console.log("Invalid move, try again.");
        continue;
      }

      moves++;
      printBoard(board);
      winner = checkWinner(board);

      if(!winner){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    if(winner){
      console.log(`Player ${winner} wins!`);
    }
    else{
      console.log("Its a tie!");
    }

    const replay = await prompt("Play again? (yes/no): ");
    playAgain = replay.toLowerCase().startsWith("y");
  }

  console.log("Thanks for playing");
}

main();