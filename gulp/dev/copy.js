var gulp = require('gulp');
var gulpCopy = require('gulp-copy');

gulp.task('copy', function() {
    return gulp.src('./public/src/images/**/*')
        .pipe(gulpCopy('./public/build', {prefix: 2}));
});