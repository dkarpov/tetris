import Block from "./view/Block";
import ShapeData from "./model/ShapeData";

class TetrisShape extends createjs.Container {

    constructor(shapeName)
    {
        super();

        this.actualBlockPositions = [];
        this._data = new ShapeData(shapeName);
        this._data.addEventListener(ShapeData.ROTATION_STATE_CHANGED, this.onRotationStateChanged);

        this.init();
    }

    onRotationStateChanged(event)
    {
        this.updateShapeBlockPositions();
        this.drawShape();
    }

    init()
    {
        this.block0 = new Block(new createjs.Point());
        this.block1 = new Block(new createjs.Point());
        this.block2 = new Block(new createjs.Point());
        this.block3 = new Block(new createjs.Point());

        this.addChild(this.block0);
        this.addChild(this.block1);
        this.addChild(this.block2);
        this.addChild(this.block3);

        this.updateShapeBlockPositions();
        this.drawShape();

        //this.cache(0, 0, this.width, this.height);
    }

    drawShape()
    {
        this.block0.updatePosition(this.actualBlockPositions[0]);
        this.block1.updatePosition(this.actualBlockPositions[1]);
        this.block2.updatePosition(this.actualBlockPositions[2]);
        this.block3.updatePosition(this.actualBlockPositions[3]);
    }

    updateShapeBlockPositions()
    {
        let blockPoints = this._data.currentBlocks;
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
}

export default createjs.promote(TetrisShape, "Container");
