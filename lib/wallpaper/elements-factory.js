let assets = require('../assets');
let Fish = require('../fish');
let Castle = require('../castle');

let fishes = [];
let castle = null;

let getAllElements = () => [castle].concat(fishes);

module.exports = {
    createCastle: () =>
        castle = new Castle(new PIXI.Sprite(PIXI.loader.resources[assets.getCastle()].texture)),

    createFishes: () =>
        fishes = assets.getFishes().map(name =>
            new Fish(new PIXI.Sprite(PIXI.loader.resources[name].texture))),

    getAllElements: getAllElements,
    getFishes: () => fishes,
    getCastle: () => castle
};
