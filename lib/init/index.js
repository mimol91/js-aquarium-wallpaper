let wallpaper = require('../wallpaper');

document.body.appendChild(wallpaper.getRenderer().view);

window.addEventListener('resize', function(e) {
    wallpaper.onResize(e);
    document.body.replaceChild(wallpaper.getRenderer().view, document.body.childNodes[0]);
});

wallpaper.init();
