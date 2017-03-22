const
    config       = require('./gulpConfig'),
    path         = require('path'),
    fs           = require('fs'),
    glob         = require('glob'),
    gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    cleanCSS     = require('gulp-clean-css')
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    changed      = require('gulp-changed'),
    jshint       = require('gulp-jshint'),
    stylish      = require('jshint-stylish'),
    include      = require('gulp-include'),
    ejs          = require('gulp-ejs'),
    nunjucks     = require('gulp-nunjucks'),
    prettify     = require('gulp-jsbeautifier'),
    uglify       = require('gulp-uglify'),
    cache        = require('gulp-cache')
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    spritesmith  = require('gulp.spritesmith'),
    merge        = require('merge-stream'),
    del          = require('del'),
    runSequence  = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src(config.src.customSass)
        .pipe(changed(config.dist.css, {extension: '.css'}))
        .pipe(sass({
            sourceComments: false,
            outputStyle: 'expanded',
            includePaths: [ config.src.customSass, config.bowerDir ]
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 10', 'android 4']))
        .pipe(gulp.dest(config.dist.css))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('vendor:sass', function(){
    return gulp.src(config.src.vendorSass)
        .pipe(changed(config.dist.css, {extension: '.css'}))
        .pipe(sass({
            sourceComments: false,
            includePaths: [ config.src.vendorSass, config.src.customSass, config.bowerDir ]
        }))
        .on('error', sass.logError)
        .pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 10', 'android 4']))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dist.css))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src(config.src.customJs)
        .pipe(changed(config.dist.js, {extension: '.js'}))
        .pipe(include({
            extensions: "js",
            hardFail: true
        }))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish', {beep: false}))
        .pipe(gulp.dest(config.dist.js));
});

gulp.task('vendor:js', function() {
    return gulp.src(config.src.vendorJs)
        .pipe(changed(config.dist.js, {extension: '.js'}))
        .pipe(include({
            extensions: "js",
            hardFail: true,
            includePaths: [
                config.bowerDir,
                config.npmDir
            ]
        }))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(gulp.dest(config.dist.js));
});

gulp.task('fonts', function() {
    return gulp.src(config.src.fonts)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dist.fonts));
});

gulp.task('images', function() {
    return gulp.src(config.src.images)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(config.dist.images));
});

gulp.task('sprites', function() {
    var spriteData = 
        gulp.src(config.src.sprites)
            .pipe(spritesmith({
                imgName: config.sprite.name,
                imgPath: config.sprite.path,
                cssTemplate: config.sprite.tpl,
                cssName: '_sprite.scss',
                algorithm: 'binary-tree',
                padding: 3,
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));
    var spriteImg = spriteData.img
        .pipe(gulp.dest(config.dist.images));

    var spriteCss = spriteData.css
        .pipe(gulp.dest(config.sassDir));

    return merge(spriteImg, spriteCss);
});

gulp.task('html', function(){
    var json = glob.sync(config.src.json),
        jsonData = {};

    json.forEach(function(item){
        var name = path.basename(item, '.json').toLowerCase();
        var data = JSON.parse(fs.readFileSync(item, 'utf8'));
        jsonData[name] = data;
    });

    return gulp.src(config.src.pages)
        .pipe(nunjucks.compile(jsonData))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(prettify({
            indent_char: ' ',
            indent_size: 4,
            preserve_newlines: false,
            max_preserve_newlines: 0
        }))
        .pipe(gulp.dest(config.dist.base));
});

gulp.task('clean:cache', function(done) {
    return cache.clearAll(done);
});

gulp.task('clean', function(){
    return del.sync(config.dist.base);
});

gulp.task('build', function(done) {
    runSequence(
        'clean', 
        ['sass', 'js', 'vendor:js', 'vendor:sass', 'fonts', 'images', 'sprites'],
        'html',
        done
    );
});

gulp.task('server', ['build'], function() {
    console.log('START SERVER');
    browserSync(config.webserver);
});

gulp.task('watch', ['server'], function() {
    
    gulp.watch(config.src.customSass, ['sass']);

    gulp.watch(config.src.vendorSass, ['vendor:sass']);

    gulp.watch(config.src.customJs).on('change', function(){
        runSequence('js', browserSync.reload);
    });

    gulp.watch(config.src.vendorJs).on('change', function(){
        runSequence('vendor:js', browserSync.reload);
    });
    
    gulp.watch(config.src.images).on('change', function(){
         runSequence('images', browserSync.reload);
    });

    gulp.watch(config.src.sprites).on('change', function(){
         runSequence('sprites', browserSync.reload);
    });
    
    gulp.watch(config.src.html).on('change', function() {
        runSequence('html', browserSync.reload);
    });
    
});

// Set default task
require('gulp').task('default', ['watch']);
