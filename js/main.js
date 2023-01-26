'use strict'

const FLAG = '🚩'
const MINE = '💣'

var gTimer = false;



// var gElMinutes = document.getElementById("min");
// var gElSeconds = document.getElementById("sec");
// var gIntervalId;

var gNumberOfMinesInGame
var gTotalCells

var gBoard
var gLevel
var gGame


function onInit() {
    gLevel = {
        SIZE: 16,
        MINES: 2
    }
    gGame = {
        minesAround:0,
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
    //console.table(gBoard)
    renderBoard(gBoard)
    //  console.table(gBoard)
}

//based on the num of mines and total cells this function will build 1: arr of mines; 2: arr of safe cells; 3: arr that combine the 2 of them, shuffle it  and return an array of size**
// basicly this fun will create the modal in 1D array
function creatingGame(gTotalCells, gNumberOfMinesInGame) {
    var gNumberOfMinesInGame
    var gTotalCells
    var mines = []
    var safeCells = []

    for (var i = 0; i < gNumberOfMinesInGame; i++) {
        mines.push({ id: i, type: "mine", isShown: false, isMarked: false })
        // console.log(mines);
    }
    for (var i = 0; i < gTotalCells - gNumberOfMinesInGame; i++) {
        safeCells.push({ id: i + 2, type: "safe", isShown: false, isMarked: false })
        //console.log(safeCells);
    }
    var combinemineAndSafe = [...mines, ...safeCells];
    combinemineAndSafe.sort(() => Math.random() - 0.5);
    // console.log(combinemineAndSafe);
    return (combinemineAndSafe)
}

// this function will take combined arr from creatingGame(size) and build a board based on the arr above. this is the modal in 2D array
function buildBoard(gTotalCells, numOfTotalMines) {
    var combinemineAndSafe = creatingGame(gTotalCells, numOfTotalMines)
    var squareRott = (combinemineAndSafe.length ** 0.5)

    const board = []
    var counter = 0
    for (var i = 0; i < squareRott; i++) {
        board.push([])
        for (var j = 0; j < squareRott; j++) {
            var cell = combinemineAndSafe[counter]
            board[i][j] = cell
            counter++
        }
    }
    renderBoard(board)
    console.log(board);
    return board
}

// firts need to define if there wsa a left or right click 
// after that - if it was left click there are few options. right click will mark a flag. 
function onCellClicked(elBtn, ev, cellI, cellJ) {
    var elMarkedCell = document.querySelector('.marked-cells')
    if (ev.button === 0) {
        if (elBtn.classList.contains('mine')) {
            elBtn.innerHTML = MINE
            alert('game over')
            endGame('lossing')
        }
         if (!gBoard[cellI][cellJ].isShown && !elBtn.classList.contains('mine')){
            gGame.shownCount++
            elMarkedCell.innerHTML = gGame.shownCount
            elBtn.innerHTML = ev.target.attributes[2].textContent
            gBoard[cellI][cellJ].isShown = true
            console.log(gBoard[cellI][cellJ].isShown)
            if (ev.target.attributes[2].textContent=== '0' ){
            expandingAround(cellI, cellJ)
            }
        }
    }
}

//handeling left click 
function cellMarked(elCell, cellI, cellJ) {
    // gIntervalId = setInterval(timer, 1000);
    // gTimer = true;
    // gGame.isOn = true;
    var elFlag = document.querySelector('.flag')
    elFlag.innerText = gGame.markedCount

    if (gBoard[cellI][cellJ].isShown) {
        console.log('it show i return');
        return
    }

    if (gBoard[cellI][cellJ].isMarked != true) {
        // console.log('im in');
        gBoard[cellI][cellJ].isMarked = true
        //console.log(gBoard[1][1].isMarked);
        elCell.innerHTML = FLAG
        gGame.markedCount++
        elFlag.innerText = gGame.markedCount
    }
    else {
        gBoard[cellI][cellJ].isMarked = false
        elCell.innerHTML = 'x'
        gGame.markedCount--
        elFlag.innerText = gGame.markedCount
    }
    // console.log(gBoard[cellI][cellJ])
    // console.log(gBoard[cellI][cellJ].isMarked);
    // console.log('im in');
    // console.log(gBoard[cellI][cellJ].isMarked)

    // console.log(gBoard[cellI][cellJ].isMarked)  
    if (gGame.shownCount === (gTotalCells - gNumberOfMinesInGame) && (gGame.markedCount === numOfTotalMines)) {
        endGame('winning') // not working yet
    }
}
// if (gBoard[cellI][cellJ].isMarked = true) {
//     // console.log('im in');
//     gBoard[cellI][cellJ].isMarked = false
//     gGame.shownCount--
//     elCell.innerHTML = 'x'

//switch cases to win or lose
function endGame(scenario) {
    switch (scenario) {
        case 'lossing': {
        }
        case 'winning': {
            console.log('you won!');
            
        }
    }
}

function restartGame (){
    onInit()
}


//this function will be set if you land on a zero cell. still haing problem to understend why undif; maybe duo to string vs num?
    function expandingAround(cellI, cellJ){ //still haing a problem of undifaind
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            var elTd = document.getElementById(`${i},${j}`);
            elTd.innerText = gBoard[i][j].minesAround;
            if (gBoard[i][j].isShown = false) {
                gBoard[i][j].isShown = true;
                gGame.shownCount++;
                var elMarkedCell = document.querySelector('.marked-cells');
                elMarkedCell.innerText = gGame.shownCount
            }
        }
    }
}