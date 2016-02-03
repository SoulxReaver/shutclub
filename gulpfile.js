var del = require('del');
var join = require('path').join;

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var inlineNg2Template = require('gulp-inline-ng2-template');
var tsProject = tsc.createProject('tsconfig.json');
var runSequence = require('run-sequence');

var PUBLIC_DIR = 'public';
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
/** Clean **/
gulp.task('clean.public', function (done) {
    cleanDir(join(APP_DEST, 'public', '**/*'), done);
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

/** build task **/
gulp.task('build.public', function (done) {
    runSequence(
        'clean.public',
        ['copy.public.libs', 'copy.public.assets'],
        'compile-ts',
        done
    );
});

gulp.task('ts-lint', function() {
    return gulp.src(config.ts)
        .pipe(tslint())
        .pipe(tslint.report('pose', {
            emitError: false
        }))
})

gulp.task('compile-ts', function () {

    var tsResult = gulp.src([join(PUBLIC_DIR, '**/*.ts')])
        .pipe(inlineNg2Template( {
            base: '/public/app',
            html: true,
            css: true,
            indent: 0
        }))
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject[PUBLIC_DIR]));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(join(APP_DEST, PUBLIC_DIR)));
});

/** Helpers **/

function cleanDir(dir, done) {
    del(dir).then(function () {
        done();
    });
}
