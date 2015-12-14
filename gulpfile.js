var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpCopy = require('gulp-copy');

gulp.task('sass', function() {
    gulp.src('public/src/app.scss')
        .pipe(inject(gulp.src(['./components/**/*.scss'], {read: false, cwd: 'public/src/'}), {
            starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('compress', function() {
    var b = browserify('public/src/app.jsx').transform('babelify', {presets: ['es2015', 'react']});

    return b.bundle()
        .pipe(source('./app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/build'));
});

gulp.task('copy', function() {
    return gulp.src('./public/src/images/**/*')
        .pipe(gulpCopy('./public/build', {prefix: 2}));
});

gulp.task('watch', function() {
    gulp.watch('./public/src/images/**/*', ['copy']);
    gulp.watch('./public/src/**/*.scss', ['sass']);
    gulp.watch('./public/src/**/*.js*', ['compress']);
});

gulp.task('build', ['copy', 'sass', 'compress']);
gulp.task('default', ['copy', 'sass', 'compress', 'watch']);