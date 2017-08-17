/*
  ___ _        _
 / __| |_ _  _| |___ ___
 \__ \  _| || | / -_|_-<
 |___/\__|\_, |_\___/__/
          |__/

 */

var gulp            = require('gulp');
var del             = require('del');
var autoprefixer    = require('autoprefixer');
var lost            = require('lost');
var postcss         = require('gulp-postcss');
var sourcemaps      = require('gulp-sourcemaps');
var nano            = require('gulp-cssnano');
var livereload      = require('gulp-livereload');
var changedInPlace  = require('gulp-changed-in-place');

gulp.task('style-lint', function () {

    var SRC = ['assets/src/css/**/*.css', '!assets/src/css/utility/reset.css', '!assets/src/css/vendor/*.css', '!assets/src/css/base/sprite.css'];

    return gulp.src(SRC)
        .pipe(postcss([
            // See .stylelintrc for configuration options
            require('stylelint'),
            require('postcss-reporter')({ clearMessages: true })
        ]));
});

gulp.task('css', ['style-lint'], function () {

    var SRC = 'assets/src/css/**/*.css';
    var DEST = 'assets/build/css';

    var plugins = [
        require('postcss-import'),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-simple-vars')({ silent: true }),
        require('postcss-font-magician'),
        require('lost'),
        require('autoprefixer'),
    ];

    return gulp.src([SRC])
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(changedInPlace())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(livereload())
        .pipe(gulp.dest(DEST));
});

gulp.task('css-clean', function () {

    var paths = [
        './assets/build/css/**/*',
        '!./assets/build/css/main.css',
        '!./assets/build/css/maps',
        '!./assets/build/css/maps/**',
        '!./assets/build/css/maps/**/*.map'
    ];

    return del(paths);

});

gulp.task('css-optimize', function () {

    return gulp.src(['assets/build/css/*.css'])
        .pipe(nano())
        .pipe(gulp.dest('./assets/build/css/'));

});
