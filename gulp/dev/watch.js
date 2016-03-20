var gulp = require('gulp');

gulp.task('watch:client', function() {
    gulp.watch('./public/src/images/**/*', ['copy']);
    gulp.watch('./public/src/**/*.scss', ['sass']);
    gulp.watch('./public/src/**/*.js*', ['compress']);
});