'use strict';

var _TetrisShape = require('./core/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init stage
var stage = new createjs.Stage("demo");

var tetrisShape = new _TetrisShape2.default(_ShapeData2.default.J);
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