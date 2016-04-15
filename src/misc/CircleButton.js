class CircleButton extends createjs.Container {

    constructor(text = '', color = '#222', radius = 80) {
        // invoke Container constructor
        super();

        // set props
        this.text = text;
        this.radius = radius;
        this.color = color;

        // Init component
        this.setup();
    }

    setup() {
        // Create a circle shape
        const circle = new createjs.Shape();
        circle.graphics.beginFill(this.color).drawCircle(0, 0, this.radius);
        this.addChild(circle, txt);

        // Create a Text
        const txt = new createjs.Text(this.text, "20px Arial", 'white');
        this.addChild(txt);

        // Center text inside circle
        txt.x = txt.getMeasuredWidth()/2 * -1;
        txt.y = txt.getMeasuredHeight()/2 * -1;

        console.log(this.getBounds() + "fsdfsd", this.x);
        // FadeIn all
        this.alpha = 0;
        createjs.Tween.get(this).to({ alpha: 0.9 }, 1000).call(this.handleComplete);
    }

    // Dispatch an event at the end of animation
    handleComplete() {
        this.dispatchEvent('animationEnd');
    }
}

export default createjs.promote(CircleButton, "Container")
