let SpriteElement = require('../sprite-element');
let assets = require('../assets');

let generateStartingPosition = function () {
    this.sprite.x = window.innerWidth - assets.SPRITE_SIZE_CASTLE;
    this.sprite.y = window.innerHeight - assets.SPRITE_SIZE_CASTLE;
};

class Castle extends SpriteElement {
    constructor(sprite) {
        super(sprite);
        this.initialize();
    }

    initialize() {
        super.initialize();

        generateStartingPosition.bind(this)();
    }

    onResizeEvent(e) {
        generateStartingPosition.bind(this)();
    }
}
module.exports = Castle;
