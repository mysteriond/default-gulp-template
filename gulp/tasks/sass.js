// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------
var 
    gulp         = require('gulp'),
    config       = require('../config'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src(config.src.sass)
        .pipe(sass({
            sourceComments: false,
            outputStyle: 'expanded'
        })).on('error', sass.logError)
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 9', 'android 4']))
        .pipe(concat(config.output.cssMain))
        .pipe(gulp.dest(config.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});
