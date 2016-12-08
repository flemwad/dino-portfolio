module.exports = {
    output: {
        dev: 'dist/dev/',
        prod: 'dist/prod/'
    },
    appFiles: {
        JS: 'app/**/*.js',
        appJS: 'app.js',
        tplJS: 'templates.js',
        appHTML: 'app/**/*.html'
    },
    sassFiles: {
        input: 'app/sass/**/*.scss',
        outputDir: 'assets/',
        outputFile: 'style.css'
    },
    imageFiles: {
        src: 'app/assets/img/*',
        dest: 'assets/img'
    },
    bowerFiles: {
        //Make sure a .min file is also in the same directory
        jsLocal: [
            'bower_components/angular/angular.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/moment/moment.js'
        ],
        cssLocal: [
            'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        fonts: [],
        bowerJS: 'lib.min.js',
        bowerCSS: 'min.css'
    }
};