const cellElements = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

let circleTurn = false;
restartButton.addEventListener('click', startGame)

startGame();


function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        circleTurn = false;
        cell.addEventListener('click', handleClick, { once: true })
    })
    addHoverEffects();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    // put the mark
    // check for a win
    // check for a draw
    // switch turns
    const cell = e.target;
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        switchTurn();
        addHoverEffects();
    }
}

function addHoverEffects() {
    board.classList.remove('x');
    board.classList.remove('circle');
    circleTurn ? board.classList.add('circle') : board.classList.add('x');
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const switchTurn = () => circleTurn = !circleTurn;

const checkWin = currentClass => {
    return winningCombinations.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

const endGame = draw => {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!!!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`
    }
    winningMessageElement.classList.add('show');
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    })
}






