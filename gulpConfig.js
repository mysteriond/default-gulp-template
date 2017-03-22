// --------------------------------------------------------------------
// Gulp Paths and Settings
// --------------------------------------------------------------------
module.exports = {
    bowerDir: './bower_components',
    npmDir: './node_modules',
    sassDir: './src/sass/',
    src: {
        html: './src/html/**/*.html',
        pages: './src/html/*.html',
        customSass: './src/sass/**/*.+(scss|sass)',
        vendorSass: './src/vendor/**/*.+(scss|sass)',
        customJs: './src/js/**/[^_]*.js',
        vendorJs: '/src/vendor/**/[^_]*.js',
        images: './src/images/*.*',
        sprites: './src/sprites/*.*',
        fonts: ['./src/fonts/*.*', 'bower_components/**/fonts/**/*.*'],
        json: './src/json/*.json'
    },
    dist: {
        base: './dist/',
        js: './dist/js/',
        css: './dist/css/',
        images: './dist/images/',
        fonts: './dist/fonts/',
    },
    sprite: {
        tpl: 'spritesmith.css.tpl',
        name: 'sprite.png',
        path: '../images/sprite.png'
    },
    webserver: {
        open: false,
        server: './dist',
        port: 8080,
        logFileChanges: false,
        logConnections: false,
        notify: false
        //browser: 'chromium',
        //logLevel: 'debug',
        //https: true,
        //tunnel: true
    }
}
