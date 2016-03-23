'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', () => {
    nodemon({
        script: './bin/www',
        ignore: ['gulp/**/*', 'public/**/*'],
        ext: 'js',
        delay: 5,
        env: {'NODE_ENV': 'development'}
    })
});