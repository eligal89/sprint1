'use strict'

const FLAG = '🚩'
const MINES = '👻' // will change latter


var gNumOfcells
var gMines
var gBoard
var gLevel
var gGame


var gElTd



function onInit() {
    //console.log('im in');
    gBoard = {// not sure of how much i need that
        minesAroundCount: 4,
        isShowm: true,
        isMine: false,
        isMarked: true
    }
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard)

}

//based on the num of mines and total cells this function will build 1: arr of mines; 2: arr of safe cells; 3: arr that combine the 2 of them, shuffle it  and return an array of size**
// basicly this fun will create the modal 
function creatingGame(size) {
    gMines = 2
    gNumOfcells = 16
    var mines = []
    var safeCells = []
    for (var i = 0; i < gMines; i++) {
        mines.push({ id: i, type: "mine", isShowm: true, isMarked: true })
        // console.log(mines);

    }
    for (var i = 0; i < gNumOfcells - gMines; i++) {
        safeCells.push({ id: i + 2, type: "safe", isShowm: true, isMarked: true })
        // console.log(safeCells);
    }
    var combinemineAndSafe = [...mines, ...safeCells];
    combinemineAndSafe.sort(() => Math.random() - 0.5);
    // console.log(combinemineAndSafe);
    return combinemineAndSafe

}
// this function will take combined arr from creatingGame(size) and build a board based on the arr above 
function buildBoard(squareCells) {
    var combinemineAndSafe = creatingGame()
    //console.log(combinemineAndSafe);
    squareCells = 4
    const board = []
    var counter = 0
    for (var i = 0; i < squareCells; i++) {
        board.push([])
        for (var j = 0; j < squareCells; j++) {
            var cell = combinemineAndSafe[counter]
            //console.log(cell.type);
            board[i][j] = cell
            counter++
        }

    }
    for (var i = 0; i < squareCells; i++) {
        for (var j = 0; j < squareCells; j++) {
            //console.log('you enterd to line:',i, 'and row:' ,j);
            // var minesCount =  countMinesNeighbors(i,j,board)
        }
    }
    // console.table(board);
    return board
}

function renderBoard(board) {
    //console.log('im in');
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellIdx = board[i][j].id
            //console.log(cellIdx);
            console.log(board[i][j].type);
            var cellType = board[i][j].type
            var minesCount = countMinesNeighbors(i, j, board)
            //var currCell = board[i][j]
            strHTML += `<td  class="${cellType}" 
                data-i="${i}" data-j="${j}"
                onclick="onCellClicked(this)">${minesCount}</td>`
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


//for now (!!!) this function will take each cell (including mines) and check how many mines there are surrounding it
function countMinesNeighbors(cellI, cellJ, board) {
    console.log('im in');
    console.log(cellI, cellJ, board);
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        console.log('hey');
        
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            console.log('HEY');
            
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].type === 'mine') minesCount++
            // ?!?!?!?!? how come its seems like ok but not as expected from the log???????????????????
            console.log(i, j, board[i][j].type === 'mine');
        }
    }
    console.log(minesCount);
    return minesCount
}

// firts need to define if there wsa a left or right click 
// after that - if it was left click there are few options. right click will mark a flag. 
function onCellClicked(elBtm) {
    console.log(elBtm);
    
    if (elBtm.classList.contains('mine')) {
        console.log('i am a mine');
        endGame('lossing')
    }
    else if (elBtm.innerHTML === '0') {
        console.log ('no neighbors')
    }
    else {
        console.log('last case');
        
    }
    // console.log(ev.target);
    // console.log(ev.srcElement);

    // var elTd = ev.target;
    // console.log(elTd);

    //     if (elTd.classList.contains('mine')) {
    //         elTd.innerHTML = MINES;
    //     }
}

//function endGame(){}
//     var elTdSafe = document.querySelector(".safe")
//     var elTdmine = document.querySelector('.mine')


function endGame(scenario) {
    switch (scenario) {
        case 'lossing': {
            alert('you lose')
            break
        }
        case 'winning': { }

    }
}

//     clearInterval(gTimerInterval)
//     //timer()
// }

// function choseDifficulty(numOfCells) {
//     console.log('1');

//     switch (numOfCells) {
//         case 4: gNumOfcells = 16
//             gMines = 2
//             totalRows = 4
//             break;
//         case 8: gNumOfcells = 64
//             gMines = 12
//             totalRows = 8
//             break;
//         case 12: gNumOfcells = 124
//             gMines = 30
//             totalRows = 12
//             break;
//     }
//     gBoard = createBoard()
//     renderBoard(gBoard)
//     console.log('the number of cells will be:', gNumOfcells, 'and total mines', gMines);
//     creatingGame(gNumOfcells, gMines)
// }



// // //     if (gGameInterval) {
// // //         clearInterval(gGameInterval)
// // //         gGameInterval = null
// // //         elBtn.innerText = 'Start'
// // //     } else {
// // //         gGameInterval = setInterval(play, GAME_FREQ)
// // //         elBtn.innerText = 'Stop'
// // //     }
// // // }

// // function play() {
// //     gBoard = runGeneration(gBoard)
// //     renderBoard(gBoard)
// // }












