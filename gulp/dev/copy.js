var gulp = require('gulp');
var flatten = require('gulp-flatten');

gulp.task('copy', function() {
    return gulp.src(['./public/src/images/**/*', './public/src/typography/**/*', '!./public/src/typography/**/*.scss'])
        .pipe(flatten({ includeParents: -1}))
        .pipe(gulp.dest('./public/build/', {prefix: 2}));
});