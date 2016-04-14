'use strict';

var _TetrisShape = require('./core/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

var _Block = require('./core/view/Block');

var _Block2 = _interopRequireDefault(_Block);

var _MovementController = require('./core/MovementController.js');

var _MovementController2 = _interopRequireDefault(_MovementController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stage
var STAGE = new createjs.Stage("demo");
var LEFT = "LEFT";
var RIGHT = "RIGHT";
var DOWN = "DOWN";
var ALL_SHAPES = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var BACKGROUND_IMG = new createjs.Bitmap(_ShapeData2.default.IMAGE_PATH + "background.png");
var FIELD_WIDTH = 14;
var FIELD_HEIGHT = 22;
var defaultShapeColumn = 5;
var defaultShapeRaw = -4;

var randomShape = parseInt(Math.random() * ALL_SHAPES.length);
var moveController = new _MovementController2.default();
var currentTetrisShape;
var backgroundCont;
var fieldGridArr;

document.onkeydown = keyPressed;

initField();

function initField() {
    drawField();
    createShape();
    moveShape();
}

function createShape() {
    currentTetrisShape = new _TetrisShape2.default(ALL_SHAPES[randomShape]);
    currentTetrisShape.row = defaultShapeRaw;
    currentTetrisShape.column = defaultShapeColumn;

    moveController.shape = currentTetrisShape;
    moveController.gameField = fieldGridArr;

    STAGE.addChild(currentTetrisShape);
    STAGE.update();
}

function drawField() {
    backgroundCont = new createjs.Container();
    // populate filed grid array
    fieldGridArr = [];
    var image;
    for (var i = 0; i < FIELD_WIDTH; i++) {
        fieldGridArr[i] = [];
        for (var j = 0; j < FIELD_HEIGHT; j++) {
            fieldGridArr[i][j] = 0;
            image = BACKGROUND_IMG.clone();
            image.x = i * _Block2.default.BLOCK_SIZE;
            image.y = j * _Block2.default.BLOCK_SIZE;
            backgroundCont.addChild(image);
        }
    }

    STAGE.addChild(backgroundCont);
    STAGE.update();
}

function moveShape(value) {
    moveController.tryMoveShape(value);
    STAGE.update();
}

function keyPressed(event) {
    switch (event.keyCode) {
        case 37:
            moveShape(_MovementController2.default.LEFT);
            break;
        case 39:
            moveShape(_MovementController2.default.RIGHT);
            break;
        case 38:
            moveShape(_MovementController2.default.ROTATE);
            break;
        case 40:
            moveShape(_MovementController2.default.DOWN);
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////TEST ZONE/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//console.log(currentTetrisShape.actualBlockPositions);
//console.log(currentTetrisShape.getBounds());

// Ticker experiments
//createjs.Ticker.setInterval(25);
createjs.Ticker.setFPS(30);

createjs.Ticker.addEventListener("tick", STAGE);
//createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    // time based animation
    currentTetrisShape.x += event.delta / 1000 * 30;

    //fps based animation
    //currentTetrisShape.x += 30;

    if (currentTetrisShape.x > STAGE.canvas.width) currentTetrisShape.x = 0;
}