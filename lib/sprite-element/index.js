class spriteElement {
    constructor(sprite) {
        this.sprite = sprite;
        this.sprite.visible = false;
    }

    isVisible() {
        return true;
    }

    initialize() {
        this.sprite.visible = true;
    }

    getSprite() {
        return this.sprite;
    }

    move() {
        return;
    }

    onResizeEvent(e) {
        return;
    }
}

module.exports = spriteElement;
