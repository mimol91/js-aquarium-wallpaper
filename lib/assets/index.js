const SPRITE_SIZE_FISH = 64;
const SPRITE_SIZE_CASTLE = 256;
const IMAGE_DIR  = '/images/png/';

module.exports = {
    SPRITE_SIZE_FISH: SPRITE_SIZE_FISH,
    SPRITE_SIZE_CASTLE: SPRITE_SIZE_CASTLE,
    getFishes: () =>
        new Array(15).fill(0).map((val, i) =>
            `${IMAGE_DIR}fish-${i}.png`),
    getCastle: () =>
        `${IMAGE_DIR}castle.png`
};
