(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _TetrisShape = require('./core/TetrisShape');

var _TetrisShape2 = _interopRequireDefault(_TetrisShape);

var _ShapeData = require('./core/model/ShapeData');

var _ShapeData2 = _interopRequireDefault(_ShapeData);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

},{"./core/TetrisShape":2,"./core/model/ShapeData":3}],2:[function(require,module,exports){
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

    function TetrisShape(shapeName) {
        _classCallCheck(this, TetrisShape);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TetrisShape).call(this));

        _this.actualBlockPositions = [];
        _this._data = new _ShapeData2.default(shapeName);
        _this._data.addEventListener(_ShapeData2.default.ROTATION_STATE_CHANGED, _this.onRotationStateChanged);

        _this.init();
        return _this;
    }

    _createClass(TetrisShape, [{
        key: "onRotationStateChanged",
        value: function onRotationStateChanged(event) {
            this.updateShapeBlockPositions();
            this.drawShape();
        }
    }, {
        key: "init",
        value: function init() {
            this.block0 = new _Block2.default(new createjs.Point());
            this.block1 = new _Block2.default(new createjs.Point());
            this.block2 = new _Block2.default(new createjs.Point());
            this.block3 = new _Block2.default(new createjs.Point());

            this.addChild(this.block0);
            this.addChild(this.block1);
            this.addChild(this.block2);
            this.addChild(this.block3);

            this.updateShapeBlockPositions();
            this.drawShape();

            //this.cache(0, 0, this.width, this.height);
        }
    }, {
        key: "drawShape",
        value: function drawShape() {
            this.block0.updatePosition(this.actualBlockPositions[0]);
            this.block1.updatePosition(this.actualBlockPositions[1]);
            this.block2.updatePosition(this.actualBlockPositions[2]);
            this.block3.updatePosition(this.actualBlockPositions[3]);
        }
    }, {
        key: "updateShapeBlockPositions",
        value: function updateShapeBlockPositions() {
            var blockPoints = this._data.currentBlocks;
            this.actualBlockPositions.length = 0;

            for (var i = 0; i < blockPoints.length; i++) {
                for (var j = 0; j < blockPoints[i].length; j++) {
                    if (blockPoints[i][j] > 0) this.actualBlockPositions[this.actualBlockPositions.length] = new createjs.Point(j, i);
                }
            }
        }
    }]);

    return TetrisShape;
}(createjs.Container);

exports.default = createjs.promote(TetrisShape, "Container");

},{"./model/ShapeData":3,"./view/Block":4}],3:[function(require,module,exports){
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

var ROTATION_STATE_CHANGED = "rotationStateChanged";
var J = 'J';
var L = 'L';
var I = 'I';
var T = 'T';
var O = 'O';
var S = 'S';
var Z = 'Z';

var ShapeData = function (_createjs$EventDispat) {
    _inherits(ShapeData, _createjs$EventDispat);

    _createClass(ShapeData, null, [{
        key: 'ROTATION_STATE_CHANGED',
        get: function get() {
            return ROTATION_STATE_CHANGED;
        }
    }, {
        key: 'J',
        get: function get() {
            return J;
        }
    }, {
        key: 'L',
        get: function get() {
            return L;
        }
    }, {
        key: 'I',
        get: function get() {
            return I;
        }
    }, {
        key: 'T',
        get: function get() {
            return T;
        }
    }, {
        key: 'O',
        get: function get() {
            return O;
        }
    }, {
        key: 'S',
        get: function get() {
            return S;
        }
    }, {
        key: 'Z',
        get: function get() {
            return Z;
        }
    }]);

    function ShapeData(type) {
        _classCallCheck(this, ShapeData);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShapeData).call(this));

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
        key: 'createShapeData',
        value: function createShapeData(type) {
            //instead of factory method
            this["createShape" + type]();
        }

        // getting current shape blocks state

    }, {
        key: 'createShapeL',
        value: function createShapeL() {
            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: 'createShapeJ',
        value: function createShapeJ() {
            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
        }
    }, {
        key: 'createShapeI',
        value: function createShapeI() {
            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
        }
    }, {
        key: 'createShapeT',
        value: function createShapeT() {
            this._rotation0 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
            this._rotation2 = [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: 'createShapeS',
        value: function createShapeS() {
            this._rotation0 = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0]];
            this._rotation3 = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: 'createShapeZ',
        value: function createShapeZ() {
            this._rotation0 = [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
        }
    }, {
        key: 'createShapeO',
        value: function createShapeO() {
            this._rotation0 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        }
    }, {
        key: 'currentBlocks',
        get: function get() {
            return this["_rotation" + this._rotationValue];
        }
    }, {
        key: 'rotationValue',
        get: function get() {
            return this._rotationValue;
        },
        set: function set(value) {
            if (value > 3 || 0 > value) value = 0;

            this._rotationValue = value;
            dispatchEvent(new Event(ROTATION_STATE_CHANGED));
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

var Block = function (_createjs$Shape) {
    _inherits(Block, _createjs$Shape);

    function Block(position, imagePath) {
        _classCallCheck(this, Block);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Block).call(this, imagePath));

        _this.size = 20;
        _this._position = position;
        return _this;
    }

    _createClass(Block, [{
        key: "drawBlock",
        value: function drawBlock() {
            var position = this._position;
            var size = this.size;

            this.graphics.clear();
            this.graphics.setStrokeStyle(1);
            this.graphics.beginStroke("#FFFFFF");
            this.graphics.beginFill(0xFFFF00);
            this.graphics.drawRect(position.x * size, position.y * size, size, size);
            this.graphics.endFill();
        }
    }, {
        key: "updatePosition",
        value: function updatePosition(newPosition) {
            this._position = newPosition;

            var position = this._position;
            var size = this.size;

            this.drawBlock();
            this.setBounds(position.x * size, position.y * size, size, size);
        }
    }]);

    return Block;
}(createjs.Shape);

exports.default = createjs.promote(Block, "Shape");

},{}]},{},[1]);
