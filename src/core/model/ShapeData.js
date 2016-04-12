const ROTATION_STATE_CHANGED = "rotationStateChanged";
const J = 'J';
const L = 'L';
const I = 'I';
const T = 'T';
const O = 'O';
const S = 'S';
const Z = 'Z';

class ShapeData extends createjs.EventDispatcher
{
    static get ROTATION_STATE_CHANGED() { return ROTATION_STATE_CHANGED; }
    static get J() { return J; }
    static get L() { return L; }
    static get I() { return I; }
    static get T() { return T; }
    static get O() { return O; }
    static get S() { return S; }
    static get Z() { return Z; }

    constructor(type)
    {
        super();

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
        this["createShape" + type]();
    }

    // getting current shape blocks state
    get currentBlocks()
    {
        return this["_rotation" + this._rotationValue];
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
        dispatchEvent(new Event(ROTATION_STATE_CHANGED));
    }

    createShapeL()
    {
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