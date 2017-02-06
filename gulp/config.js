// --------------------------------------------------------------------
// Gulp Paths and Settings
// --------------------------------------------------------------------
module.exports = {
    src: {
        html: 'src/html/*.html',
        templates: 'src/html/templates/*.html',
        sassDir: 'src/sass/',
        sass: 'src/sass/**/*.+(scss|sass)',
        js: 'src/js/**/*.js',
        images: 'src/images/*.*',
        sprites: 'src/sprites/*.*',
        fonts: 'src/fonts/*.*'
    },
    dist: {
        base: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        images: 'dist/images/',
        fonts: 'dist/fonts/',
    },
    output: {
        cssLibs: 'libs.css',
        cssMain: 'main.css',
        jsLibs: 'libs.js',
        jsMain: 'main.js',
        sprite: '../images/sprite.png'
    },
    libs: {
        base: 'src/libs/',
        js: 'src/libs/**/*.js',
        css: 'src/libs/**/*.css',
        sass: 'src/libs/**/*.+(scss|sass)',
        fonts: 'src/libs/**/fonts/**/*.*'
    },
    include: {
        headJs: [
            'dist/js/*.js',
            '!dist/js/main*.js'
        ],
        headCss: 'dist/css/*.css',
        js: 'dist/js/main.js'
    },
    webserver: {
        browser: 'chromium',
        open: false,
        server: './dist',
        port: 8080,
        //https: true,
        //logLevel: 'debug',
        //logConnections: true,
        logFileChanges: false,
        notify: false
        //tunnel: true
    }
}
