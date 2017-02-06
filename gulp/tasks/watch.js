// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------
var
    gulp        = require('gulp'),
    config      = require('../config'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync');

gulp.task('watch', ['webserver'], function() {
    
    gulp.watch(config.src.js, function() {
        runSequence('scripts', browserSync.reload);
    });

    gulp.watch(config.src.sass, ['sass']);

    gulp.watch(config.src.fonts, function() {
        runSequence('clear:fonts', ['libs:fonts', 'fonts'], browserSync.reload);
    });

    gulp.watch(config.src.sprites, ['sprites']);
    gulp.watch(config.src.images, ['images']);

    gulp.watch([config.libs.css, config.libs.sass], function(){
        runSequence('clear:css', ['libs:styles', 'sass']);
    });

    gulp.watch(config.libs.js, function(){
        runSequence('clear:js', ['libs:js', 'scripts'], browserSync.reload);
    });

    gulp.watch(config.libs.fonts, function(){
        runSequence('clear:fonts', ['libs:fonts', 'fonts']);
    });

    gulp.watch([config.src.templates, config.src.html]).on('change', function() {
        runSequence('html', browserSync.reload);
    });
});