var gulp = require('gulp');
var gulpCopy = require('gulp-copy');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');

gulp.task('watchServer', function() {
    gulp.watch('./express/src/**/*', ['views', 'express']);
});

gulp.task('express', function() {
    return gulp.src('./express/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./express/build'));
});

gulp.task('views', function() {
    return gulp.src('./express/src/views/**/*.jade')
        .pipe(gulpCopy('./express/build', {prefix: 2}));
});

gulp.task('start', function() {
    nodemon({
        script: './bin/www',
        ignore: ['./express/src/**/*', './gulp/**/*', './public/**/*'],
        ext: 'js',
        delay: 5,
        env: {'NODE_ENV': 'development'}
    })
});