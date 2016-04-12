"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ROTATION_STATE_CHANGED = "rotationStateChanged";
var IMAGE_PATH = "./images/";

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
        key: "ROTATION_STATE_CHANGED",
        get: function get() {
            return ROTATION_STATE_CHANGED;
        }
    }, {
        key: "IMAGE_PATH",
        get: function get() {
            return IMAGE_PATH;
        }
    }, {
        key: "J",
        get: function get() {
            return J;
        }
    }, {
        key: "L",
        get: function get() {
            return L;
        }
    }, {
        key: "I",
        get: function get() {
            return I;
        }
    }, {
        key: "T",
        get: function get() {
            return T;
        }
    }, {
        key: "O",
        get: function get() {
            return O;
        }
    }, {
        key: "S",
        get: function get() {
            return S;
        }
    }, {
        key: "Z",
        get: function get() {
            return Z;
        }
    }]);

    function ShapeData(type) {
        _classCallCheck(this, ShapeData);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShapeData).call(this));

        _this.imagePath = "";

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
            this["createShape" + type]();
        }

        // getting current shape blocks state

    }, {
        key: "createShapeL",
        value: function createShapeL() {
            var imageName = "block_orange.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeJ",
        value: function createShapeJ() {
            var imageName = "block_blue.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation2 = [[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeI",
        value: function createShapeI() {
            var imageName = "block_cyan.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeT",
        value: function createShapeT() {
            var imageName = "block_purple.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
            this._rotation2 = [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
            this._rotation3 = [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeS",
        value: function createShapeS() {
            var imageName = "block_green.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0]];
            this._rotation3 = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        }
    }, {
        key: "createShapeZ",
        value: function createShapeZ() {
            var imageName = "block_red.png";
            this.imagePath = IMAGE_PATH + imageName;

            this._rotation0 = [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
            this._rotation1 = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
            this._rotation2 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [0, 0, 0, 0]];
            this._rotation3 = [[0, 0, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0]];
        }
    }, {
        key: "createShapeO",
        value: function createShapeO() {
            var imageName = "block_yellow.png";
            this.imagePath = IMAGE_PATH + imageName;

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
            dispatchEvent(new Event(ROTATION_STATE_CHANGED));
        }
    }]);

    return ShapeData;
}(createjs.EventDispatcher);

exports.default = createjs.promote(ShapeData, "EventDispatcher");