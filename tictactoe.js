let playerTurn = 2;
let player1Points = 0;
let player2Points = 0;

function square(row, column){
    this.squareValue = 0; //0 = empty, 1 = circle, 2 = square
    this.row = row;
    this.column = column;
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const linesArea = [Math.floor(canvas.height / 3), Math.floor(canvas.height / 3) * 2] //Its a square
const squareArea = [];

function createSquaresArray(squareArea){
    for(let y = 0; y < 3; y++)
    {
        let tempArray = [];

        for(let x = 0; x < 3; x++)
        {
            tempArray.push(new square(x, y));
        }

        squareArea.push(tempArray);
    }
}

createSquaresArray(squareArea)
clearCanvas();

function clearCanvas(){
    ctx.beginPath();
    ctx.rect(0, 0, 500, 500);
    ctx.fillStyle = "white";
    ctx.fill();

    drawLines(linesArea);
}

function drawLines(){
    for(const el of linesArea)
    {
        ctx.beginPath();
        ctx.moveTo(0, el);
        ctx.lineTo(500, el);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(el, 0);
        ctx.lineTo(el, 500);
        ctx.stroke();
    }
}

function getClick(canvas, event){
   const rect = canvas.getBoundingClientRect();
   const clickHeight = event.pageY - rect.y;
   const clickWidth = event.pageX - rect.x;
   
   const squareClickedRow = Math.floor(clickHeight / 166); 
   const squareClickedColumn = Math.floor(clickWidth / 166);


   checkSquare(squareClickedRow, squareClickedColumn)

}

function checkSquare(squareClickedRow, squareClickedColumn){
    if(squareArea[squareClickedColumn][squareClickedRow].squareValue == 0){

        if(playerTurn % 2)
        {
            squareArea[squareClickedColumn][squareClickedRow].squareValue = 2
            drawSquare(squareClickedColumn, squareClickedRow);     
        }
        else
        {
            squareArea[squareClickedColumn][squareClickedRow].squareValue = 1
            drawCircle(squareClickedColumn, squareClickedRow);
        }
    }
}

function drawCircle(squareClickedColumn, squareClickedRow){
    console.log("drawing..")
    const centerOfSquareHorizontal = (squareClickedColumn + 1) + 88 + (166 * squareClickedColumn);
    const centerOfSquareVertical = (squareClickedRow + 1) + 88 + (166 * squareClickedRow);

    ctx.beginPath();
    ctx.arc(centerOfSquareHorizontal, centerOfSquareVertical, 40, 0, 2 * Math.PI)
    ctx.stroke();
    
    playerTurn += 1;

    checkForWinner();
}

function drawSquare(squareClickedColumn, squareClickedRow){
    console.log("drawing..")
    const centerOfSquareHorizontal = (squareClickedColumn + 1) + 88 + (166 * squareClickedColumn);
    const centerOfSquareVertical = (squareClickedRow + 1) + 88 + (166 * squareClickedRow);

    ctx.beginPath();
    ctx.rect(centerOfSquareHorizontal - 42, centerOfSquareVertical - 42, 84, 84)
    ctx.stroke();
    
    playerTurn += 1;
    checkForWinner();
}

function checkForWinner(){
    let rectColumn = 0;
    let rectRow = 0;
    let circleColumn = 0;
    let circleRow = 0;
    for(let column = 0; column < 3; column++)
    {
        for(let row = 0; row < 3; row++)
        {

            if(squareArea[row][column].squareValue == 1)
            {
                circleRow += 1;
            }
            else if(squareArea[row][column].squareValue == 2)
            {
                rectRow += 1;
            }

            if(squareArea[column][row].squareValue == 1)
            {
                circleColumn += 1;
            }
            else if(squareArea[column][row].squareValue == 2)
            {
                rectColumn += 1;
            }

            if((squareArea[0][0].squareValue == 1 && squareArea[1][1].squareValue == 1 && squareArea[2][2].squareValue == 1) || 
               (squareArea[0][2].squareValue == 1 && squareArea[1][1].squareValue == 1 && squareArea[2][0].squareValue == 1)){
                circleColumn = 3;
            }
            if((squareArea[0][0].squareValue == 2 && squareArea[1][1].squareValue == 2 && squareArea[2][2].squareValue == 2) || 
               (squareArea[0][2].squareValue == 2 && squareArea[1][1].squareValue == 2 && squareArea[2][0].squareValue == 2)){
                rectColumn = 3;
            }
        }

        if(circleColumn == 3 || circleRow == 3)
        {
            clearSquareValue();
            clearCanvas();
            player1Points += 1;
            updatePlayerPointsValue();
        }

        if(rectColumn == 3 || rectRow == 3)
        {
            clearSquareValue();
            clearCanvas();
            player2Points += 1;
            updatePlayerPointsValue();
        }

        circleColumn = 0;
        circleRow = 0;
        rectColumn = 0;
        rectRow = 0;
    }
}

function updatePlayerPointsValue(){
    const playerOne = document.getElementById("Player1Points");
    const playerTwo = document.getElementById("Player2Points");
    
    playerOne.innerText = `${player1Points}`
    playerTwo.innerText = `${player2Points}`
}

function clearSquareValue(){
    for(squaresArray of squareArea)
    {
        for(singleSquare of squaresArray)
        {
            singleSquare.squareValue = 0;
        }
    }

    playerTurn = 2;
}

canvas.addEventListener("click", (event) => {getClick(canvas, event)}, false);
