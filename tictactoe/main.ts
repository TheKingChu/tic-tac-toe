import { createBoard, printBoard, makeMove, checkWinner, getAvailableMoves } from './game.ts';
import { prompt } from './utils.ts';

type Scores = {
  X: number;
  O: number;
  Tie: number;
};

async function main(){
  let playAgain = true;

  const scores: Scores = { X: 0, O: 0, Tie: 0 };

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
      scores[winner as keyof Scores]++;
      console.log(`Player ${winner} wins!`);
    }
    else{
      scores.Tie++;
      console.log("Its a tie!");
    }

    console.log(`Scores: X - ${scores.X}, O - ${scores.O}, Ties - ${scores.Tie}`);

    const replay = await prompt("Play again? (yes/no): ");
    playAgain = replay.toLowerCase().startsWith("y");
  }

  console.log("Final Scores:");
  console.log(`Player X: ${scores.X}, Player O: ${scores.O}, Ties: ${scores.Tie}`);
  console.log("Thanks for playing");
}

function getAIMove(board: string[]): string{
  const availableMoves = getAvailableMoves(board);
  const bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  return bestMove;
}

main();