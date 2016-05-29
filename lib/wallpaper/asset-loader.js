let assets = require('../assets');

module.exports = {
    loadAssets: () =>
        PIXI.loader
            .add(assets.getFishes())
            .add(assets.getCastle())
};
