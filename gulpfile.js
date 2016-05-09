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
    './node_modules/zone.js/dist/zone.js',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/systemjs/dist/system.src.js'
]

var NODE_MODULES = [
    './node_modules/rxjs/**/*',
    './node_modules/angular2-in-memory-web-api/**/*',
    './node_modules/@angular/**/*'
];

/** Clean Tasks **/
gulp.task('clean.target', function (done) {
    cleanDir(join(APP_DEST, '**/*'), done)
});

gulp.task('clean.public', function (done) {
    cleanDir(join(APP_DEST, 'public', '**/*'), done);
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

gulp.task('copy.public.node_modules', function () {
    return gulp.src(NODE_MODULES, {base: "node_modules"})
        .pipe(gulp.dest(join(APP_DEST, PUBLIC_DIR, 'libs')));
});

gulp.task('copy.public.assets', function () {
    return gulp.src([
            join(PUBLIC_DIR, '**/*.html'),
            join(PUBLIC_DIR, '**/*.css'),
            join(PUBLIC_DIR, '**/*.jpg'),
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
        ['copy.public.libs', 'copy.public.assets', 'copy.server.assets', 'copy.public.node_modules'],
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

gulp.task('default', ['start'], function() {});

gulp.task('start', ['serve']);

/** Watch Tasks **/

gulp.task('watch.public', ['build'], function () {
    gulp.watch(join(PUBLIC_DIR, '**/*'), ['build.public.dev', 'lint.public']);
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