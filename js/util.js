function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            //var cellIdx = board[i][j].id
            var cell = ''
            var cellType = board[i][j].type
            var minesCount = countMinesNeighbors(i, j, board)
            
            strHTML += `<td id=${i},${j} class="${cellType}" cell-value="${minesCount}" data-i="${i}" date-j="${j}"
            oncontextmenu="flagCell(this,${i},${j})" 
                onclick="onCellClicked(this, event, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

//for now (!!!) this function will take each cell (including mines) and check how many mines there are surrounding it
function countMinesNeighbors(cellI, cellJ, board) {
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].type === 'mine') minesCount++
        }
    }
    return minesCount
}
