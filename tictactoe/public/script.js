document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isGameOver = false

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(const combo of winningCombinations){
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if(!board.includes("")){
            return "Tie";
        }

        return null;
    };

    const updateStatus = (winner) => {
        if (winner === "Tie") {
            status.textContent = "It's a tie";
        }
        else if(winner){
            status.textContent = `Player ${winner} wins!`;
        }
        else{
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const handleClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if(board[index] || isGameOver){
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        const winner = checkWinner();
        if(winner){
            isGameOver = true;
            updateStatus(winner);
        }
        else{
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus(null);
        }
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameOver = false;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
        updateStatus(null);
    };

    cells.forEach((cell) => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});