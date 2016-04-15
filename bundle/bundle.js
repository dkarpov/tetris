(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _TetrisShape = require('./core/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

var _Block = require('./core/view/Block');

var _Block2 = _interopRequireDefault(_Block);

var _MovementController = require('./core/MovementController.js');

var _MovementController2 = _interopRequireDefault(_MovementController);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

},{"./core/MovementController.js":2,"./core/TetrisShape":3,"./core/model/ShapeData":4,"./core/view/Block":5}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MovementController = function (_createjs$EventDispat) {
    _inherits(MovementController, _createjs$EventDispat);

    _createClass(MovementController, null, [{
        key: "LEFT",
        get: function get() {
            return "LEFT";
        }
    }, {
        key: "RIGHT",
        get: function get() {
            return "RIGHT";
        }
    }, {
        key: "DOWN",
        get: function get() {
            return "DOWN";
        }
    }, {
        key: "ROTATE",
        get: function get() {
            return "ROTATE";
        }
    }]);

    function MovementController() {
        _classCallCheck(this, MovementController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MovementController).call(this));

        _this.gameField;
        _this.shape;
        return _this;
    }

    _createClass(MovementController, [{
        key: "tryMoveShape",
        value: function tryMoveShape(direction) {
            if (direction == MovementController.LEFT && this.canMove(this.shape.row, this.shape.column - 1)) {
                this.shape.column--;
            } else if (direction == MovementController.RIGHT && this.canMove(this.shape.row, this.shape.column + 1)) {
                this.shape.column++;
            } else if (direction == MovementController.DOWN && this.canMove(this.shape.row + 1, this.shape.column)) {
                this.shape.row++;
            } else if (direction == MovementController.ROTATE && this.canMove(this.shape.row, this.shape.column, this.shapeData.rotationValue + 1)) {
                this.shape.rotate();
            }

            this.shape.moveShape();
        }
    }, {
        key: "canMove",
        value: function canMove(row, column) {
            var rotation = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            var blockPoints = rotation ? this.shape.shapeData.getBlocksForRotaion(rotation) : this.shape.shapeData.currentBlocks;
            //const blockPoints = this.shape.shapeData.currentBlocks;

            var canMove = true;

            for (var i = 0; i < blockPoints.length; i++) {
                for (var j = 0; j < blockPoints[i].length; j++) {
                    if (blockPoints[i][j] == 1) {
                        if (column + j < 0) {
                            canMove = false;
                            return canMove;
                        } else if (column + j > 13) {
                            canMove = false;
                            return canMove;
                        }
                        // collision detection
                        if (row + i > 21) {
                            if (!rotation) this.shape.collisionDetected = true;

                            canMove = false;
                            return canMove;
                        } else if (this.gameField[row + i][column + j] == 1) {
                            if (!rotation) this.shape.collisionDetected = true;

                            canMove = false;
                            return canMove;
                        }
                    }
                }
            }
            return canMove;
        }
    }, {
        key: "shapeData",
        get: function get() {
            return this.shape.shapeData;
        }
    }]);

    return MovementController;
}(createjs.EventDispatcher);

exports.default = MovementController;

},{}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _Block = require("./view/Block");

var _Block2 = _interopRequireDefault(_Block);

var _ShapeData = require("./model/ShapeData");

