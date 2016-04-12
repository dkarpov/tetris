"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Block = require("./view/Block");

var _Block2 = _interopRequireDefault(_Block);

var _ShapeData = require("./model/ShapeData");

var _ShapeData2 = _interopRequireDefault(_ShapeData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TetrisShape = function (_createjs$Container) {
    _inherits(TetrisShape, _createjs$Container);

    function TetrisShape(shapeName) {
        _classCallCheck(this, TetrisShape);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TetrisShape).call(this));

        _this.actualBlockPositions = [];
        _this._shapeData = new _ShapeData2.default(shapeName);
        _this._shapeData.addEventListener(_ShapeData2.default.ROTATION_STATE_CHANGED, _this.onRotationStateChanged);

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
            var imagePath = this._shapeData.imagePath;

            this.block0 = new _Block2.default(new createjs.Point(), imagePath);
            this.block1 = new _Block2.default(new createjs.Point(), imagePath);
            this.block2 = new _Block2.default(new createjs.Point(), imagePath);
            this.block3 = new _Block2.default(new createjs.Point(), imagePath);

            this.addChild(this.block0);
            this.addChild(this.block1);
            this.addChild(this.block2);
            this.addChild(this.block3);

            this.updateShapeBlockPositions();
            this.drawShape();

            //this.cache(this.x, this.y, this.getBounds().width, this.getBounds().height);
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
            var blockPoints = this._shapeData.currentBlocks;
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