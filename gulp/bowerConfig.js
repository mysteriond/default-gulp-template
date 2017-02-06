// --------------------------------------------------------------------
// Bower Paths
// --------------------------------------------------------------------
module.exports = {
    base: './bower_components',
    libs: [
        {
            name: 'jquery',
            files: 'jquery.min.js'
        }, {
            name: 'bootstrap-sass',
            files: [
                'assets/**/fonts/bootstrap/*.*',
                'assets/javascripts/bootstrap.min.js',
                'assets/stylesheets/_bootstrap.scss',
                'assets/stylesheets/**/bootstrap/*.scss',
                'assets/stylesheets/**/bootstrap/mixins/*.scss'
            ]
        }, {
            name: 'bootstrap',
            files: [
                'dist/css/bootstrap.min.css',
                'dist/js/bootstrap.min.js',
                'dist/**/fonts/*.*'
            ]
        }, {
            name: 'reset-css',
            files: 'reset.css'
        }, {
            name: 'normalize-css',
            files: 'normalize.css'     
        }, {
            name: 'respond',
            files: 'dest/respond.min.js'  
        }, {
            name: 'es5-shim',
            files: 'es5-shim.min.js'  
        }, {
            name: 'html5shiv',
            files: 'dist/html5shiv.min.js'  
        }, {
            name: 'angular',
            files: 'angular.min.js'  
        }, {
            name: 'angular-animate',
            files: 'angular-animate.min.js'  
        }, {
            name: 'angular-sanitize',
            files: 'angular-sanitize.min.js'  
        }, {
            name: 'angular-touch',
            files: 'angular-touch.min.js'  
        }, {
            name: 'angular-bootstrap',
            files: 'ui-bootstrap-tpls.js'  
        }
    ]
}