import TetrisShape from './core/TetrisShape';
import ShapeData from './core/model/ShapeData';
import Block from './core/view/Block';
// Init stage
const stage = new createjs.Stage("demo");

const allShapes = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var randomShape = parseInt(Math.random()*allShapes.length);
var tetrisShape = new TetrisShape(allShapes[randomShape]);
var shapeColumn = 5;
var shapeRaw = -4;

const backgroundImg = new createjs.Bitmap(ShapeData.IMAGE_PATH + "background.png");
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

function moveShape()
{
    tetrisShape.x = shapeColumn * Block.BLOCK_SIZE;
    tetrisShape.y = shapeRaw * Block.BLOCK_SIZE;
    stage.update();
}

function populateField()
{
    fieldArray = [];
    var image;
    for (let i = 0; i < 14; i++)
    {
        fieldArray[i] = [];
        for (let j = 0; j < 22; j++)
        {
            fieldArray[i][j] = 0;
            image = backgroundImg.clone();
            image.x = i * Block.BLOCK_SIZE;
            image.y = j * Block.BLOCK_SIZE;
            backgroundCont.addChild(image);
        }
    }
}

function keyPressed(event)
{
    switch (event.keyCode)
    {
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

function handleTick(event)
{
    // time based animation
    tetrisShape.x += event.delta / 1000 * 30;

    //fps based animation
    //tetrisShape.x += 30;
    
    if (tetrisShape.x > stage.canvas.width)
        tetrisShape.x = 0;
}

