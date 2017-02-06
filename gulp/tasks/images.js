// --------------------------------------------------------------------
// Task: Images
// --------------------------------------------------------------------
var 
    gulp     = require('gulp'),
    config   = require('../config'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache    = require('gulp-cache');

gulp.task('images', function() {
    return gulp.src([config.src.images])
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.dist.images));
});