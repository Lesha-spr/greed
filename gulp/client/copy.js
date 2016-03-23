'use strict';

const gulp = require('gulp');
const flatten = require('gulp-flatten');

gulp.task('copy', () => {
    return gulp.src(['./public/src/images/**/*', './public/src/typography/**/*', '!./public/src/typography/**/*.scss'])
        .pipe(flatten({ includeParents: -1}))
        .pipe(gulp.dest('./public/build/', {prefix: 2}));
});