var _ShapeData2 = _interopRequireDefault(_ShapeData);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var TetrisShape = function (_createjs$Container) {
    _inherits(TetrisShape, _createjs$Container);

    _createClass(TetrisShape, null, [{
        key: "COLLISION_DETECTED",
        get: function get() {
            return "collision detected";
        }
    }, {
        key: "DEFAULT_SHAPE_COLUMN",
        get: function get() {
            return 5;
        }
    }, {
        key: "DEFAULT_SHAPE_ROW",
        get: function get() {
            return 0;
        }
    }]);

    function TetrisShape(shapeName) {
        _classCallCheck(this, TetrisShape);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TetrisShape).call(this));

        _this.actualBlockPositions = [];
        _this.shapeData = new _ShapeData2.default(shapeName);

        _this.onRotationStateChanged = _this.onRotationStateChanged.bind(_this);
        _this.shapeData.addEventListener(_ShapeData2.default.ROTATION_STATE_CHANGED, _this.onRotationStateChanged);

        _this.row = TetrisShape.DEFAULT_SHAPE_ROW;
        _this.column = TetrisShape.DEFAULT_SHAPE_COLUMN;

        _this._collisionDetected;

        _this.init();
        return _this;
    }

    _createClass(TetrisShape, [{
        key: "init",
        value: function init() {
            var imagePath = this.shapeData.imagePath;

            this.block0 = new _Block2.default(new createjs.Point(), imagePath);
            this.block1 = new _Block2.default(new createjs.Point(), imagePath);
            this.block2 = new _Block2.default(new createjs.Point(), imagePath);
            this.block3 = new _Block2.default(new createjs.Point(), imagePath);

            this.addChild(this.block0);
            this.addChild(this.block1);
            this.addChild(this.block2);
            this.addChild(this.block3);

            this.updateShapeBlockPositions();
            this.drawShapeBlocks();

            //timer
            //this.handleTick = this.handleTick.bind(this);
            //createjs.Ticker.addEventListener("tick", this.handleTick);
        }
    }, {
        key: "handleTick",
        value: function handleTick(event) {
            if (this && event) {
                this.block0.y += event.delta / 1000 * this.shapeData.moveStep;
                this.block1.y += event.delta / 1000 * this.shapeData.moveStep;
                this.block2.y += event.delta / 1000 * this.shapeData.moveStep;
                this.block3.y += event.delta / 1000 * this.shapeData.moveStep;

                //this.y += event.delta / 1000 * this.shapeData.moveStep;
            }
        }
    }, {
        key: "rotate",
        value: function rotate() {
            this.shapeData.rotationValue += 1;
        }
    }, {
        key: "onRotationStateChanged",
        value: function onRotationStateChanged(event) {
            console.log("ROTATE");

            this.updateShapeBlockPositions();
            this.drawShapeBlocks();
        }
    }, {
        key: "drawShapeBlocks",
        value: function drawShapeBlocks() {
            this.block0.updatePosition(this.actualBlockPositions[0]);
            this.block1.updatePosition(this.actualBlockPositions[1]);
            this.block2.updatePosition(this.actualBlockPositions[2]);
            this.block3.updatePosition(this.actualBlockPositions[3]);
        }
    }, {
        key: "updateShapeBlockPositions",
        value: function updateShapeBlockPositions() {
            var blockPoints = this.shapeData.currentBlocks;
            this.actualBlockPositions.length = 0;

            for (var i = 0; i < blockPoints.length; i++) {
                for (var j = 0; j < blockPoints[i].length; j++) {
                    if (blockPoints[i][j] > 0) this.actualBlockPositions[this.actualBlockPositions.length] = new createjs.Point(j, i);
                }
            }
        }
    }, {
        key: "moveShape",
        value: function moveShape() {
            this.x = this.column * _Block2.default.BLOCK_SIZE;
            this.y = this.row * _Block2.default.BLOCK_SIZE;
        }
    }, {
        key: "collisionDetected",
        get: function get() {
            return this._collisionDetected;
        },
        set: function set(value) {
            this._collisionDetected = value;
            this.dispatchEvent(new Event(TetrisShape.COLLISION_DETECTED));
        }
    }]);

    return TetrisShape;
}(createjs.Container);

