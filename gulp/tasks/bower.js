// --------------------------------------------------------------------
// Task: Bower Libs
// --------------------------------------------------------------------
var 
    gulp    = require('gulp'),
    config  = require('../config'),
    bower   = require('../bowerConfig'),
    rename  = require('gulp-rename'),
    merge   = require('merge-stream'),
    fs      = require('fs');

gulp.task('bower', ['clear:libs'], function(){
    var bowerJSON = JSON.parse(fs.readFileSync('./bower.json'));
    var bowerLibs = bower.libs.filter(function(item){
        return (item.name in bowerJSON.dependencies);
    });
    return merge(bowerLibs.map(function (lib) {
        if (!Array.isArray(lib.files)) {
            lib.files = [lib.files];
        }
        var bowerSrc = lib.files.map(function (part) {
            return [bower.base, lib.name, part].join('/');
        });
        return gulp.src(bowerSrc)
            .pipe(rename(function (path) {
                path.dirname = (path.dirname !== '.') ? ( [lib.name, path.dirname].join('/') ) : lib.name;
            }));
    })).pipe(gulp.dest(config.libs.base));
});