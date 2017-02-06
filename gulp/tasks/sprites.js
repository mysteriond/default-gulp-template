// --------------------------------------------------------------------
// Task: Sprites
// --------------------------------------------------------------------
var 
    gulp        = require('gulp'),
    config      = require('../config'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sprites', function() {
    var spriteData = 
        gulp.src(config.src.sprites)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                imgPath: config.output.sprite,
                cssTemplate: './gulp/spritesmith.cssTemplate',
                cssName: '_sprite.scss',
                algorithm: 'binary-tree',
                padding: 3,
                cssVarMap: function(sprite) {
                    sprite.name = 's' + sprite.name;
                }
            }));
    spriteData.img.pipe(gulp.dest(config.dist.images));
    return spriteData.css.pipe(gulp.dest(config.src.sassDir));
});