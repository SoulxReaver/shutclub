var del = require('del');
var join = require('path').join;

/** Build Deps **/
var ts = require('typescript');
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var tsd = require('gulp-tsd');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;

/** Configuration **/
var PUBLIC_DIR = 'public';
var SERVER_DIR = 'server';
var TYPINGS_DIR = 'typings';
var APP_DEST = 'dist';

var LIBS = [
    './public/libs/**',
    './node_modules/es6-shim/es6-shim.min.js',
    './node_modules/es6-shim/es6-shim.map',
    './node_modules/systemjs/dist/system.js',
    './node_modules/systemjs/dist/system-polyfills.js',
    './node_modules/systemjs-plugin-css/css.js',
    './node_modules/angular2/bundles/angular2.dev.js',
    './node_modules/angular2/bundles/angular2-polyfills.js',
    './node_modules/angular2/bundles/router.dev.js',
    './node_modules/angular2/bundles/http.dev.js',
    './node_modules/rxjs/bundles/Rx.min.js',
    './node_modules/rxjs/bundles/Rx.min.js.map'
];

/** Install Tasks **/
gulp.task('install.typings', ['clean.typings'], function (next) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, next);
});

gulp.task('postinstall', function (done) {
    runSequence('install.typings', done);
});

/** Clean Tasks **/
gulp.task('clean.target', function (done) {
    cleanDir(join(APP_DEST, '**/*'), done)
});

gulp.task('clean.public', function (done) {
    cleanDir(join(APP_DEST, 'public', '**/*'), done);
});

gulp.task('clean.typings', function (done) {
    cleanDir(join(TYPINGS_DIR, 'tsd', '**/*'), done);
});

/** Build Tasks **/

gulp.task('build.public.js', function () {
    return buildTypescript(PUBLIC_DIR);
});

gulp.task('build.server.js', function () {
    return buildTypescript(SERVER_DIR);
});

/** Copy Tasks **/

gulp.task('copy.public.libs', function () {
    return gulp.src(LIBS)
        .pipe(gulp.dest(join(APP_DEST, PUBLIC_DIR, 'libs')));
});

gulp.task('copy.public.assets', function () {
    return gulp.src([
            join(PUBLIC_DIR, 'index.html'),
            join(PUBLIC_DIR, 'index.css')
        ])
        .pipe(gulp.dest(join(APP_DEST, PUBLIC_DIR)));
});

gulp.task('copy.server.assets', function () {
    return gulp.src(join(SERVER_DIR, '**/*.json'))
        .pipe(gulp.dest(join(APP_DEST, SERVER_DIR)));
});

// A build of the public folder only.
// Intended for live reload on local server

gulp.task('build.public.dev', function (done) {
    runSequence(
        'clean.public',
        ['copy.public.libs', 'copy.public.assets'],
        'build.public.js',
        done
    );
});

// A build designed for running locally.
// Binds to port 3000
gulp.task('build', function (done) {
    runSequence(
        'clean.target',
        ['copy.public.libs', 'copy.public.assets', 'copy.server.assets'],
        'build.public.js',
        'build.server.js',
        done
    );
});

/** Lint Tasks **/
gulp.task('lint.public', function () {
    return gulp.src([
            join(PUBLIC_DIR, '**', '*.ts')
        ])
        .pipe(tslint());
});

gulp.task('lint', function () {
    return gulp.src([
            join(PUBLIC_DIR, '**', '*.ts'),
            join(SERVER_DIR, '**', '*.ts')
        ])
        .pipe(tslint());
});

/** Serve Tasks **/

gulp.task('serve', ['watch.public', 'build', 'lint'], function () {
    var cd = 'cd ' + join(APP_DEST);
    var serve = 'node ' + join(SERVER_DIR, 'server');
    execChildProcess([cd, serve]);
});

gulp.task('default', ['postinstall', 'start'], function() {});

gulp.task('start', ['serve']);

/** Watch Tasks **/

gulp.task('watch.public', ['build'], function () {
    gulp.watch(join(PUBLIC_DIR, '**/*'), ['build.public', 'lint.public']);
});

/** Helpers **/

function cleanDir(dir, done) {
    del(dir).then(function () {
        done();
    });
}

function execChildProcess(cmd) {
    if (Object.prototype.toString.call(cmd) === '[object Array]') {
        cmd = cmd.join(' && ');
    }

    var childProcess = exec(cmd);

    childProcess.stdout.on('data', function (data) {
        console.log(data.toString());
    });
}

function buildTypescript(dir) {

    var result = gulp.src([join(dir, '**/*.ts')])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsc.createProject('tsconfig.json', { typescript: ts })));

    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join(APP_DEST, dir)));

};