var gulp = require('gulp');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vinylPaths = require('vinyl-paths');
var base = function(fileName) { return require('path').join(__dirname, fileName || ''); };

var CONFIG = require(base('config/config.js'));
var app = {};

/* APPLICATION SCRIPTS */
app.addStyle = function(paths, outputFilename, sourceMap) {
    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.if(sourceMap, plugins.sourcemaps.init()))
        .pipe(plugins.concat(outputFilename))
        .pipe(plugins.sass.sync())
        .pipe(CONFIG.production ? plugins.cleanCss() : plugins.util.noop())
        .pipe(plugins.if(sourceMap, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(CONFIG.buildDir));
};

app.rename = function(filename, outputFilename) {
    return gulp.src(CONFIG.buildDir + '/' + filename)
        .pipe(vinylPaths(del))
        .pipe(plugins.rename(outputFilename))
        .pipe(gulp.dest(CONFIG.buildDir));
};

app.addScript = function(paths, outputFilename) {
    return gulp.src(paths)
        .pipe(plugins.plumber())
        .pipe(plugins.concat(outputFilename))
        .pipe(CONFIG.production ? plugins.uglify() : plugins.util.noop())
        .pipe(gulp.dest(CONFIG.buildDir));
};

app.browserify = function(entryFilename, outputFilename) {
    return browserify({ entries: [CONFIG.libDir + '/' + entryFilename], debug:!CONFIG.production })
        .transform([
            "babelify", {presets: ["es2015"]}
        ])
        .bundle()
        .on("error", function(err) {
            console.log('ERROR:');
            console.log(err.message);
        })
        .pipe(source(outputFilename))
        .pipe(buffer())
        .pipe(plugins.if(CONFIG.production, plugins.uglify({ mangle:false })))
        .pipe(gulp.dest(CONFIG.buildDir));
};
app.copy = function(srcFiles, outputDir) {
    return gulp.src(srcFiles)
        .pipe(gulp.dest(outputDir));
};

gulp.task('vendors', function() {
    return app.addScript([
        CONFIG.vendorDir + '/pixi.js/bin/pixi.min.js'
    ], 'vendor.js');
});

gulp.task('browserify', function() {
    return app.browserify('init/index.js', 'app.js');
});
gulp.task('styles', function() {
    return app.addStyle([
        CONFIG.libDir + '/init/style.scss'
    ], 'style.css', !CONFIG.production);
});
gulp.task('lint', function() {
    return gulp.src(CONFIG.libDir + '/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('watch', ['lint'], function() {
    gulp.watch('config/*.js', ['build']);
    gulp.watch(CONFIG.libDir + '/**/*.scss', ['build']);
    gulp.watch(CONFIG.libDir + '/**/*.js', ['lint', 'build']);
});

gulp.task('cs-fix', function() {
    return gulp.src(CONFIG.libDir + '/**/*.js')
        .pipe(plugins.jscs({ fix: true }))
        .pipe(gulp.dest(CONFIG.libDir));
});

gulp.task('serve', function() {
    return gulp.src('web')
        .pipe(plugins.webserver({
            host: '0.0.0.0',
            port: CONFIG.port,
            livereload: true
        }));
});
gulp.task('buildFront', function() {
    return gulp.src(['front/index.html'])
        .pipe(gulp.dest('web'));
});
gulp.task('bowerInstall', function() {
    return gulp.src(['./bower.json'])
        .pipe(plugins.install({ allowRoot: true }));
});

/* GULP COMPLEX TASKS */
gulp.task('build', function(next) {
    return runSequence(['vendors', 'browserify', 'styles'], 'buildFront', next);
});

gulp.task('postinstall', function(next) {
    return runSequence(['bowerInstall'], 'build', next);
});

gulp.task('default', ['serve', 'build', 'watch']);
