const SPRITE_SIZE = 64;

module.exports = {
    SPRITE_SIZE: SPRITE_SIZE,
    getFishes: () =>
        new Array(15).fill(0).map((val, i) =>
            `/images/png/fish-${i}.png`)
};
