class MovementController extends createjs.EventDispatcher
{
    static get LEFT(){ return "LEFT";}
    static get RIGHT(){ return "RIGHT";}
    static get DOWN(){ return "DOWN";}
    static get ROTATE(){ return "ROTATE";}

    constructor()
    {
        super();

        this.gameField;
        this.shape;
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
        else if (direction == MovementController.ROTATE)
        {
            this.shape.rotate();
        }

        this.shape.moveShape();
    }


    canMove(row, column)
    {
        var blockPoints = this.shape.shapeData.currentBlocks;
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
                        //break;
                    }
                    else if (column + j > 13)
                    {
                        canMove = false;
                        return canMove;
                        //break;
                    }

                    if (row + i > 21)
                    {
                        canMove = false;
                        return canMove;
                        //break;
                    }
                }
            }
        }
        return canMove;
    }

}

export default MovementController;
