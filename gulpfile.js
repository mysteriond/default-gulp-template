'use strict';
var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    merge = require('merge-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    notify = require('gulp-notify'),
    stripComments = require('gulp-strip-css-comments'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    prettify = require('gulp-html-prettify'),
    order = require('gulp-order'),
    spritesmith = require('gulp.spritesmith'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    mainBowerFiles = require('main-bower-files'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    app: {
        html: 'app/*.html',
        templates: 'app/templates/**/*.html',
        sassPath: 'app/sass',
        sass: 'app/sass/*.+(scss|sass)',
        js: 'app/js/*.js',
        img: 'app/img/**/*.*',
        sprites: 'app/img/sprites/*.*',
        fonts: 'app/fonts/*.*',
    },
    dist: {
        base: 'dist',
        js: 'dist/js',
        jsLibs: 'dist/js/libs',
        css: 'dist/css',
        fonts: 'dist/fonts',
        img: 'dist/img'
    }
}

var syncConf = {
    server: {
        baseDir: './dist'
    },
    tunnel: true,
    online: true,
    notify: false,
    browser: 'chromium',
    host: 'localhost',
    logPrefix: "Test project",
    port: 8080
}

gulp.task('webserver', function() {
    browserSync(syncConf);
});

gulp.task('clear', function(done) {
    return cache.clearAll(done);
});

gulp.task('bower:styles', function() {
    var styles = gulp.src(mainBowerFiles('**/[^_]*.+(css|scss|sass)'));
    var bowerCss = styles.pipe(filter('**/*.css'));
    var bowerSass = styles.pipe(filter('**/*.+(sass|scss)'))
        .pipe(sass({
            'sourceComments': false
        })).on('error', sass.logError)
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 9', 'android 4']));

    return merge(bowerCss, bowerSass)
        .pipe(order([
            "**/reset.css",
            "**/normalize.css",
            "*"
        ]))
        .pipe(concat('libs.min.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(path.dist.css))
});

gulp.task('bower:scripts', function() {
    var concatFilter = filter([
        '**',
        '!**/jquery*.js',
        '!**/angular*.js',
        '!**/respond.min.js',
        '!**/html5shiv.min.js',
        '!**/es5-shim.min.js'
    ], { restore: true });
    return gulp.src(mainBowerFiles('**/[^_]*.js'), {
            base: 'bower_components'
        })
        .pipe(concatFilter)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(concatFilter.restore)
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(path.dist.jsLibs))
});

gulp.task('bower:fonts', function() {
    var fonts = [
        '**/fonts/*.*',
        '**/*.+(woff|woff2|eot|ttf)'
    ];
    return gulp.src(mainBowerFiles(fonts))
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('bower:build', ['bower:scripts', 'bower:styles', 'bower:fonts']);

gulp.task('sass', function() {
    return gulp.src(path.app.sass)
        .pipe(sass({
            sourceComments: false,
            outputStyle: 'extended'
        })).on('error', sass.logError)
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 9', 'android 4']))
        .pipe(stripComments())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'Sass task complete', onLast: true }));
});

gulp.task('js', function() {
    return gulp.src(path.app.js)
        .pipe(gulp.dest(path.dist.js))
        .pipe(notify({
            message: 'Js task complete',
            onLast: true
        }));
});

gulp.task('images', function() {
    return gulp.src([path.app.img, '!' + path.app.sprites])
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts', function() {
    return gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('sprites', function() {
    var spriteData = gulp.src(path.app.sprites)
        .pipe(spritesmith({
            imgName: '../img/sprite.png',
            cssName: '_sprite.scss',
            algorithm: 'binary-tree',
            padding: 3,
            cssVarMap: function(sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));
    spriteData.img.pipe(gulp.dest(path.dist.img));
    spriteData.css.pipe(gulp.dest(path.app.sassPath));
});

gulp.task('html', function() {
    
    var option = {
        removeTags: true,
        addRootSlash: false,
        transform: function(filePath, file) {
            
            var distPath = filePath.replace( path.dist.base + '/', '' );
            var ext = filePath.split('.').pop();
            switch (ext) {
                case 'html': return file.contents.toString('utf8');
                case 'js'  : return '<script src="' + distPath + '"></script>';     
                case 'css' : return '<link href="' + distPath +'" rel="stylesheet">';        
                case 'ico' : return '<link rel="shortcut icon" type="image/x-icon" href="' + distPath + '">'; 
                default: return '';
            }
        }
    }

    var includeOption = Object.assign({}, option, {
        relative: true,
        starttag: '<!-- inject:{{path}} -->'
    });

    var faviconOption = Object.assign({}, option, {
        starttag: '<!-- inject:favicon -->'
    });

    var headOption = Object.assign({}, option, {
        name: 'inject:head'
    });
    
    var headSrc = gulp.src([
        path.dist.css + '/*.css',
        path.dist.jsLibs + '/+(jquery|angular|libs)*.js'
    ], { read: false })
    .pipe(order([
        "**/libs*.css",
        "**/*.css",
        "**/jquery*.js",
        "**/angular*.js",
        "**/libs*.js"
    ]));        
    
    return gulp.src(path.app.html)
        .pipe(inject( gulp.src(path.app.templates), includeOption ))
        .pipe(inject( gulp.src(path.dist.img + '/favicon/*.*'), faviconOption ))
        .pipe(inject( headSrc, headOption ))
        .pipe(inject( gulp.src(path.dist.js + '/*.js'), option))
        .pipe(prettify({ indent_char: ' ', indent_size: 4 }))
        .pipe(gulp.dest(path.dist.base))
        .pipe(notify({ message: 'Html task complete', onLast: true }));

});

gulp.task('clearBower', function() {
    return del([
        path.dist.css + '/libs.min.css',
        path.dist.jsLibs
    ]);
});

gulp.task('clearJs', function() {
    return del([path.dist.js + '/*', '!' + path.dist.jsLibs]);
});

gulp.task('clearCss', function() {
    return del([path.dist.css + '/*', '!' + path.dist.css + '/libs.min.css']);
});

gulp.task('clearFonts', function() {
    return del(path.dist.fonts);
});

gulp.task('clearAll', function() {
    return del(path.dist.base);
});

gulp.task('build', function(done) {
    return runSequence('clearAll', ['bower:build', 'js', 'images', 'sprites', 'fonts'], 'sass', 'html', done);
});

gulp.task('watch', function() {

    return runSequence('build', 'webserver', function() {

        gulp.watch('bower.json', function() {
            runSequence(
                ['clearBower', 'clearFonts'], ['bower:build', 'fonts'],
                'html', reload
            );
        });

        gulp.watch(path.app.js, function() {
            runSequence('clearJs', 'js', reload);
        });

        gulp.watch(path.app.fonts, function() {
            runSequence('clearFonts', ['bower:fonts', 'fonts'], reload);
        });

        gulp.watch([path.app.templates, path.app.html]).on('change', function() {
            runSequence('html', reload);
        });

        gulp.watch(path.app.sprites).on('change', function() {
            runSequence('sprites');
        });

        gulp.watch(path.app.img).on('change', function() {
            runSequence('images');
        });

        gulp.watch(path.app.sass).on('change', function() {
            runSequence('clearCss', 'sass');
        });

    });

});

gulp.task('default', ['watch']);