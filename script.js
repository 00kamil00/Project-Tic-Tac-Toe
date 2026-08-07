// -------------------- gameboard --------------------
const gameboard = (function gameboard() {
    let board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = function() {
        return board
    }

    const makeMove = function(index, symbol) {
        board[index] = symbol
    }

    const resetBoard = function() {
        board = ["", "", "", "", "", "", "", "", ""]
    }


    return {getBoard, makeMove, resetBoard}
})()
// -------------------- gameboard --------------------



// -------------------- player --------------------
function Player(name, symbol) {
    return {name, symbol}
}

const player1 = Player("Tom", "X")
const player2 = Player("Adam", "O")
// -------------------- player --------------------



// -------------------- game controller --------------------
const gameController = (function gameController() {
    const winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let isGameOver = false
    let activePlayer = player1


    function checkWinner() {
        const getBoard = gameboard.getBoard()
        let hasWinner = false
        let winnerSymbol = null
        winningPattern.forEach((winPattern) => {
            const pattern1 = getBoard[winPattern[0]]
            const pattern2 = getBoard[winPattern[1]]
            const pattern3 = getBoard[winPattern[2]]
            if (pattern1 != "") {
                if (pattern1 === pattern2  && pattern2 === pattern3) {
                    hasWinner = true
                    winnerSymbol = pattern1                  
                    isGameOver = true
                }
            }
        })

        if (hasWinner) {
            console.log(`player '${winnerSymbol}' has won the game`)
        } else if (!hasWinner && !getBoard.includes("")) {
            console.log('draw')
        }
    }
    
    
    function playRound(index) {
        if (isGameOver) return
        if (gameboard.getBoard()[index] === "") {
            gameboard.makeMove(index, activePlayer.symbol)
            checkWinner()
            if (activePlayer === player1) {
                activePlayer = player2
            } else {
                activePlayer = player1
            }
        }
    }


    function resetGame() {
        gameboard.resetBoard()
        activePlayer = player1
        isGameOver = false
    }


    return {checkWinner, playRound, resetGame}
})()
// -------------------- game controller --------------------



// -------------------- display controller --------------------
const displayController = (function displayController() {
    
    const board = document.querySelector('.board')
    const btn = document.querySelector('.btn')
    

    function updateDisplay() {
        board.textContent = ""

        gameboard.getBoard().forEach((item, index) => { 
            const new_div = document.createElement('div')
            new_div.classList.add('symbol')
            new_div.dataset.index = index
            new_div.textContent = item
            board.appendChild(new_div)
        })
    }

    board.addEventListener("click", (e) => {
        const index = e.target.dataset.index
        if (index === undefined) return

        gameController.playRound(index)
        updateDisplay()
    })
    
    btn.addEventListener("click", () => {
        gameController.resetGame()
        updateDisplay()
    })


    updateDisplay()
    return {updateDisplay}
})()
// -------------------- display controller --------------------