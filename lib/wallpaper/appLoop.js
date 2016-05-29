let handleFishPool = function(fishes) {
    fishes.forEach(function(fish) {
        if (fish.isVisible()) {
            return;
        }
        const addNewFish = Math.random() > 0.99;
        if (!addNewFish) {
            return;
        }
        fish.initialize();
    });
};

let appLoop = function (fishes) {
    fishes.forEach(function(fish) {
        fish.move();
    });

    handleFishPool(fishes);
};

module.exports = appLoop;
