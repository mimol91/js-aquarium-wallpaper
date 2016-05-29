let elementsFactory = require('./elements-factory');

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

let appLoop = function () {
    elementsFactory.getAllElements().forEach(function(element) {
        element.move();
    });

    handleFishPool(elementsFactory.getFishes());
};

module.exports = appLoop;
