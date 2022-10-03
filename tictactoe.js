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
   console.log(squareClickedRow, squareClickedColumn);
   
}

function drawCircle(){

}

function drawSquare(){

}

canvas.addEventListener("click", (event) => {getClick(canvas, event)}, false);