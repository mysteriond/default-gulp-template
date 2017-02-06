// --------------------------------------------------------------------
// Task: Libs
// --------------------------------------------------------------------
var 
    gulp     = require('gulp'),
    config   = require('../config'),
    sass     = require('gulp-sass'),
    concat   = require('gulp-concat'),
    rename   = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    order    = require('gulp-order'),
    merge    = require('merge-stream');

gulp.task('libs:fonts', function() {
    return gulp.src(config.libs.fonts)
        .pipe(rename(function (path){
            path.dirname = (path.dirname.match('bootstrap')) ? 'bootstrap' : '';
        }))
        .pipe(gulp.dest(config.dist.fonts));
});

gulp.task('libs:js', function() {
    return gulp.src(config.libs.js)
        .pipe(rename( {dirname: ''} ))
        .pipe(gulp.dest(config.dist.js))
});

gulp.task('libs:styles', function() {
    var sassStyles = 
        gulp.src(config.libs.sass)
            .pipe(sass()).on('error', sass.logError);

    var cssStyles = gulp.src(config.libs.css);   

    return merge(sassStyles, cssStyles)
        .pipe(order([
            "**/reset.css",
            "**/normalize.css",
            "*"
        ])) 
        .pipe(concat(config.output.cssLibs))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min', dirname: ''}))
        .pipe(gulp.dest(config.dist.css));
});

gulp.task('libs', ['libs:fonts', 'libs:js', 'libs:styles']);