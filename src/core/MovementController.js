class MovementController extends createjs.EventDispatcher
{
    static get LEFT() {return "LEFT";}
    static get RIGHT() {return "RIGHT";}
    static get DOWN() {return "DOWN";}
    static get ROTATE() {return "ROTATE";}

    constructor()
    {
        super();

        this.gameField;
        this.shape;
    }

    get shapeData()
    {
        return this.shape.shapeData;
    }

    tryMoveShape(direction)
    {
        if (direction == MovementController.LEFT && this.canMove(this.shape.row, this.shape.column - 1))
        {
            this.shape.column--;
        }
        else if (direction == MovementController.RIGHT && this.canMove(this.shape.row, this.shape.column + 1))
        {
            this.shape.column++;
        }
        else if (direction == MovementController.DOWN && this.canMove(this.shape.row + 1, this.shape.column))
        {
            this.shape.row++;
        }
        else if (direction == MovementController.ROTATE && this.canMove(this.shape.row, this.shape.column, this.shapeData.rotationValue + 1))
        {
            this.shape.rotate();
        }

        this.shape.moveShape();
    }

    canMove(row, column, rotation = null)
    {
        const blockPoints = rotation ?  this.shape.shapeData.getBlocksForRotaion(rotation) : this.shape.shapeData.currentBlocks;
        //const blockPoints = this.shape.shapeData.currentBlocks;

        var canMove = true;

        for (let i = 0; i < blockPoints.length; i++)
        {
            for (let j = 0; j < blockPoints[i].length; j++)
            {
                if (blockPoints[i][j] == 1)
                {
                    if (column + j < 0)
                    {
                        canMove = false;
                        return canMove;
                    }
                    else if (column + j > 13)
                    {
                        canMove = false;
                        return canMove;
                    }
                    // collision detection
                    if (row + i > 21)
                    {
                        if (!rotation)
                            this.shape.collisionDetected = true;

                        canMove = false;
                        return canMove;
                    }
                    else if (this.gameField[row + i][column + j] == 1)
                    {
                        if (!rotation)
                            this.shape.collisionDetected = true;

                        canMove = false;
                        return canMove;
                    }
                }
            }
        }
        return canMove;
    }

}

export default MovementController;
