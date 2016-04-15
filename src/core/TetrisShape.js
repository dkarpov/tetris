import Block from "./view/Block";
import ShapeData from "./model/ShapeData";

class TetrisShape extends createjs.Container
{
    static get COLLISION_DETECTED() { return "collision detected"; }
    static get DEFAULT_SHAPE_COLUMN() {return 5;}
    static get DEFAULT_SHAPE_ROW() {return 0;}


    constructor(shapeName)
    {
        super();

        this.actualBlockPositions = [];
        this.shapeData = new ShapeData(shapeName);

        this.onRotationStateChanged = this.onRotationStateChanged.bind(this);
        this.shapeData.addEventListener(ShapeData.ROTATION_STATE_CHANGED, this.onRotationStateChanged);

        this.row = TetrisShape.DEFAULT_SHAPE_ROW;
        this.column = TetrisShape.DEFAULT_SHAPE_COLUMN;

        this._collisionDetected;

        this.init();
    }

    init()
    {
        const imagePath = this.shapeData.imagePath;

        this.block0 = new Block(new createjs.Point(), imagePath);
        this.block1 = new Block(new createjs.Point(), imagePath);
        this.block2 = new Block(new createjs.Point(), imagePath);
        this.block3 = new Block(new createjs.Point(), imagePath);
        
        this.addChild(this.block0);
        this.addChild(this.block1);
        this.addChild(this.block2);
        this.addChild(this.block3);

        this.updateShapeBlockPositions();
        this.drawShapeBlocks();

        //timer
        //this.handleTick = this.handleTick.bind(this);
        //createjs.Ticker.addEventListener("tick", this.handleTick);
    }

    handleTick(event)
    {
        if (this && event)
        {
            this.block0.y += event.delta / 1000 * this.shapeData.moveStep;
            this.block1.y += event.delta / 1000 * this.shapeData.moveStep;
            this.block2.y += event.delta / 1000 * this.shapeData.moveStep;
            this.block3.y += event.delta / 1000 * this.shapeData.moveStep;

            //this.y += event.delta / 1000 * this.shapeData.moveStep;
        }
    }

    rotate()
    {
        this.shapeData.rotationValue += 1;
    }

    onRotationStateChanged(event)
    {
        console.log("ROTATE");

        this.updateShapeBlockPositions();
        this.drawShapeBlocks();
    }

    get collisionDetected()
    {
        return this._collisionDetected;
    }

    set collisionDetected(value)
    {
        this._collisionDetected = value;
        this.dispatchEvent(new Event(TetrisShape.COLLISION_DETECTED));
    }


    drawShapeBlocks()
    {
        this.block0.updatePosition(this.actualBlockPositions[0]);
        this.block1.updatePosition(this.actualBlockPositions[1]);
        this.block2.updatePosition(this.actualBlockPositions[2]);
        this.block3.updatePosition(this.actualBlockPositions[3]);
    }

    updateShapeBlockPositions()
    {
        var blockPoints = this.shapeData.currentBlocks;
        this.actualBlockPositions.length = 0;

        for (let i = 0; i < blockPoints.length; i++)
        {
            for (let j = 0; j < blockPoints[i].length; j++)
            {
                if (blockPoints[i][j] > 0)
                    this.actualBlockPositions[this.actualBlockPositions.length] = new createjs.Point(j, i);
            }
        }
    }
    
    moveShape()
    {
        this.x = this.column * Block.BLOCK_SIZE;
        this.y = this.row * Block.BLOCK_SIZE;
    }
}

export default createjs.promote(TetrisShape, "Container");
