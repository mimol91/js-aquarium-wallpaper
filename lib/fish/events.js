module.exports = {
    onDragStart: function (event) {
        this.alpha = 0.5;
        this.dragging = true;
        this.data = event.data;
        this.data.speed = this.speed;
    },
    onDragEnd: function () {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    },
    onDragMove: function () {
        if (!this.dragging) {
            return;
        }

        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
};