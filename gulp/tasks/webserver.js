// --------------------------------------------------------------------
// Task: Webserver
// --------------------------------------------------------------------
var 
    gulp         = require('gulp'),
    config       = require('../config'),
    browserSync  = require('browser-sync');

gulp.task('webserver', function() {
    console.log('START SERVER');
    browserSync(config.webserver);
});