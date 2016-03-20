var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./gulp', {recurse: true});

gulp.task('build:client', ['copy', 'sass', 'compress']);
gulp.task('build:server', ['views', 'express']);
gulp.task('default', ['build:client', 'build:server', 'watch:client', 'watch:server', 'start']);
