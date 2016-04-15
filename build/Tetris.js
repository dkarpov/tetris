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
var ALL_SHAPES = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var BACKGROUND_IMG = new createjs.Bitmap(_ShapeData2.default.IMAGE_PATH + "background.png");
var FIELD_WIDTH = 14;
var FIELD_HEIGHT = 22;

var randomShape;
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

function removeShape() {
    console.log("Collision detected removeChild");

    var blockPoints = currentTetrisShape.shapeData.currentBlocks;
    var lockedBlockImage;

    for (var i = 0; i < blockPoints.length; i++) {
        for (var j = 0; j < blockPoints[i].length; j++) {
            if (blockPoints[i][j] == 1) {
                lockedBlockImage = currentTetrisShape.block0.clone();
                lockedBlockImage.x = (currentTetrisShape.column + j) * _Block2.default.BLOCK_SIZE;
                lockedBlockImage.y = (currentTetrisShape.row + i) * _Block2.default.BLOCK_SIZE;
                backgroundCont.addChild(lockedBlockImage);

                // fill field with non empty value
                fieldGridArr[currentTetrisShape.row + i][currentTetrisShape.column + j] = 1;
            }
        }
    }

    currentTetrisShape.removeEventListener(_TetrisShape2.default.COLLISION_DETECTED, shapeCollisionHandler);
    STAGE.removeChild(currentTetrisShape);
}
function createShape() {
    randomShape = parseInt(Math.random() * ALL_SHAPES.length);

    if (currentTetrisShape) {
        removeShape();
    }

    // setting up new shape
    currentTetrisShape = new _TetrisShape2.default(ALL_SHAPES[randomShape]);
    shapeCollisionHandler = shapeCollisionHandler.bind(createShape);
    currentTetrisShape.addEventListener(_TetrisShape2.default.COLLISION_DETECTED, shapeCollisionHandler);

    moveController.shape = currentTetrisShape;
    moveController.gameField = fieldGridArr;

    STAGE.addChild(currentTetrisShape);
    STAGE.update();
}

function shapeCollisionHandler(event) {
    this();
}

function drawField() {
    backgroundCont = new createjs.Container();
    // populate filed grid array
    fieldGridArr = [];
    var image;
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        fieldGridArr[i] = [];
        for (var j = 0; j < FIELD_WIDTH; j++) {
            fieldGridArr[i][j] = 0;
            image = BACKGROUND_IMG.clone();
            image.x = j * _Block2.default.BLOCK_SIZE;
            image.y = i * _Block2.default.BLOCK_SIZE;
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