var gulp = require('gulp');
var rename = require('gulp-rename');
var glob = require('glob');
var es = require('event-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');

gulp.task('compress', function() {
    glob('./public/src/*.jsx', function(err, files) {
        if(err) throw err;

        var tasks = files.map(function(entry) {
            return browserify({entries: [entry]})
                .transform('babelify', {presets: ['es2015', 'react']})
                .bundle()
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .on('error', gutil.log)
                .pipe(rename(function(path) {
                    path.dirname = '';
                    path.extname = '.js';

                    return path;
                }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('public/build/'));
        });

        es.merge(tasks);
    });
});