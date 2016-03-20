var gulp = require('gulp');

gulp.task('watch:server', function() {
    gulp.watch('./express/src/**/*', ['views', 'express']);
});