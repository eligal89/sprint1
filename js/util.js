function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellIdx = board[i][j].id
            //console.log(cellIdx);
            var cell = 'x'
           // console.log(board[i][j].type);
            var cellType = board[i][j].type
            var minesCount = countMinesNeighbors(i, j, board)
            //var currCell = board[i][j]
            strHTML += `<td id=${i},${j} class="${cellType}" cell-value="${minesCount}" data-i="${i}" date-j="${j}"
            oncontextmenu="cellMarked(this,${i},${j})"
             id"${minesCount}" 
                onclick="onCellClicked(this, event, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board')
    console.log(elBoard);
    elBoard.innerHTML = strHTML
}


//for now (!!!) this function will take each cell (including mines) and check how many mines there are surrounding it
function countMinesNeighbors(cellI, cellJ, board) {
   // console.log('im in');
   // console.log(cellI, cellJ, board);
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].type === 'mine') minesCount++
        }
    }
   // console.log(minesCount);
    return minesCount
}