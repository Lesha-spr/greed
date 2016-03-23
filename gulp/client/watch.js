'use strict';

const gulp = require('gulp');

gulp.task('watch:client', () => {
    gulp.watch('./public/src/images/**/*', ['copy']);
    gulp.watch('./public/src/**/*.scss', ['sass']);
    gulp.watch('./public/src/**/*.js*', ['compress']);
});