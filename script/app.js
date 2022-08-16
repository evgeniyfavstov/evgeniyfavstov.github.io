var GAME = {
    width: 1600,
    height: 750,
    background: "#F5F0E1",
    score: 0,
}

const STEP = 150;
var activeNumber = 0;
var movesCount = 0;

var canvas = document.getElementById("canvas");
canvas.width = GAME.width;
canvas.height = GAME.height;
var canvasContext = canvas.getContext("2d");

canvasContext.fillStyle = "#F5F0E1";
canvasContext.fillRect(0 ,0 , GAME.width, GAME.height);
canvasContext.fillStyle = "#999999";
canvasContext.fillRect(600 ,0 , GAME.width, GAME.height);
0
canvasContext.fillStyle = "#FF0000";
canvasContext.fillRect(690, 470, 800, 40);
canvasContext.fillStyle = "#000000";
canvasContext.font = "32px Arial";
canvasContext.fillText("Mission: move donkey from top-center to bottom-center", 700, 50);
canvasContext.fillText("Use digit keys to choose plates", 700, 100);
canvasContext.fillText("Use arrow keys to move plates", 700, 150);
canvasContext.fillText("No mouse", 700, 200);
canvasContext.fillText("Try to win less than in 118 moves", 700, 250);
canvasContext.fillText("You lose if you done 120+ moves", 700, 300);
canvasContext.fillText("Moves done: " + movesCount, 700, 500);
canvasContext.fillStyle = "#F5F0E1";


var PLATE_0 = {
    color: "#550000",
    x: 0,
    y: 0,
    xStart: 0,
    yStart: 0,
    height: 0,
    width: 0,
    face: 0,
    line: 0,
    column: 0,
    path: "",
}

var PLATE_1 = {
    color: "#660000",
    x: 0,
    y: 0,
    xStart: 0,
    yStart: 0,
    height: 300,
    width: 150,
    face: 1,
    line: 1,
    column: 1,
    path: "images/PLATE_1.png",
}

var PLATE_2 = {
    color: "#007700",
    x: 150,
    y: 0,
    xStart: 150,
    yStart: 0,
    height: 300,
    width: 300,
    face: 2,
    line: 1,
    column: 2,
    path: "images/PLATE_2.png",
}

var PLATE_3 = {
    color: "#880000",
    x: 450,
    y: 0,
    xStart: 450,
    yStart: 0,
    height: 300,
    width: 150,
    face: 3,
    line: 1,
    column: 4,
    path: "images/PLATE_3.png",
}

var PLATE_4 = {
    color: "#990000",
    x: 0,
    y: 300,
    xStart: 0,
    yStart: 300,
    height: 300,
    width: 150,
    face: 4,
    line: 3,
    column: 1,
    path: "images/PLATE_4.png",
}

var PLATE_5 = {
    color: "#AA0000",
    x: 150,
    y: 300,
    xStart: 150,
    yStart: 300,
    height: 150,
    width: 300,
    face: 5,
    line: 3,
    column: 2,
    path: "images/PLATE_5.png",
}

var PLATE_6 = {
    color: "#BB0000",
    x: 450,
    y: 300,
    xStart: 450,
    yStart: 300,
    height: 300,
    width: 150,
    face: 6,
    line: 3,
    column: 4,
    path: "images/PLATE_6.png",
}

var PLATE_7 = {
    color: "#0000CC",
    x: 150,
    y: 450,
    xStart: 150,
    yStart: 450,
    height: 150,
    width: 150,
    face: 7,
    line: 4,
    column: 2,
    path: "images/PLATE_7.png",
}

var PLATE_8 = {
    color: "#00DD00",
    x: 300,
    y: 450,
    xStart: 300,
    yStart: 450,
    height: 150,
    width: 150,
    face: 8,
    line: 4,
    column: 3,
    path: "images/PLATE_8.png",
}

var PLATE_9 = {
    color: "#00CCEE",
    x: 0,
    y: 600,
    xStart: 0,
    yStart: 600,
    height: 150,
    width: 150,
    face: 9,
    line: 5,
    column: 1,
    path: "images/PLATE_9.png",
}

