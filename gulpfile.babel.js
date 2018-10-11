import browserify from 'browserify';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpBatch from 'gulp-batch';
import gulpBuffer from 'gulp-buffer';
import gulpClean from 'gulp-clean';
import gulpTap from 'gulp-tap';
import gulpUglify from 'gulp-uglify';
import gulpWatch from 'gulp-watch';

import {
    exportedName
} from './gulpfile.config';

const cleanBundledFolder = () => gulp.src(
    'bundled/*',
    {
        read: false
    }
).pipe(
    gulpClean()
);

const cleanDistributedFolder = () => gulp.src(
    'distributed/*',
    {
        read: false
    }
).pipe(
    gulpClean()
);

const cleanMinifiedFolder = () => gulp.src(
    'minified/*',
    {
        read: false
    }
).pipe(
    gulpClean()
);

const cleanTranspiledFolder = () => gulp.src(
    'transpiled/*',
    {
        read: false
    }
).pipe(
    gulpClean()
);

const copyFilesFromAssetsToTranspiled = () => gulp.src(
    'assets/**/*'
).pipe(
    gulp.dest('transpiled')
);

const copyFilesFromBundledToMinified = () => gulp.src(
    'bundled/**/*'
).pipe(
    gulp.dest('minified')
);

const copyFilesFromMinifiedToDistributed = () => gulp.src(
    'minified/**/*'
).pipe(
    gulp.dest('distributed')
);

const copyFilesFromTranspiledToBundled = () => gulp.src(
    'transpiled/**/*'
).pipe(
    gulp.dest('bundled')
);

const promoteToBundled = gulp.series(
    cleanBundledFolder,
    copyFilesFromTranspiledToBundled
);

const promoteToDistributed = gulp.series(
    cleanDistributedFolder,
    copyFilesFromMinifiedToDistributed
);

const promoteToMinified = gulp.series(
    cleanMinifiedFolder,
    copyFilesFromBundledToMinified
);

const promoteToTranspiled = gulp.series(
    cleanTranspiledFolder,
    copyFilesFromAssetsToTranspiled
);

const bundleJavaScriptFiles = () => gulp.src(
    [
        'transpiled/**/*.js',
        '!transpiled/**/examples*/',
        '!transpiled/**/examples*/**/*'
    ],
    {
        read: false
    }
).pipe(
    gulpTap((source) => {
        source.contents = browserify(
            source.path,
            {
                standalone: exportedName,
                node: true
            }
        ).bundle();
    })
).pipe(
    gulpBuffer()
).pipe(
    gulp.dest('bundled')
);

const minifyJavaScriptFiles = () => gulp.src(
    [
        'bundled/**/*.js',
        '!bundled/**/examples*/',
        '!bundled/**/examples*/**/*'
    ]
).pipe(
    gulpUglify()
).pipe(
    gulp.dest('minified')
);

const transpileJavaScriptFiles = () => gulp.src(
    [
        'assets/**/*.js',
        '!assets/**/examples*/',
        '!assets/**/examples*/**/*'
    ]
).pipe(
    gulpBabel({
        presets: ['@babel/preset-env']
    })
).pipe(
    gulp.dest('transpiled')
);

const bundle = (done) => gulp.series(
    promoteToBundled,
    bundleJavaScriptFiles
)(done);

const distribute = (done) => gulp.series(
    promoteToDistributed
)(done);

const minify = (done) => gulp.series(
    promoteToMinified,
    minifyJavaScriptFiles
)(done);

const transpile = (done) => gulp.series(
    promoteToTranspiled,
    transpileJavaScriptFiles
)(done);

const buildForDevelopment = (done) => gulp.series(
    transpile,
    bundle
)(done);

const buildForProduction = (done) => gulp.series(
    transpile,
    bundle,
    minify,
    distribute
)(done);

const buildForTesting = (done) => gulp.series(
    transpile,
    bundle,
    minify,
)(done);

const watchForDevelopment = (done) => gulp.series(
    watcher(buildForDevelopment)
)(done);

const watchForProduction = (done) => gulp.series(
    watcher(buildForProduction)
)(done);

const watchForTesting = (done) => gulp.series(
    watcher(buildForTesting)
)(done);

const watcher = (action) => function watch() {
    gulpWatch(
        'assets/**/*',
        gulpBatch((
            events,
            done
        ) => {
            action(done);
        })
    );
};

gulp.task(
    'build-for-development',
    buildForDevelopment
);

gulp.task(
    'build-for-production',
    buildForProduction
);

gulp.task(
    'build-for-testing',
    buildForTesting
);

gulp.task(
    'watch-for-development',
    watchForDevelopment
);

gulp.task(
    'watch-for-production',
    watchForProduction
);

gulp.task(
    'watch-for-testing',
    watchForTesting
);