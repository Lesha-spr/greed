var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch('./public/src/images/**/*', ['copy']);
    gulp.watch('./public/src/**/*.scss', ['sass']);
    gulp.watch('./public/src/**/*.js*', ['compress']);
});