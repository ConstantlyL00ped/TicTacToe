function Player(name){
    this.live = 3;
    this.name = name;

    this.drawScores = function(){
        //Update scores
    }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function drawLines(){
    const linesAreasHeight = [Math.floor(canvas.height / 3), Math.floor(canvas.height / 3) * 2] //Its a square
    for(const el of linesAreasHeight){
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

drawLines();

function getClick(){
    
}