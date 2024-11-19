import { createBoard, printBoard, makeMove, checkWinner, getAvailableMoves } from './game.ts';
import { prompt } from './utils.ts';

async function main(){
  let playAgain = true;

  while (playAgain){
    console.log("Welcome to Tic Tac Toe!");
    const mode = await prompt("Choose mode: 1 for single player, 2 for multi player: ");
    const isSinglePlayer = mode.trim() === "1";

    const board = createBoard();
    let currentPlayer = 'X';
    let winner = null;
    let moves = 0;

    printBoard(board);

    while(!winner && moves < 9){
      if(isSinglePlayer && currentPlayer === 'O'){
        console.log("AI is making its move...");
        const aiMove = getAIMove(board);
        makeMove(board, aiMove, 'O');
      }
      else{
        const position = await prompt(
          `Player ${currentPlayer}, enter a position (1-9): `
        );
        if(!makeMove(board, position, currentPlayer)){
          console.log("Invalid move, try again.");
          continue;
        }
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

function getAIMove(board: string[]): string{
  const availableMoves = getAvailableMoves(board);
  const bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  return bestMove;
}

main();