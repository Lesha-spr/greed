'use strict';

const gulp = require('gulp');
const glob = require('glob');
const es = require('event-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');

gulp.task('compress', () => {
    glob('./public/src/*.jsx', (err, files) => {
        if (err) throw err;

        let tasks = files.map(entry => {
            return browserify({entries: [entry], debug: true})
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .on('error', function(err) {
                    let error = {
                        message: err.message,
                        filename: err.filename.split('/').slice(-2).join('/')
                    };

                    gutil.log(`\nerror: ${error.message}`, `\nfile: ${error.filename}`);
                    this.emit('end');
                })
                .pipe(source(entry.replace('./public/src/', '').replace('jsx', 'js')))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('public/build/'));
        });

        es.merge(tasks);
    });
});