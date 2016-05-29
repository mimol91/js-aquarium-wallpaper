let random = require('../random');
let assets = require('../assets');

let generateRandomStartPosition = (sprite) => {
    sprite.x = random.getRandomInt(assets.SPRITE_SIZE, window.innerWidth - assets.SPRITE_SIZE);
    sprite.y = random.getRandomInt(assets.SPRITE_SIZE, window.innerHeight - assets.SPRITE_SIZE);
};

class Fish {
    constructor(sprite) {
        this.sprite = sprite;
        this.initialize();
    }

    getSprite() {
        return this.sprite;
    }
    move() {
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
        this.direction = (Math.random() > 0.5) ? -1 : 1;
        this.sprite.scale.x = this.direction;
        this.speed = random.getRandomInt(1, 3);

        generateRandomStartPosition(this.sprite);
    }
}

module.exports = Fish;
