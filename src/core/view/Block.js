class Block extends createjs.Bitmap
{
    constructor(position, imagePath)
    {
        super(imagePath);

        this.size = 16;
        this._position = position;
    }

    moveBlock()
    {
        this.x = this._position.x * this.size;
        this.y = this._position.y * this.size;
        this.width = this.height = this.size;
    }

    updatePosition(newPosition)
    {
        this._position = newPosition;

        var position = this._position;
        var size = this.size;

        this.moveBlock();
        this.setBounds(position.x * size, position.y * size, size, size);
    }
}

export default createjs.promote(Block, "Shape");