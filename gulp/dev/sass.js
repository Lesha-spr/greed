var gulp = require('gulp');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('public/src/**/*.scss')
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