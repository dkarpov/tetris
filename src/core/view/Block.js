class Block extends createjs.Shape
{
    constructor(position, imagePath)
    {
        super(imagePath);

        this.size = 20;
        this._position = position;
    }

    drawBlock()
    {
        var position = this._position;
        var size = this.size;

        this.graphics.clear();
        this.graphics.setStrokeStyle(1);
        this.graphics.beginStroke("#FFFFFF");
        this.graphics.beginFill(0xFFFF00);
        this.graphics.drawRect(position.x * size, position.y * size, size, size);
        this.graphics.endFill();
    }

    updatePosition(newPosition)
    {
        this._position = newPosition;

        var position = this._position;
        var size = this.size;

        this.drawBlock();
        this.setBounds(position.x * size, position.y * size, size, size);
    }
}

export default createjs.promote(Block, "Shape");