'use strict';

var _TetrisShape = require('./core/view/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

var _Block = require('./core/view/Block');

var _Block2 = _interopRequireDefault(_Block);

var _MovementController = require('./core/MovementController');

var _MovementController2 = _interopRequireDefault(_MovementController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stage
var STAGE = new createjs.Stage("demo");
var ALL_SHAPES = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var BACKGROUND_IMG = new createjs.Bitmap(_ShapeData2.default.IMAGE_PATH + "background.png");
var FIELD_WIDTH = 14;
var FIELD_HEIGHT = 22;

var speed = 1;
var speedGear = 2;

var randomShape;
var moveController = new _MovementController2.default();
var currentTetrisShape;
var backgroundCont;
var lockedBlocksCont;
var fieldGridArr;
var fieldGridLockedBlocks;

//update stage on tick
createjs.Ticker.addEventListener("tick", STAGE);
createjs.Ticker.setFPS(60);

initField();

function initField() {
    //drawDemoField();

    drawField();
    createShape();
    moveShape();

    //TODO(dkarpov) play/pause functionality
    createjs.Ticker.addEventListener("tick", tickMoveHandler);
    document.onkeydown = keyPressed;
}

function resetGame() {
    currentTetrisShape = null;
    createjs.Ticker.removeEventListener("tick", tickMoveHandler);
    document.onkeydown = null;

    while (lockedBlocksCont.numChildren) {
        lockedBlocksCont.removeChildAt(0);
    }while (backgroundCont.numChildren) {
        backgroundCont.removeChildAt(0);
    }
}

function createShape() {
    randomShape = parseInt(Math.random() * ALL_SHAPES.length);

    if (currentTetrisShape) {
        removeShape();
        resetFilledLines();
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

function removeShape() {
    var blockPoints = currentTetrisShape.shapeData.currentBlocks;
    var lockedBlockImage;

    for (var i = 0; i < blockPoints.length; i++) {
        //add blocks, remove shape
        for (var j = 0; j < blockPoints[i].length; j++) {
            if (blockPoints[i][j] == 1) {
                lockedBlockImage = currentTetrisShape.block0.clone();
                lockedBlockImage.x = (currentTetrisShape.column + j) * _Block2.default.BLOCK_SIZE;
                lockedBlockImage.y = (currentTetrisShape.row + i) * _Block2.default.BLOCK_SIZE;
                lockedBlocksCont.addChild(lockedBlockImage);

                // fill field with non empty value
                if (fieldGridArr[currentTetrisShape.row + i] != undefined) {
                    fieldGridArr[currentTetrisShape.row + i][currentTetrisShape.column + j] = 1;
                    fieldGridLockedBlocks[currentTetrisShape.row + i][currentTetrisShape.column + j] = lockedBlockImage;

                    // check for game over :)
                    if (0 >= currentTetrisShape.row && fieldGridArr[0].indexOf(1) > -1) {
                        resetGame();
                        initField();
                    }
                }
            }
        }
    }

    currentTetrisShape.removeEventListener(_TetrisShape2.default.COLLISION_DETECTED, shapeCollisionHandler);
    STAGE.removeChild(currentTetrisShape);
}

function resetFilledLines() {
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        if (fieldGridArr[i].indexOf(0) == -1) {
            for (var j = 0; j < FIELD_WIDTH; j++) {
                fieldGridArr[i][j] = 0;
                lockedBlocksCont.removeChild(fieldGridLockedBlocks[i][j]);
                fieldGridLockedBlocks[i][j] = 0;
            }

            for (var k = i; k >= 0; k--) {
                for (var l = 0; l < FIELD_WIDTH; l++) {
                    // move all blocks down in case if they were filled
                    if (fieldGridArr[k][l] == 1) {
                        fieldGridArr[k][l] = 0;
                        fieldGridArr[k + 1][l] = 1;

                        fieldGridLockedBlocks[k + 1][l] = fieldGridLockedBlocks[k][l];
                        fieldGridLockedBlocks[k][l] = 0;
                        fieldGridLockedBlocks[k + 1][l].y = (k + 1) * _Block2.default.BLOCK_SIZE;
                    }
                }
            }
        }
    }
}

function drawField() {
    backgroundCont = new createjs.Container();
    lockedBlocksCont = new createjs.Container();
    // populate filed grid array
    fieldGridArr = [];
    fieldGridLockedBlocks = [];

    var image;
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        fieldGridArr[i] = [];
        fieldGridLockedBlocks[i] = [];
        for (var j = 0; j < FIELD_WIDTH; j++) {
            fieldGridArr[i][j] = fieldGridLockedBlocks[i][j] = 0;
            image = BACKGROUND_IMG.clone();
            image.x = j * _Block2.default.BLOCK_SIZE;
            image.y = i * _Block2.default.BLOCK_SIZE;
            backgroundCont.addChild(image);
        }
    }

    STAGE.addChild(backgroundCont);
    STAGE.addChild(lockedBlocksCont);
    STAGE.update();
}

function moveShape(value) {
    moveController.tryMoveShape(value);
    STAGE.update();
}

function shapeCollisionHandler(event) {
    this();
}

function tickMoveHandler(event) {
    if (event.delta / 1000 * speed > 1) {
        speed = speedGear;
        moveShape(_MovementController2.default.DOWN);
    } else {
        speed += speedGear;
    }
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////TEST ZONE/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//console.log(currentTetrisShape.actualBlockPositions);
//console.log(currentTetrisShape.getBounds());

// Ticker experiments
//createjs.Ticker.setInterval(25);

function drawDemoField() {
    fieldGridLockedBlocks = [];
    fieldGridArr = [];
    backgroundCont = new createjs.Container();
    lockedBlocksCont = new createjs.Container();

    // populate filed grid array
    fieldGridArr = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]];

    var image;
    var lockedBlockImage;
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        fieldGridLockedBlocks[i] = [];
        for (var j = 0; j < FIELD_WIDTH; j++) {
            image = BACKGROUND_IMG.clone();
            image.x = j * _Block2.default.BLOCK_SIZE;
            image.y = i * _Block2.default.BLOCK_SIZE;
            backgroundCont.addChild(image);

            if (fieldGridArr[i][j] > 0) {
                lockedBlockImage = new createjs.Bitmap("./images/block_orange.png");
                lockedBlockImage.x = j * _Block2.default.BLOCK_SIZE;
                lockedBlockImage.y = i * _Block2.default.BLOCK_SIZE;
                lockedBlocksCont.addChild(lockedBlockImage);

                fieldGridLockedBlocks[i][j] = lockedBlockImage;
            } else {
                fieldGridLockedBlocks[i][j] = 0;
            }
        }
    }

    STAGE.addChild(backgroundCont);
    STAGE.addChild(lockedBlocksCont);
    STAGE.update();
}

function handleTick(event) {
    //createjs.Ticker.setPaused(true);
    // time based animation
    currentTetrisShape.x += event.delta / 1000 * 30;

    //fps based animation
    //currentTetrisShape.x += 30;

    if (currentTetrisShape.x > STAGE.canvas.width) currentTetrisShape.x = 0;
}