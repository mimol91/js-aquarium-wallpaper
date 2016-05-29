let random = require('../random');
let assets = require('../assets');
let events = require('./events');
let SpriteElement = require('../sprite-element');

let generateRandomStartPosition = function() {
    this.sprite.y = random.getRandomInt(assets.SPRITE_SIZE_FISH, window.innerHeight - assets.SPRITE_SIZE_FISH);
    this.sprite.x = (this.direction === 1) ? 0 : window.innerWidth;
};

let initializeDraggable = function() {
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    this.sprite.anchor.set(0.5);

    this.sprite
        .on('mousedown', events.onDragStart)
        .on('touchstart', events.onDragStart)
        .on('mouseup', events.onDragEnd)
        .on('mouseupoutside', events.onDragEnd)
        .on('touchend', events.onDragEnd)
        .on('touchendoutside', events.onDragEnd)
        .on('mousemove', events.onDragMove)
        .on('touchmove', events.onDragMove);
};

class Fish extends SpriteElement {
    constructor(sprite) {
        super(sprite);

        setTimeout(() => this.initialize(), random.getRandomInt(0, 10000));
    }

    move() {
        if (this.sprite.dragging || !this.sprite.visible) {
            return;
        }

        this.sprite.x += this.speed * this.direction;
    }

    isVisible() {
        if (this.direction === 1 && this.sprite.x > window.innerWidth + assets.SPRITE_SIZE_FISH) {
            return false;
        }

        if (this.direction === -1 && this.sprite.x < -1 * assets.SPRITE_SIZE_FISH) {
            return false;
        }

        return true;
    }

    initialize() {
        super.initialize();

        this.direction = (Math.random() > 0.5) ? -1 : 1;
        this.sprite.scale.x = this.direction;
        this.speed = random.getRandomInt(1, 3);

        generateRandomStartPosition.bind(this)();
        initializeDraggable.bind(this)();
    }
}

module.exports = Fish;