exports.default = createjs.promote(TetrisShape, "Container");

},{"./model/ShapeData":4,"./view/Block":5}],4:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ShapeData = function (_createjs$EventDispat) {
    _inherits(ShapeData, _createjs$EventDispat);

    _createClass(ShapeData, null, [{
        key: "ROTATION_STATE_CHANGED",
        get: function get() {
            return "rotationStateChanged";
        }
    }, {
        key: "IMAGE_PATH",
        get: function get() {
            return "./images/";
        }
    }, {
        key: "J",
        get: function get() {
            return "J";
        }
    }, {
        key: "L",
        get: function get() {
            return "L";
        }
    }, {
        key: "I",
        get: function get() {
            return "I";
        }
    }, {
        key: "T",
        get: function get() {
            return "T";
        }
    }, {
        key: "O",
        get: function get() {
            return "O";
        }
    }, {
        key: "S",
        get: function get() {
            return "S";
        }
    }, {
        key: "Z",
        get: function get() {
            return "Z";
        }
    }]);

    function ShapeData(type) {
        _classCallCheck(this, ShapeData);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShapeData).call(this));

        _this.imagePath = "";
        _this.moveStep = 16;

        _this.row;
        _this.column;

        _this._rotation0 = [];
        _this._rotation1 = [];
        _this._rotation2 = [];
        _this._rotation3 = [];

        _this._rotationValue = 0;
        _this._type = type;

        _this.createShapeData(type);
        return _this;
    }

    _createClass(ShapeData, [{
        key: "createShapeData",
        value: function createShapeData(type) {
            //instead of factory method
            console.log("createShapeData " + type);
            this["createShape" + type]();
        }

        // getting current shape blocks state

    }, {
        key: "getBlocksForRotaion",

        // getting shape blocks state for concrete rotation
        value: function getBlocksForRotaion(value) {
            if (value > 3 || 0 > value) value = 0;

            return this["_rotation" + value];
        }
    }, {
        key: "createShapeL",
        value: function createShapeL() {
            var imageName = "block_orange.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeJ",
        value: function createShapeJ() {
            var imageName = "block_blue.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeI",
        value: function createShapeI() {
            var imageName = "block_cyan.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeT",
        value: function createShapeT() {
            var imageName = "block_purple.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
            this._rotation2 = [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeS",
        value: function createShapeS() {
            var imageName = "block_green.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0]];
            this._rotation3 = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeZ",
        value: function createShapeZ() {
            var imageName = "block_red.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
        }
    }, {
        key: "createShapeO",
        value: function createShapeO() {
            var imageName = "block_yellow.png";
            this.imagePath = ShapeData.IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "currentBlocks",
        get: function get() {
            return this["_rotation" + this._rotationValue];
        }
    }, {
        key: "rotationValue",
        get: function get() {
            return this._rotationValue;
        },
        set: function set(value) {
            if (value > 3 || 0 > value) value = 0;

            this._rotationValue = value;
            this.dispatchEvent(new Event(ShapeData.ROTATION_STATE_CHANGED));
        }
    }]);

    return ShapeData;
}(createjs.EventDispatcher);

exports.default = createjs.promote(ShapeData, "EventDispatcher");

},{}],5:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Block = function (_createjs$Bitmap) {
    _inherits(Block, _createjs$Bitmap);

    _createClass(Block, null, [{
        key: "BLOCK_SIZE",
        get: function get() {
            return 16;
        }
    }]);

    function Block(position, imagePath) {
        _classCallCheck(this, Block);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Block).call(this, imagePath));

        _this.size = Block.BLOCK_SIZE;
        _this._position = position;
        return _this;
    }

    _createClass(Block, [{
        key: "moveBlock",
        value: function moveBlock() {
            this.x = this._position.x * this.size;
            this.y = this._position.y * this.size;
            this.width = this.height = this.size;
        }
    }, {
        key: "updatePosition",
        value: function updatePosition(newPosition) {
            this._position = newPosition;

            var position = this._position;
            var size = this.size;

            this.moveBlock();
            this.setBounds(position.x * size, position.y * size, size, size);
        }
    }]);

    return Block;
}(createjs.Bitmap);

exports.default = createjs.promote(Block, "Bitmap");

},{}]},{},[1]);