var PLATE_10 = {
    color: "#FF00DD",
    x: 450,
    y: 600,
    xStart: 450,
    yStart: 600,
    height: 150,
    width: 150,
    face: 10,
    line: 5,
    column: 4,
    path: "images/PLATE_10.png",
}

var plates = [
    PLATE_0,
    PLATE_1,
    PLATE_2,
    PLATE_3,
    PLATE_4,
    PLATE_5,
    PLATE_6,
    PLATE_7,
    PLATE_8,
    PLATE_9,
    PLATE_10,
]

var platesInBox = [
    [11, 11, 11, 11, 11, 11],
    [11,  1,  2,  2,  3, 11],
    [11,  1,  2,  2,  3, 11],
    [11,  4,  5,  5,  6, 11],
    [11,  4,  7,  8,  6, 11],
    [11,  9,  0,  0, 10, 11],
    [11, 11, 11, 11, 11, 11]
]
//console.log(platesInBox[4][2]); 
//     7              [line][column] counting from zero


// initial coordinates of empty squares
var empty_1 = {
    column: 2,
    line: 5,
}

var empty_2 = {
    column: 3,
    line: 5,
}

var textures = [
    document.getElementById('image0'),
    document.getElementById('image1'),
    document.getElementById('image2'),
    document.getElementById('image3'),
    document.getElementById('image4'),
    document.getElementById('image5'),
    document.getElementById('image6'),
    document.getElementById('image7'),
    document.getElementById('image8'),
    document.getElementById('image9'),
    document.getElementById('image10'),
]


function startGame() {
    PLATE_1.x = PLATE_1.xStart;
    PLATE_1.y = PLATE_1.yStart;
    //canvasContext.fillStyle = PLATE_1.color;
    canvasContext.drawImage(textures[1], PLATE_1.x, PLATE_1.y, PLATE_1.width, PLATE_1.height);
    
    PLATE_2.x = PLATE_2.xStart;
    PLATE_2.y = PLATE_2.yStart;
    //canvasContext.fillStyle = PLATE_2.color;
    canvasContext.drawImage(textures[2], PLATE_2.x, PLATE_2.y, PLATE_2.width, PLATE_2.height);
    
    PLATE_3.x = PLATE_3.xStart;
    PLATE_3.y = PLATE_3.yStart;
    //canvasContext.fillStyle = PLATE_3.color;
    canvasContext.drawImage(textures[3], PLATE_3.x, PLATE_3.y, PLATE_3.width, PLATE_3.height);

    PLATE_4.x = PLATE_4.xStart;
    PLATE_4.y = PLATE_4.yStart;
    //canvasContext.fillStyle = PLATE_4.color;
    canvasContext.drawImage(textures[4], PLATE_4.x, PLATE_4.y, PLATE_4.width, PLATE_4.height);

    PLATE_5.x = PLATE_5.xStart;
    PLATE_5.y = PLATE_5.yStart;
    //canvasContext.fillStyle = PLATE_5.color;
    canvasContext.drawImage(textures[5], PLATE_5.x, PLATE_5.y, PLATE_5.width, PLATE_5.height);

    PLATE_6.x = PLATE_6.xStart;
    PLATE_6.y = PLATE_6.yStart;
    //canvasContext.fillStyle = PLATE_6.color;
    canvasContext.drawImage(textures[6], PLATE_6.x, PLATE_6.y, PLATE_6.width, PLATE_6.height);

    PLATE_7.x = PLATE_7.xStart;
    PLATE_7.y = PLATE_7.yStart;
    //canvasContext.fillStyle = PLATE_7.color;
    canvasContext.drawImage(textures[7], PLATE_7.x, PLATE_7.y, PLATE_7.width, PLATE_7.height);

    PLATE_8.x = PLATE_8.xStart;
    PLATE_8.y = PLATE_8.yStart;
    //canvasContext.fillStyle = PLATE_8.color;
    canvasContext.drawImage(textures[8], PLATE_8.x, PLATE_8.y, PLATE_8.width, PLATE_8.height);

    PLATE_9.x = PLATE_9.xStart;
    PLATE_9.y = PLATE_9.yStart;
    //canvasContext.fillStyle = PLATE_9.color;
    canvasContext.drawImage(textures[9], PLATE_9.x, PLATE_9.y, PLATE_9.width, PLATE_9.height);

    PLATE_10.x = PLATE_10.xStart;
    PLATE_10.y = PLATE_10.yStart;
    //canvasContext.fillStyle = PLATE_10.color;
    canvasContext.drawImage(textures[10], PLATE_10.x, PLATE_10.y, PLATE_10.width, PLATE_10.height);
    
    initEventsListeners();
}

