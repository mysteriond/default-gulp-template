// --------------------------------------------------------------------
// Task: Fonts
// --------------------------------------------------------------------
var 
    gulp     = require('gulp'),
    config   = require('../config');

gulp.task('fonts', function() {
    return gulp.src([config.src.fonts])
        .pipe(gulp.dest(config.dist.fonts));
});