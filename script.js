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

    let isGameActive = false
    let isGameOver = false
    let hasWinner = false
    let activePlayer = player1
    const border = document.querySelector('.game-status')


    function gameActivity() {
        isGameActive = true
    }


    function setStatus() {
        if (!isGameOver) {
            border.textContent = `It's ${activePlayer.name} turn`
        } else if (isGameOver) {
            if (!hasWinner) {
                border.textContent = "Game end, it's draw"
            } else {
                border.textContent = `Player: ${activePlayer.name} has won the game`
            }
        }
    }


    function checkWinner() {
        const getBoard = gameboard.getBoard()
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
            isGameOver = true
        }
    }
    
    
    function playRound(index) {
        if (isGameOver) return
        if (isGameActive) {
            if (gameboard.getBoard()[index] === "") {
                gameboard.makeMove(index, activePlayer.symbol)
                checkWinner()
                if (!isGameOver && !hasWinner) {
                    if (activePlayer === player1) {
                            activePlayer = player2
                    } else {
                        activePlayer = player1
                    }
                }    
            } 
        }
    }   


    function resetGame() {
        gameboard.resetBoard()
        activePlayer = player1
        isGameOver = false
        hasWinner = false
    }


    return {gameActivity, setStatus, checkWinner, playRound, resetGame}
})()
// -------------------- game controller --------------------



// -------------------- display controller --------------------
const displayController = (function displayController() {
    
    const board = document.querySelector('.board')
    const resetBtn = document.querySelector('.reset_btn')
    board.classList.add('disabled')
    

    function updateDisplay() {
        board.textContent = ""

        gameboard.getBoard().forEach((item, index) => { 
            const new_div = document.createElement('div')
            new_div.classList.add('symbol')
            new_div.dataset.index = index
            new_div.textContent = item
            board.appendChild(new_div)
        })
        gameController.setStatus()
    }

    board.addEventListener("click", (e) => {
        const index = e.target.dataset.index
        if (index === undefined) return

        gameController.playRound(index)
        updateDisplay()
    })
    
    resetBtn.addEventListener("click", () => {
        gameController.resetGame()
        updateDisplay()
    })

    
    gameController.setStatus()
    updateDisplay()
    
    
    const startBtn = document.querySelector('.startBtn')
    const p1_input = document.querySelector('#player1')
    const p2_input = document.querySelector('#player2')
    const dialog = document.querySelector('#my-dialog')

    startBtn.addEventListener("click", () => {
        board.classList.remove('disabled')
        gameController.gameActivity()

        const p1name = p1_input.value
        const p2name = p2_input.value
        
        p1_input.value = ""
        p2_input.value = ""


        if (p1name === "") {
            player1.name = "player1"
        } else {
            player1.name = p1name
        }
        if (p2name === "") {
            player2.name = "player2"
        } else {
            player2.name = p2name
        }
        
        dialog.close()
        gameController.resetGame()
        updateDisplay()
    })
    
    return {updateDisplay}
})()
// -------------------- display controller --------------------