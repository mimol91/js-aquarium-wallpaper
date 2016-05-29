let random = require('../random');
let assets = require('../assets');
let events = require('./events');

let generateRandomStartPosition = function() {
    this.sprite.y = random.getRandomInt(assets.SPRITE_SIZE, window.innerHeight - assets.SPRITE_SIZE);
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
class Fish {
    constructor(sprite) {
        this.sprite = sprite;
        this.sprite.visible = false;

        setTimeout(() => this.initialize(), random.getRandomInt(0, 10000));
    }

    getSprite() {
        return this.sprite;
    }
    move() {
        if (this.sprite.dragging || !this.sprite.visible) {
            return;
        }

        this.sprite.x += this.speed * this.direction;
    }

    isVisible() {
        if (this.direction === 1 && this.sprite.x > window.innerWidth + assets.SPRITE_SIZE) {
            return false;
        }

        if (this.direction === -1 && this.sprite.x < -1 * assets.SPRITE_SIZE) {
            return false;
        }

        return true;
    }

    initialize() {
        this.sprite.visible = true;
        this.direction = (Math.random() > 0.5) ? -1 : 1;
        this.sprite.scale.x = this.direction;
        this.speed = random.getRandomInt(1, 3);

        generateRandomStartPosition.bind(this)();
        initializeDraggable.bind(this)();
    }
}

module.exports = Fish;
