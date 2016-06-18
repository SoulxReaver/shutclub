var del = require('del');
var join = require('path').join;

/** Build Deps **/
var ts = require('typescript');
var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

/** Configuration **/
var PUBLIC_DIR = 'public';
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

/** Build Tasks **/

gulp.task('build.public.js', function () {
    return buildTypescript(PUBLIC_DIR);
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
            join(PUBLIC_DIR, '**/*.json'),
        ])
        .pipe(gulp.dest(join(APP_DEST, PUBLIC_DIR)));
});

// A build designed for running locally.
// Binds to port 3000
gulp.task('build', function (done) {
    runSequence(
        'clean.target',
        ['copy.public.libs', 'copy.public.assets', 'copy.public.node_modules'],
        'build.public.js',
        done
    );
});

gulp.task('default', ['start'], function() {});

gulp.task('start', ['build']);


/** Helpers **/

function cleanDir(dir, done) {
    del(dir).then(function () {
        done();
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