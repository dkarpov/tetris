class Block extends createjs.Bitmap
{
    static get BLOCK_SIZE() {return 16; }

    constructor(position, imagePath)
    {
        super(imagePath);

        this.size = Block.BLOCK_SIZE;
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

export default createjs.promote(Block, "Bitmap");