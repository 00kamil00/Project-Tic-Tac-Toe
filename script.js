const gameboard = (function gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = function() {
        return board
    }

    const makeMove = function(index, sign) {
        board[index] = sign
    }

    return {getBoard, makeMove}
})()


function Player(name, sign) {
    return {name, sign}
}


(function gameController() {
    
})()