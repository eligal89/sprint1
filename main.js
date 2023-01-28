'use strict'

const FLAG = '🚩'
const MINE = '💣'
const SMILLY = '🤯'
const NORAML = '😎'

var gTimer = false;

var flagOnRealMine
var gCombinemineAndSafe //from here i can take total length
var gBoard
var gMines // can take the length of mines

var gFlagsCounter  // count how many flags were raized
var gNumOfShownCells  // count how many cells are been seen
var glifeCounter

var gElFlag = document.querySelector('.flag')
var gElMarkedCell = document.querySelector('.marked-cells')

function onInit() {
    gBoard = buildBoard(16, 2)
    renderBoard(gBoard)
}


function creatingGame(gTotalCells, gNumberOfMinesInGame) {
    var mines = []
    var safeCells = []

    for (var i = 0; i < gNumberOfMinesInGame; i++) {
        mines.push({ id: i, type: "mine", isMine: true, isShown: false, isMarddByFlag: false })
        gMines.push(mines[i])

    }
    for (var i = 0; i < gTotalCells - gNumberOfMinesInGame; i++) {
        safeCells.push({ id: i + 2, type: "safe", isShown: false, isMarddByFlag: false })
    }

    var ArrCombinemineAndSafe = [...mines, ...safeCells];
    ArrCombinemineAndSafe.sort(() => Math.random() - 0.5);
    return (ArrCombinemineAndSafe)


}

function buildBoard(gTotalCells, numOfTotalMines) {
    flagOnRealMine = 0
    gNumOfShownCells = 0
    glifeCounter = 3
    gFlagsCounter = 0
    gElMarkedCell.innerHTML = '0'
    gElFlag.innerHTML = '0'
    gMines = []


    gCombinemineAndSafe = creatingGame(gTotalCells, numOfTotalMines)
    var squareRott = (gCombinemineAndSafe.length ** 0.5)
    const board = []
    var counter = 0
    for (var i = 0; i < squareRott; i++) {
        board.push([])
        for (var j = 0; j < squareRott; j++) {
            var cell = gCombinemineAndSafe[counter]
            board[i][j] = cell
            counter++
        }
    }

    renderBoard(board, gCombinemineAndSafe)
    gBoard = board
    console.log('gBoard', gBoard);
    return (board)
}

function onCellClicked(elBtn, ev, cellI, cellJ) {
    var eLbody = document.querySelector('body')
    var elLifeCounter = document.querySelector('.life-counter')
    elLifeCounter.innerText = `the amount of life you have in game: ${glifeCounter - 1}`

    if (gBoard[cellI][cellJ].isShown) return
    gBoard[cellI][cellJ].isShown = true

    if ((gBoard[cellI][cellJ].isMine)) { // check the modal if mine true
        elBtn.innerHTML = MINE
        glifeCounter--

        if (gMines.length === 2 && glifeCounter === 2) { // checking for 4X4 mode
            (glifeCounter--)
            elLifeCounter.innerText = `the amount of life you have in game: ${glifeCounter}`
        }

        if (glifeCounter === 0) { // if run out of the 3 lives been given. 

            var elsTdAll = document.querySelectorAll('.board td')
            for (let i = 0; i < elsTdAll.length; i++) { elsTdAll[i].onclick = null }

            var elsTdMine = document.querySelectorAll('.mine')
            for (let i = 0; i < elsTdMine.length; i++) { elsTdMine[i].innerHTML = MINE }

            eLbody.style.backgroundImage = "url('img/download.jpg')"
            var elRestart = document.querySelector('.restart')
            elRestart.innerHTML = SMILLY
            endGame()
        }

    }

    else { // else if mine false
        elBtn.classList.add('marked')
        gNumOfShownCells++
        gElMarkedCell.innerHTML = gNumOfShownCells
        elBtn.innerHTML = elBtn.attributes[2].value

        if (elBtn.attributes[2].value === '0') { // if the inside cell is 0 - no mines around
            if (gBoard[cellI][cellJ].isMarddByFlag) return
            expand(cellI, cellJ)
        }

        if (gNumOfShownCells === gCombinemineAndSafe.length - gMines.length) { // if for the win
            eLbody.style.backgroundImage = "url('img/images.jpg')"
            var elsTdAll = document.querySelectorAll('.board td')
            for (let i = 0; i < elsTdAll.length; i++) {
                elsTdAll[i].onclick = null
            }
            endGame()
        }
    }
}


function expand(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (gBoard[i][j].isMarddByFlag) continue
            var elTd = document.getElementById(`${i},${j}`)
            elTd.innerText = elTd.attributes[2].value
            if (!gBoard[i][j].isShown ) {
                gBoard[i][j].isShown = true
                gBoard[i][j].isMarddByFlag = true
                gNumOfShownCells++
                var gElMarkedCell = document.querySelector('.marked-cells')
                gElMarkedCell.innerText = gNumOfShownCells
                elTd.classList.add('marked')
                
            }
        }
    }
}

function flagCell(elCell, cellI, cellJ) {
    window.event.preventDefault()
    gElFlag.innerText = gFlagsCounter

    if (gBoard[cellI][cellJ].isShown) return

    if (gBoard[cellI][cellJ].isMarddByFlag) { // switch the flag val if it comes true

        if (gBoard[cellI][cellJ].isMine) flagOnRealMine--
        gBoard[cellI][cellJ].isMarddByFlag = false
        elCell.innerHTML = 'x'
        gFlagsCounter--
        flagOnRealMine ++

        gElFlag.innerText = gFlagsCounter

    } else {
        gBoard[cellI][cellJ].isMarddByFlag = true
        elCell.innerHTML = FLAG
        gFlagsCounter++
        gElFlag.innerText = gFlagsCounter
        if (gBoard[cellI][cellJ].isMine) flagOnRealMine++
            else flagOnRealMine --
            console.log('flagOnRealMine', flagOnRealMine);
        if (flagOnRealMine === gMines.length) alert('heyy');
        if ((flagOnRealMine === gMines.length) && (gNumOfShownCells === gCombinemineAndSafe.length - gMines.length))
            endGame()
    }
}

function endGame() {
    setTimeout(function () {
        document.body.style.background = 'rgb(223, 223, 241)'
    }, 2000);
}