function initEventsListeners() {
    window.addEventListener("keydown", onCanvasKeyDown);
}

function moveRight(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            //count
            platesInBox[empty_1.line][empty_1.column - 1] = platesInBox[empty_1.line][empty_1.column - 1] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column - 1] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column - 1] = platesInBox[empty_1.line][empty_1.column - 1] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column -= 1;
            platesInBox[empty_2.line][empty_2.column - 1] = platesInBox[empty_2.line][empty_2.column - 1] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column - 1] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column - 1] = platesInBox[empty_2.line][empty_2.column - 1] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column -= 1;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber] ,plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            //count
            platesInBox[empty_1.line][empty_1.column - 2] = platesInBox[empty_1.line][empty_1.column - 2] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column - 2] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column - 2] = platesInBox[empty_1.line][empty_1.column - 2] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column -= 2;
            platesInBox[empty_2.line][empty_2.column - 2] = platesInBox[empty_2.line][empty_2.column - 2] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column - 2] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column - 2] = platesInBox[empty_2.line][empty_2.column - 2] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column -= 2;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber] ,plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (horizontalPlate) {
        if (platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) {
            //count
            platesInBox[empty_1.line][empty_1.column - 2] = platesInBox[empty_1.line][empty_1.column - 2] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column - 2] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column - 2] = platesInBox[empty_1.line][empty_1.column - 2] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column -= 2;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber] ,plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber) {
            //count
            platesInBox[empty_2.line][empty_2.column - 2] = platesInBox[empty_2.line][empty_2.column - 2] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column - 2] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column - 2] = platesInBox[empty_2.line][empty_2.column - 2] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column -= 2;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber] ,plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (smallPlate) {
        if (platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) {
            //count
            platesInBox[empty_1.line][empty_1.column - 1] = platesInBox[empty_1.line][empty_1.column - 1] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column - 1] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column - 1] = platesInBox[empty_1.line][empty_1.column - 1] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column -= 1;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber) {
            //count
            platesInBox[empty_2.line][empty_2.column - 1] = platesInBox[empty_2.line][empty_2.column - 1] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column - 1] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column - 1] = platesInBox[empty_2.line][empty_2.column - 1] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column -= 1;
            //draw
            plates[activeNumber].x += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x - STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber] ,plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    
}

function moveLeft(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            //count
            platesInBox[empty_1.line][empty_1.column + 1] = platesInBox[empty_1.line][empty_1.column + 1] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column + 1] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column + 1] = platesInBox[empty_1.line][empty_1.column + 1] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column += 1;
            platesInBox[empty_2.line][empty_2.column + 1] = platesInBox[empty_2.line][empty_2.column + 1] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column + 1] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column + 1] = platesInBox[empty_2.line][empty_2.column + 1] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column += 1;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            //count
            platesInBox[empty_1.line][empty_1.column + 2] = platesInBox[empty_1.line][empty_1.column + 2] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column + 2] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column + 2] = platesInBox[empty_1.line][empty_1.column + 2] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column += 2;
            platesInBox[empty_2.line][empty_2.column + 2] = platesInBox[empty_2.line][empty_2.column + 2] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column + 2] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column + 2] = platesInBox[empty_2.line][empty_2.column + 2] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column += 2;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (horizontalPlate) {
        if (platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) {
            //count
            platesInBox[empty_1.line][empty_1.column + 2] = platesInBox[empty_1.line][empty_1.column + 2] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column + 2] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column + 2] = platesInBox[empty_1.line][empty_1.column + 2] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column += 2;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber) {
            //count
            platesInBox[empty_2.line][empty_2.column + 2] = platesInBox[empty_2.line][empty_2.column + 2] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column + 2] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column + 2] = platesInBox[empty_2.line][empty_2.column + 2] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column += 2;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (smallPlate) {
        if (platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) {
            //count
            platesInBox[empty_1.line][empty_1.column + 1] = platesInBox[empty_1.line][empty_1.column + 1] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line][empty_1.column + 1] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column + 1] = platesInBox[empty_1.line][empty_1.column + 1] - platesInBox[empty_1.line][empty_1.column];
            empty_1.column += 1;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber) {
            //count
            platesInBox[empty_2.line][empty_2.column + 1] = platesInBox[empty_2.line][empty_2.column + 1] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line][empty_2.column + 1] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column + 1] = platesInBox[empty_2.line][empty_2.column + 1] - platesInBox[empty_2.line][empty_2.column];
            empty_2.column += 1;
            //draw
            plates[activeNumber].x -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x + STEP, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    
}

