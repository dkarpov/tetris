class ShapeData extends createjs.EventDispatcher
{
    static get ROTATION_STATE_CHANGED() { return "rotationStateChanged"; }
    static get IMAGE_PATH() {return "./images/"; }
    static get J() { return "J"; }
    static get L() { return "L"; }
    static get I() { return "I"; }
    static get T() { return "T"; }
    static get O() { return "O"; }
    static get S() { return "S"; }
    static get Z() { return "Z"; }

    constructor(type)
    {
        super();

        this.imagePath = "";
        this.moveStep = 16;

        this.row;
        this.column;

        this._rotation0 = [];
        this._rotation1 = [];
        this._rotation2 = [];
        this._rotation3 = [];

        this._rotationValue = 0;
        this._type = type;

        this.createShapeData(type);
    }

    createShapeData(type)
    {
        //instead of factory method
        console.log("createShapeData " + type);
        this["createShape" + type]();
    }

    // getting current shape blocks state
    get currentBlocks()
    {
        return this["_rotation" + this._rotationValue];
    }

    // getting shape blocks state for concrete rotation
    getBlocksForRotaion(value)
    {
        if (value > 3 || 0 > value)
            value = 0;

        return this["_rotation" + value];
    }

    get rotationValue()
    {
        return this._rotationValue;
    }

    set rotationValue(value)
    {
        if (value > 3 || 0 > value)
            value = 0;

        this._rotationValue = value;
        this.dispatchEvent(new Event(ShapeData.ROTATION_STATE_CHANGED));
    }

    createShapeL()
    {
        const imageName = "block_orange.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation2 = [[0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]];
        this._rotation3 = [[0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]];
    }

    createShapeJ()
    {
        const imageName = "block_blue.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation2 = [[1, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]];
        this._rotation3 = [[0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]];
    }

    createShapeI()
    {
        const imageName = "block_cyan.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        this._rotation2 = [[0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]];
        this._rotation3 = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]];
    }

    createShapeT()
    {
        const imageName = "block_purple.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]];
        this._rotation2 = [[0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
        this._rotation3 = [[0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]];
    }

    createShapeS()
    {
        const imageName = "block_green.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 0, 0, 0],
            [0, 1,1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]];
        this._rotation2 = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0]];
        this._rotation3 = [[1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]];
    }

    createShapeZ()
    {
        const imageName = "block_red.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]];
        this._rotation2 = [[0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]];
        this._rotation3 = [[0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]];
    }

    createShapeO()
    {
        const imageName = "block_yellow.png";
        this.imagePath = ShapeData.IMAGE_PATH + imageName;

        this._rotation0 = [[0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation1 = [[0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation2 = [[0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
        this._rotation3 = [[0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]];
    }
}

export default createjs.promote(ShapeData, "EventDispatcher");