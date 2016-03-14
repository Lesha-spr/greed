var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp', {recurse: true});

gulp.task('build', ['copy', 'sass', 'compress']);
gulp.task('default', ['copy', 'sass', 'compress', 'watch']);
gulp.task('app', ['build', 'views', 'express', 'watchServer', 'start']);
