"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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