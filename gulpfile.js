var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp', {recurse: true});

gulp.task('build:client', ['copy', 'sass', 'compress']);
gulp.task('default', ['build:client', 'watch:client', 'start']);
