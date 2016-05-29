let handleFishPool = function(fishes) {
    let addNewFish = Math.random() > 0.7;
    if (!addNewFish) {
        return;
    }

    fishes.forEach(function(fish) {
        if (!fish.isVisible()) {
            fish.initialize();
        }
    });
};

let appLoop = function (fishes) {
    fishes.forEach(function(fish) {
        fish.move();
    });

    handleFishPool(fishes);
};

module.exports = appLoop;
