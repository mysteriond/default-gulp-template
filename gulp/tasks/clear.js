// --------------------------------------------------------------------
// Clear Tasks
// --------------------------------------------------------------------
var 
    gulp    = require('gulp'),
    config  = require('../config'),
    del     = require('del'),
    cache   = require('gulp-cache');

gulp.task('clear', function(){
    return del(config.dist.base);
});

gulp.task('clear:libs', function(){
    return del(config.libs.base);
});

gulp.task('clear:cache', function(done) {
    return cache.clearAll(done);
});

gulp.task('clear:fonts', function(){
    return del(config.dist.fonts);
});

gulp.task('clear:images', function(){
    return del([config.dist.images]);
});

gulp.task('clear:js', function(){
    return del([config.dist.js]);
});

gulp.task('clear:css', function(){
    return del([config.dist.css]);
});

