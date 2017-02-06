// --------------------------------------------------------------------
// Task: Html
// --------------------------------------------------------------------
var
    gulp   =   require('gulp'),
    config =   require('../config'),
    inject =   require('gulp-inject'),
    order  =   require('gulp-order'),
    prettify = require('gulp-html-prettify');

gulp.task('html', function() {

    var option = {
        removeTags: true,
        addRootSlash: false,
        starttag: '<!-- inject:{{ext}}',
        endtag: ' -->',
        
        transform: function(filePath, file) {  
            var distPath = filePath.replace( config.dist.base, '' );
            var ext = filePath.split('.').pop();
            switch (ext) {
                case 'html': return file.contents.toString('utf8');
                case 'js'  : return '<script src="' + distPath + '"></script>';     
                case 'css' : return '<link href="' + distPath +'" rel="stylesheet">';        
                default: return '';
            }
        }
    }

    var includeOption = Object.assign({}, option, {
        relative: true,
        starttag: '<!-- inject:{{path}}'
    });

    var headOption = Object.assign({}, option, {
        starttag: '<!-- inject:head:{{ext}}'
    });
    
    var headCss = gulp.src(config.include.headCss, { read: false })
        .pipe(order([ "**/libs.min.css", "*"]));

    var headJs = gulp.src(config.include.headJs, { read: false })
        .pipe(order([ "**/jquery.min.js", "**/angular.min.js", "**/libs*.js", "*"]));

    return gulp.src(config.src.html)
        
        .pipe(inject( gulp.src(config.src.templates), includeOption ))
        .pipe(inject( headCss, headOption ))
        .pipe(inject( headJs, headOption ))
        .pipe(inject( gulp.src(config.include.js, { read: false }), option))
        
        .pipe(prettify({ indent_char: ' ', indent_size: 4 }))
        .pipe(gulp.dest(config.dist.base))
});
