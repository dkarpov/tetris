'use strict';

var _TetrisShape = require('./core/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

var _Block = require('./core/view/Block');

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stage
var stage = new createjs.Stage("demo");

var allShapes = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var randomShape = parseInt(Math.random() * allShapes.length);
var tetrisShape = new _TetrisShape2.default(allShapes[randomShape]);
var shapeColumn = 5;
var shapeRaw = -4;

var backgroundImg = new createjs.Bitmap(_ShapeData2.default.IMAGE_PATH + "background.png");
var backgroundCont = new createjs.Container();
var fieldArray;

stage.addChild(backgroundCont);
stage.addChild(tetrisShape);
stage.update();

populateField();
moveShape();

document.onkeydown = keyPressed;

//console.log(tetrisShape.actualBlockPositions);
//console.log(tetrisShape.getBounds());

function moveShape() {
    tetrisShape.x = shapeColumn * _Block2.default.BLOCK_SIZE;
    tetrisShape.y = shapeRaw * _Block2.default.BLOCK_SIZE;
    stage.update();
}

function populateField() {
    fieldArray = [];
    var image;
    for (var i = 0; i < 14; i++) {
        fieldArray[i] = [];
        for (var j = 0; j < 22; j++) {
            fieldArray[i][j] = 0;
            image = backgroundImg.clone();
            image.x = i * _Block2.default.BLOCK_SIZE;
            image.y = j * _Block2.default.BLOCK_SIZE;
            backgroundCont.addChild(image);
        }
    }
}

function keyPressed(event) {
    switch (event.keyCode) {
        case 37:
            shapeColumn--;
            break;
        case 39:
            shapeColumn++;
            break;
        case 38:
            tetrisShape.rotate();
            break;
        case 40:
            shapeRaw++;
            break;
    }

    moveShape();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////TEST ZONE/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ticker experiments
//createjs.Ticker.setInterval(25);
createjs.Ticker.setFPS(30);

createjs.Ticker.addEventListener("tick", stage);
//createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    // time based animation
    tetrisShape.x += event.delta / 1000 * 30;

    //fps based animation
    //tetrisShape.x += 30;

    if (tetrisShape.x > stage.canvas.width) tetrisShape.x = 0;
}