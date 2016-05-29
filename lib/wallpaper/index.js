let assets = require('../assets');
let appLoop = require('./appLoop');
let assetLoader = require('./asset-loader');
let elementsFactory = require('./elements-factory');

let stage = new PIXI.Container();
let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
let fishes = [];
let castle = null;

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

let setup = function() {
    castle = elementsFactory.createCastle();
    fishes = elementsFactory.createFishes();

    elementsFactory.getAllElements().forEach(element =>
        stage.addChild(element.getSprite()));

    renderer.render(stage);

    mainLoop();
};

let mainLoop = function () {
    requestAnimationFrame(mainLoop);
    appLoop();
    renderer.render(stage);
};

module.exports = {
    getRenderer: () => renderer,
    init: function () {
        assetLoader.loadAssets().load(setup);
    },

    onResize: function(e) {
        renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

        elementsFactory.getAllElements().forEach((element) => element.onResizeEvent(e));
    }
};
