const gameboard = (function gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = function() {
        return board
    }

    const makeMove = function(index, symbol) {
        board[index] = symbol
    }

    return {getBoard, makeMove}
})()



function Player(name, symbol) {
    return {name, symbol}
}

const player1 = Player("Tom", "X")
const player2 = Player("Adam", "O")



const gameController = (function gameController() {
    const winningPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

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
                }
            }
        })

        if (hasWinner) {
            console.log(`player '${winnerSymbol}' has won the game`)
        } else if (!hasWinner && !getBoard.includes("")) {
            console.log('draw')
        }
    }
    
    let activePlayer = player1
    function playRound(index) {
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

    return {checkWinner, playRound}

})()




const displayController = (function displayController() {
    
    const board = document.querySelector('.board')
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

    updateDisplay()
    return {updateDisplay}

})()