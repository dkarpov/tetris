(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _TetrisShape = require('./core/view/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

var _Block = require('./core/view/Block');

var _Block2 = _interopRequireDefault(_Block);

var _MovementController = require('./core/MovementController');

var _MovementController2 = _interopRequireDefault(_MovementController);

var _CircleButton = require('./misc/CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// Init stage
var STAGE = new createjs.Stage("canvas");
var canvas = document.getElementById('canvas');
var ALL_SHAPES = ['L', 'J', 'O', 'I', 'T', 'S', 'Z'];
var BACKGROUND_IMG = new createjs.Bitmap(_ShapeData2.default.IMAGE_PATH + "background.png");
var FIELD_WIDTH = 14;
var FIELD_HEIGHT = 22;
var BTN_LABEL = "Play again";

var speed = 1;
var speedGear = 2;

var randomShape;
var moveController = new _MovementController2.default();
var currentTetrisShape;
var backgroundCont;
var lockedBlocksCont;
var fieldGridArr;
var fieldGridLockedBlocks;

var continueBtn = new _CircleButton2.default(BTN_LABEL);
var gameOver = false;
continueBtn.on("click", initField);

//update stage on tick
createjs.Ticker.addEventListener("tick", STAGE);
createjs.Ticker.setFPS(60);

initField();

function initField() {
    gameOver = false;

    // just for debug
    //drawDemoField();
    drawField();
    createShape();
    moveShape();

    createjs.Ticker.addEventListener("tick", tickMoveHandler);
    document.onkeydown = keyPressed;
    STAGE.removeChild(continueBtn);
}

function resetGame() {
    gameOver = true;

    currentTetrisShape.removeEventListener(_TetrisShape2.default.COLLISION_DETECTED, shapeCollisionHandler);
    STAGE.removeChild(currentTetrisShape);

    currentTetrisShape = null;
    createjs.Ticker.removeEventListener("tick", tickMoveHandler);

    continueBtn.x = (canvas.width - continueBtn.getBounds().width) / 2;
    continueBtn.y = (canvas.height - continueBtn.getBounds().height) / 2;

    while (lockedBlocksCont.numChildren) {
        lockedBlocksCont.removeChildAt(0);
    }while (backgroundCont.numChildren) {
        backgroundCont.removeChildAt(0);
    }STAGE.addChild(continueBtn);
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
            if (blockPoints[i][j] == 1 && currentTetrisShape) {
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
                    }
                }
            }
        }
    }

    // discard shape
    if (currentTetrisShape != null) {
        currentTetrisShape.removeEventListener(_TetrisShape2.default.COLLISION_DETECTED, shapeCollisionHandler);
        STAGE.removeChild(currentTetrisShape);
    }
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
    if (gameOver) return;

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
        case 13:
            if (gameOver) initField();
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

},{"./core/MovementController":2,"./core/model/ShapeData":3,"./core/view/Block":4,"./core/view/TetrisShape":5,"./misc/CircleButton":6}],2:[function(require,module,exports){
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
            } else if (direction == MovementController.DOWN && this.canMove(this.shape.row + 1, this.shape.column, this.shapeData.rotationValue)) {
                this.shape.row++;
            } else if (direction == MovementController.ROTATE && this.canMove(this.shape.row, this.shape.column, this.shapeData.rotationValue + 1)) {
                this.shapeData.rotationValue += 1;
            }

            this.shape.moveShape();
        }
    }, {
        key: "canMove",
        value: function canMove(row, column) {
            var rotation = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            var blockPoints = rotation ? this.shape.shapeData.getBlocksForRotaion(rotation) : this.shape.shapeData.currentBlocks;
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
                            if (rotation != null) {
                                this.shape.collisionDetected = true;
                            }

                            canMove = false;
                            return canMove;
                        } else if (row + i > 0 && this.gameField[row + i][column + j] == 1) {
                            if (rotation != null) {
                                this.shape.collisionDetected = true;
                            }

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

},{}],4:[function(require,module,exports){
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

var _Block = require("./Block");

var _Block2 = _interopRequireDefault(_Block);

var _ShapeData = require("../model/ShapeData");

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
            return -4;
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

},{"../model/ShapeData":3,"./Block":4}],6:[function(require,module,exports){
'use strict';

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

var CircleButton = function (_createjs$Container) {
    _inherits(CircleButton, _createjs$Container);

    function CircleButton() {
        var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var color = arguments.length <= 1 || arguments[1] === undefined ? '#222' : arguments[1];
        var radius = arguments.length <= 2 || arguments[2] === undefined ? 80 : arguments[2];

        _classCallCheck(this, CircleButton);

        // set props

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CircleButton).call(this));
        // invoke Container constructor

        _this.text = text;
        _this.radius = radius;
        _this.color = color;

        // Init component
        _this.setup();
        return _this;
    }

    _createClass(CircleButton, [{
        key: 'setup',
        value: function setup() {
            // Create a circle shape
            var circle = new createjs.Shape();
            circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
            this.addChild(circle, txt);

            // Create a Text
            var txt = new createjs.Text(this.text, "20px Arial", 'white');
            this.addChild(txt);

            // Center text inside circle
            txt.x = txt.getMeasuredWidth() / 2 * -1;
            txt.y = txt.getMeasuredHeight() / 2 * -1;

            console.log(this.getBounds() + "fsdfsd", this.x);
            // FadeIn all
            this.alpha = 0;
            createjs.Tween.get(this).to({ alpha: 0.9 }, 1000).call(this.handleComplete);
        }

        // Dispatch an event at the end of animation

    }, {
        key: 'handleComplete',
        value: function handleComplete() {
            this.dispatchEvent('animationEnd');
        }
    }]);

    return CircleButton;
}(createjs.Container);

exports.default = createjs.promote(CircleButton, "Container");

},{}]},{},[1]);
