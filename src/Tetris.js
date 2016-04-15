import TetrisShape from './core/TetrisShape';
import ShapeData from './core/model/ShapeData';
import Block from './core/view/Block';
import MovementController from './core/MovementController.js';
// Init stage
const STAGE = new createjs.Stage("demo");
const ALL_SHAPES = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
const BACKGROUND_IMG = new createjs.Bitmap(ShapeData.IMAGE_PATH + "background.png");
const FIELD_WIDTH = 14;
const FIELD_HEIGHT = 22;

var randomShape;
var moveController = new MovementController();
var currentTetrisShape;
var backgroundCont;
var fieldGridArr;

document.onkeydown = keyPressed;

initField();

function initField()
{
    drawField();
    createShape();
    moveShape();
}

function removeShape()
{
    console.log("Collision detected removeChild");

    var blockPoints = currentTetrisShape.shapeData.currentBlocks;
    var lockedBlockImage;

    for (let i = 0; i < blockPoints.length; i++)
    {
        for (let j = 0; j < blockPoints[i].length; j++)
        {
            if (blockPoints[i][j] == 1)
            {
                lockedBlockImage = currentTetrisShape.block0.clone();
                lockedBlockImage.x = (currentTetrisShape.column + j) * Block.BLOCK_SIZE;
                lockedBlockImage.y = (currentTetrisShape.row + i) * Block.BLOCK_SIZE;
                backgroundCont.addChild(lockedBlockImage);

                // fill field with non empty value
                fieldGridArr[currentTetrisShape.row + i][currentTetrisShape.column + j] = 1
            }
        }
    }

    currentTetrisShape.removeEventListener(TetrisShape.COLLISION_DETECTED, shapeCollisionHandler);
    STAGE.removeChild(currentTetrisShape);
}
function createShape()
{
    randomShape = parseInt(Math.random()*ALL_SHAPES.length);

    if (currentTetrisShape)
    {
        removeShape()
    }

    // setting up new shape
    currentTetrisShape = new TetrisShape(ALL_SHAPES[randomShape]);
    shapeCollisionHandler = shapeCollisionHandler.bind(createShape);
    currentTetrisShape.addEventListener(TetrisShape.COLLISION_DETECTED, shapeCollisionHandler);

    moveController.shape = currentTetrisShape;
    moveController.gameField = fieldGridArr;

    STAGE.addChild(currentTetrisShape);
    STAGE.update();
}

function shapeCollisionHandler(event)
{
    this();
}

function drawField()
{
    backgroundCont = new createjs.Container();
    // populate filed grid array
    fieldGridArr = [];
    var image;
    for (let i = 0; i < FIELD_HEIGHT; i++)
    {
        fieldGridArr[i] = [];
        for (let j = 0; j < FIELD_WIDTH; j++)
        {
            fieldGridArr[i][j] = 0;
            image = BACKGROUND_IMG.clone();
            image.x = j * Block.BLOCK_SIZE;
            image.y = i * Block.BLOCK_SIZE;
            backgroundCont.addChild(image);
        }
    }

    STAGE.addChild(backgroundCont);
    STAGE.update();
}

function moveShape(value)
{
    moveController.tryMoveShape(value);
    STAGE.update();
}

function keyPressed(event)
{
    switch (event.keyCode)
    {
        case 37:
            moveShape(MovementController.LEFT);
            break;
        case 39:
            moveShape(MovementController.RIGHT);
            break;
        case 38:
            moveShape(MovementController.ROTATE);
            break;
        case 40:
            moveShape(MovementController.DOWN);
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

function handleTick(event)
{
    // time based animation
    currentTetrisShape.x += event.delta / 1000 * 30;

    //fps based animation
    //currentTetrisShape.x += 30;
    
    if (currentTetrisShape.x > STAGE.canvas.width)
        currentTetrisShape.x = 0;
}