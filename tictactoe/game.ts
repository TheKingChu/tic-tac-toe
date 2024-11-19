export type Board = string[];

export function createBoard(): Board{
    return Array(9).fill(" ");
}

export function printBoard(board: Board): void{
    console.log(board.slice(0, 3).join(" | "));
    console.log("---------");
    console.log(board.slice(3, 6).join(" | "));
    console.log("---------");
    console.log(board.slice(6, 9).join(" | "));
}

export function checkWinner(board: Board): string | null{
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for(const combination of winningCombinations){
        const [a, b, c] = combination;
        if(board[a] !== " " && board[a] === board[b] && board[b] === board[c]){
            return board[a];
        }
    }
    return null;
}

export function makeMove(board: Board, position: string, player: string): boolean{
    const pos = parseInt(position) - 1;
    if(isNaN(pos) || pos < 0 || pos > 8 || board[pos] !== " "){
        return false;
    }

    board[pos] = player;
    return true;
}