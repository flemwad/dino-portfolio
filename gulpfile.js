var gulp = require('gulp');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var del = require('del');
var debug = require('gulp-debug');
var gulpInject = require('gulp-inject');
var ngAnnotate = require('gulp-ng-annotate');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var vinylPaths = require('vinyl-paths');
var yargs = require('yargs');


/* -- BEGIN local var initializations ------------------------------------------------------------------------------- */
var gulpConfig = require('./gulp.config');

/* Process command line arguments */
var argv = yargs.config({
    dev: true,
    prod: false
}).argv;

var env = (argv.prod) ? 'prod' : 'dev';

/* Set `buildDir` */
var buildDir = gulpConfig.output[env];
console.log('build dir is: ' + buildDir);
/* -- END local var initializations --------------------------------------------------------------------------------- */


gulp.task('build:tpl', function () {
    //Note that templateCache puts them relative to location of appJS
    //so without root: 'app/' here we get e.g. 'components/answer/answer.list.template.html'
    //which is wrong
    return gulp.src(gulpConfig.appFiles.appHTML)
        .pipe(templateCache({
            module: 'dinoPortfolio'
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('build:js', ['build:tpl'], function () {

    //We exclude global validators and ctrls using them here
    //they are built with the bundle task below this
    //to include commonjs mixins
    var files = [gulpConfig.appFiles.JS]
        .concat(buildDir + gulpConfig.appFiles.tplJS);

    // If argv.prod we want to uglify & rename...
    if(argv.prod) {
        return gulp.src(files)
            .pipe(concat(gulpConfig.appFiles.appJS))
            .pipe(ngAnnotate({
                single_quotes: true,
                remove: true,
                add: true
            }))
            .on('error', notify.onError('Error: <%= error.message %>'))
            .pipe(uglify({
                mangle: false
            }))
            .on('error', notify.onError('Error: <%= error.message %>'))
            .pipe(rename(gulpConfig.appFiles.appJS))
            .pipe(debug())
            .pipe(gulp.dest(buildDir));
    }


    return gulp.src(files)
        .pipe(ngAnnotate({
            single_quotes: true,
            remove: true,
            add: true
        }))
        .pipe(concat(gulpConfig.appFiles.appJS))
        .pipe(gulp.dest(buildDir));
});


gulp.task('sass', function () {
    return gulp.src(gulpConfig.sassFiles.input)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(buildDir + gulpConfig.sassFiles.outputDir));
});

gulp.task('watch:sass', function () {
    watch(gulpConfig.sassFiles.input, {events: ['add', 'change', 'unlink']}, function () {
        runSequence('sass');
    });
});

gulp.task('copy:bower:css', function () {
    return gulp.src(gulpConfig.bowerFiles.cssLocal, {base: './bower_components/'})
        .pipe(gulp.dest(buildDir +'bower_components/'));
});

gulp.task('copy:bower', ['copy:bower:css'], function () {
    return gulp.src(gulpConfig.bowerFiles.jsLocal, {base: './bower_components/'})
        .pipe(gulp.dest(buildDir +'bower_components/'));
});

gulp.task('watch:js', ['build:js'], function () {
    //We exclude global validators here since they're built using bundle task
    watch([gulpConfig.appFiles.JS, gulpConfig.appFiles.appHTML],
        {events: ['add', 'change', 'unlink']}, function () {
            runSequence('build:js');
        });
});

gulp.task('concat:bower:js', function () {
    return gulp.src(gulpConfig.bowerFiles.jsLocal)
        .pipe(debug())
        .pipe(concat(gulpConfig.bowerFiles.bowerJS))
        .pipe(gulp.dest(buildDir))
        .pipe(rename(gulpConfig.bowerFiles.bowerJS))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('concat:bower:css', function () {
    return gulp.src(gulpConfig.bowerFiles.cssLocal)
        .pipe(concat(gulpConfig.bowerFiles.bowerCSS))
        .pipe(gulp.dest(buildDir));
});

gulp.task('inject', ['sass'], function () {
    //get the index html from root
    return gulp.src('app/index.html')
        //bower JS inject
        .pipe(
            gulpInject(gulp.src(gulpConfig.bowerFiles.jsLocal, {read: false}),
                {starttag: '<!-- inject:{{ext}}:lib -->', ignorePath: buildDir, addRootSlash: false}))
        //bower css inject
        .pipe(gulpInject(gulp.src(gulpConfig.bowerFiles.cssLocal, {read: false}),
            {starttag: '<!-- inject:{{ext}}:lib -->', ignorePath: buildDir, addRootSlash: false}))
        //app injects
        .pipe(gulpInject(gulp.src([
                buildDir + gulpConfig.appFiles.appJS
            ]),
            {starttag: '<!-- inject:{{ext}}:src -->', ignorePath: buildDir, addRootSlash: false}))
        //sass inject
        .pipe(gulpInject(gulp.src(
            buildDir + gulpConfig.sassFiles.outputDir + gulpConfig.sassFiles.outputFile, {read: false}),
            {starttag: '<!-- inject:{{ext}}:src -->', ignorePath: buildDir, addRootSlash: false}))

        .pipe(gulp.dest(buildDir));
});

gulp.task('inject:prod', ['sass'], function () {
    //get the index html from root
    return gulp.src('app/index.html')
    //bower JS inject
        .pipe(
            gulpInject(gulp.src(buildDir + gulpConfig.bowerFiles.bowerJS, {read: false}),
                {starttag: '<!-- inject:{{ext}}:lib -->', ignorePath: buildDir, addRootSlash: false}))
        //bower css inject
        .pipe(gulpInject(gulp.src(buildDir + gulpConfig.bowerFiles.bowerCSS, {read: false}),
            {starttag: '<!-- inject:{{ext}}:lib -->', ignorePath: buildDir, addRootSlash: false}))
        //app injects
        .pipe(gulpInject(gulp.src([
                buildDir + gulpConfig.appFiles.appJS
            ]),
            {starttag: '<!-- inject:{{ext}}:src -->', ignorePath: buildDir, addRootSlash: false}))
        //sass inject
        .pipe(gulpInject(gulp.src(
            buildDir + gulpConfig.sassFiles.outputDir + gulpConfig.sassFiles.outputFile, {read: false}),
            {starttag: '<!-- inject:{{ext}}:src -->', ignorePath: buildDir, addRootSlash: false}))

        .pipe(gulp.dest(buildDir));
});

gulp.task('bsync', function () {

    browserSync({
        port: 4001,
        server: {
            baseDir: buildDir
        }
    });

    //TODO - Maybe change this to watch individual file changes instead of entire compiled files for speed
    gulp.watch(buildDir + gulpConfig.appFiles.appJS).on('change', browserSync.reload);
    gulp.watch(buildDir + gulpConfig.sassFiles.outputDir + 'style.css').on('change', browserSync.reload);
});


gulp.task('copy:assets:images', function () {
    return gulp.src(gulpConfig.imageFiles.src)
        .pipe(gulp.dest(buildDir + gulpConfig.imageFiles.dest));
});

gulp.task('clean', function () {
    return gulp.src(buildDir, {read:false})
        .pipe(vinylPaths(del));
});

gulp.task('deploy', function () {
    var sequenceTasks = [
        'clean',
        'build:js',
        'concat:bower:js',
        'concat:bower:css',
        'copy:assets:images',
        'inject:prod'
    ];

    runSequence.apply(null, sequenceTasks);
});

gulp.task('default', function () {
    //Note that runSequence will call things async unless you return from them
    if (argv.dev) runSequence('clean', 'watch:js', 'watch:sass', 'copy:bower', 'copy:assets:images', 'inject', 'bsync');
    else runSequence('deploy');
});