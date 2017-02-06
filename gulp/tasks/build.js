// --------------------------------------------------------------------
// Task: Build
// --------------------------------------------------------------------
var
    gulp = require('gulp'),
    config  = require('../config'),
    runSequence = require('run-sequence');

gulp.task('build', ['clear'], function() {
    runSequence(['libs', 'scripts', 'sass', 'fonts', 'images', 'sprites'], 'html');
});