import TetrisShape from './core/TetrisShape';
import ShapeData from './core/model/ShapeData';
// Init stage
const stage = new createjs.Stage("demo");

var tetrisShape = new TetrisShape(ShapeData.J);
tetrisShape.x = 50;
tetrisShape.y = 50;

stage.addChild(tetrisShape);
stage.update();

console.log(tetrisShape.actualBlockPositions);
console.log(tetrisShape.getBounds());

/*console.log(tetrisShape.width);
console.log(tetrisShape.height);*/

// Ticker
createjs.Ticker.addEventListener("tick", stage);