function moveUp(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if (platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) {
            //count
            platesInBox[empty_1.line + 2][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line + 2][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line += 2;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber) {
            //count
            platesInBox[empty_2.line + 2][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line + 2][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line += 2;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            //count
            platesInBox[empty_1.line + 2][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line + 2][empty_1.column] = platesInBox[empty_1.line + 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line += 2;
            platesInBox[empty_2.line + 2][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line + 2][empty_2.column] = platesInBox[empty_2.line + 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line += 2;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            //count
            platesInBox[empty_1.line + 1][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line + 1][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line += 1;
            platesInBox[empty_2.line + 1][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line + 1][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line += 1;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (smallPlate) {
        if (platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) {
            //count
            platesInBox[empty_1.line + 1][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line + 1][empty_1.column] = platesInBox[empty_1.line + 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line += 1;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber) {
            //count
            platesInBox[empty_2.line + 1][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line + 1][empty_2.column] = platesInBox[empty_2.line + 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line += 1;
            //draw
            plates[activeNumber].y -= STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y + STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
}

function moveDown(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if (platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) {
            //count
            platesInBox[empty_1.line - 2][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line - 2][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line -= 2;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber) {
            //count
            platesInBox[empty_2.line - 2][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line - 2][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line -= 2;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            //count
            platesInBox[empty_1.line - 2][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line - 2][empty_1.column] = platesInBox[empty_1.line - 2][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line -= 2;
            platesInBox[empty_2.line - 2][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line - 2][empty_2.column] = platesInBox[empty_2.line - 2][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line -= 2;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            //count
            platesInBox[empty_1.line - 1][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line - 1][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line -= 1;
            platesInBox[empty_2.line - 1][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line - 1][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line -= 1;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
    if (smallPlate) {
        if (platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) {
            //count
            platesInBox[empty_1.line - 1][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] + platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            platesInBox[empty_1.line - 1][empty_1.column] = platesInBox[empty_1.line - 1][empty_1.column] - platesInBox[empty_1.line][empty_1.column];
            empty_1.line -= 1;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
        else if (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber) {
            //count
            platesInBox[empty_2.line - 1][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] + platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            platesInBox[empty_2.line - 1][empty_2.column] = platesInBox[empty_2.line - 1][empty_2.column] - platesInBox[empty_2.line][empty_2.column];
            empty_2.line -= 1;
            //draw
            plates[activeNumber].y += STEP;
            canvasContext.fillStyle = GAME.background;
            canvasContext.fillRect(plates[activeNumber].x, plates[activeNumber].y - STEP, plates[activeNumber].width, plates[activeNumber].height);
            //canvasContext.fillStyle = plates[activeNumber].color;
            canvasContext.drawImage(textures[activeNumber], plates[activeNumber].x, plates[activeNumber].y, plates[activeNumber].width, plates[activeNumber].height);
        }
    }
}

function onCanvasKeyDown(event) {
    if (event.key === "1") {
        activeNumber = 1;
    }
    if (event.key === "2") {
        activeNumber = 2;
    }
    if (event.key === "3") {
        activeNumber = 3;
    }
    if (event.key === "4") {
        activeNumber = 4;
    }
    if (event.key === "5") {
        activeNumber = 5;
    }
    if (event.key === "6") {
        activeNumber = 6;
    }
    if (event.key === "7") {
        activeNumber = 7;
    }
    if (event.key === "8") {
        activeNumber = 8;
    }
    if (event.key === "9") {
        activeNumber = 9;
    }
    if (event.key === "0") {
        activeNumber = 10;
    }
    if (event.key === "ArrowLeft") {
        if (isMoveLeftCorrect(activeNumber)) {
            moveLeft(activeNumber);
            movesCount += 1;
            canvasContext.fillStyle = "#FF0000";
            canvasContext.fillRect(690, 470, 800, 40);
            canvasContext.fillStyle = "#000000";
            canvasContext.font = "32px Arial";
            canvasContext.fillText("Moves done: " + movesCount, 700, 500);
            canvasContext.fillStyle = "#F5F0E1";
        }
    }
    if (event.key === "ArrowRight") {
        if (isMoveRightCorrect(activeNumber)) {
            moveRight(activeNumber);
            movesCount += 1;
            canvasContext.fillStyle = "#FF0000";
            canvasContext.fillRect(690, 470, 800, 40);
            canvasContext.fillStyle = "#000000";
            canvasContext.font = "32px Arial";
            canvasContext.fillText("Moves done: " + movesCount, 700, 500);
            canvasContext.fillStyle = "#F5F0E1";
        }
    }
    if (event.key === "ArrowUp") {
        if (isMoveUpCorrect(activeNumber)) {
            moveUp(activeNumber);
            movesCount += 1;
            canvasContext.fillStyle = "#FF0000";
            canvasContext.fillRect(690, 470, 800, 40);
            canvasContext.fillStyle = "#000000";
            canvasContext.font = "32px Arial";
            canvasContext.fillText("Moves done: " + movesCount, 700, 500);
            canvasContext.fillStyle = "#F5F0E1";
        }
    }
    if (event.key === "ArrowDown") {
        if (isMoveDownCorrect(activeNumber)) {
            moveDown(activeNumber);
            movesCount += 1;
            canvasContext.fillStyle = "#FF0000";
            canvasContext.fillRect(690, 470, 800, 40);
            canvasContext.fillStyle = "#000000";
            canvasContext.font = "32px Arial";
            canvasContext.fillText("Moves done: " + movesCount, 700, 500);
            canvasContext.fillStyle = "#F5F0E1";
        }
    }
    if ((platesInBox[5][2] === 2) && (platesInBox[5][3] === 2)) {
        drawWinScreen();
    }
    if (movesCount >=120) {
        drawLoseScreen();
    }

    console.log(platesInBox[5][1], platesInBox[5][2], platesInBox[5][3], platesInBox[5][4]);
}

function isMoveLeftCorrect(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            return true;
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) || (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            return true;
        }
    }
    if (smallPlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) || (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            return true;
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line][empty_1.column + 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column + 1] === activeNumber)) {
            return true;
        }
    }
}

function isMoveRightCorrect(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            return true;
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) || (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            return true;
        }
    }
    if (smallPlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) || (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            return true;
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line][empty_1.column - 1] === activeNumber) && (platesInBox[empty_2.line][empty_2.column - 1] === activeNumber)) {
            return true;
        }
    }
}

function isMoveUpCorrect(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) || (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (smallPlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) || (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line + 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line + 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
}

function isMoveDownCorrect(activeNumber) {
    var verticalPlate = (activeNumber === 1) || (activeNumber === 3) || (activeNumber === 4) || (activeNumber === 6);
    var horizontalPlate = (activeNumber === 5) && (true);
    var smallPlate = (activeNumber === 7) || (activeNumber === 8) || (activeNumber === 9) || (activeNumber === 10);
    var largePlate = (activeNumber === 2) && (true);
    if (verticalPlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) || (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (horizontalPlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (smallPlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) || (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
    if (largePlate) {
        if ((platesInBox[empty_1.line - 1][empty_1.column] === activeNumber) && (platesInBox[empty_2.line - 1][empty_2.column] === activeNumber)) {
            return true;
        }
    }
}

function drawWinScreen() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.fillStyle = "#00FF00";
    canvasContext.font = "48px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("VICTORY IN " + movesCount + " MOVES", GAME.width / 2, GAME.height / 2);
}

function drawLoseScreen() {
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    canvasContext.fillStyle = "#FF0000";
    canvasContext.font = "48px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText("TOO MUCH MOVES", GAME.width / 2, GAME.height / 2);
}

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

startGame();