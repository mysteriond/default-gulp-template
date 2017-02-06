// --------------------------------------------------------------------
// Task: Scripts
// --------------------------------------------------------------------
var 
    gulp   = require('gulp'),
    config = require('../config'),
    concat = require('gulp-concat');
    jshint = require('gulp-jshint');

gulp.task('scripts', function() {
    return gulp.src(config.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(config.output.jsMain))
        .pipe(gulp.dest(config.dist.js));
});