let playerTurn = 2;

function square(row, column){
    this.squareValue = 0; //0 = empty, 1 = square, 2 = circle
    this.row = row;
    this.column = column;
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const linesArea = [Math.floor(canvas.height / 3), Math.floor(canvas.height / 3) * 2] //Its a square
const squareArea = [];

function createSquaresArray(squareArea){
    for(let y = 0; y < 3; y++){
        let tempArray = [];
        for(let x = 0; x < 3; x++){
            tempArray.push(new square(x, y));
        }
        squareArea.push(tempArray);
    }
}

createSquaresArray(squareArea)
console.log(squareArea)

function drawLines(linesArea){
    for(const el of linesArea){
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

drawLines(linesArea);

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
        if(playerTurn % 2){
            squareArea[squareClickedColumn][squareClickedRow].squareValue == 2
            drawSquare(squareClickedColumn, squareClickedRow);
        }else{
            squareArea[squareClickedColumn][squareClickedRow].squareValue == 1
            drawCircle(squareClickedColumn, squareClickedRow);
        }
    }
}

function drawCircle(squareClickedColumn, squareClickedRow){
    const centerOfSquareHorizontal = (squareClickedColumn + 1) + 88 + (166 * squareClickedColumn);
    const centerOfSquareVertical = (squareClickedRow + 1) + 88 + (166 * squareClickedRow);

    console.log("Drawing...")
    ctx.beginPath();
    ctx.arc(centerOfSquareHorizontal, centerOfSquareVertical, 40, 0, 2 * Math.PI)
    ctx.stroke();
}

function drawSquare(squareClickedColumn, squareClickedRow){

}

canvas.addEventListener("click", (event) => {getClick(canvas, event)}, false);