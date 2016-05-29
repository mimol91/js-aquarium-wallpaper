let assets = require('../assets');
let appLoop = require('./appLoop');
let Fish = require('../fish');

let stage = new PIXI.Container();
let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
let fishes = [];

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

let setupRender = function() {
    fishes = assets.getFishes().map(name =>
        new Fish(new PIXI.Sprite(PIXI.loader.resources[name].texture)));

    fishes.forEach(fish =>
        stage.addChild(fish.getSprite()));

    renderer.render(stage);
};

let mainLoop = function () {
    requestAnimationFrame(mainLoop);
    appLoop(fishes);
    renderer.render(stage);
};

module.exports = {
    getRenderer: () => renderer,
    init: function () {
        PIXI.loader
            .add(assets.getFishes())
            .load(setupRender);

        mainLoop();
    },
    onResize: () =>
        renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight)
};
