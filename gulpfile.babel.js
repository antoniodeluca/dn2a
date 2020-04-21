import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpBatch from 'gulp-batch';
import gulpClean from 'gulp-clean';
import gulpRename from "gulp-rename";
import gulpUglify from 'gulp-uglify';
import gulpWatch from 'gulp-watch';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

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

const copyBrowserFileFromBundledToDistributed = () => gulp.src(
    'bundled/index.js'
).pipe(
    gulp.dest('distributed/browser')
);

const copyBrowserFileFromMinifiedToDistributed = () => gulp.src(
    'minified/index.js'
).pipe(
    gulpRename("index.min.js")
).pipe(
    gulp.dest('distributed/browser')
);

const copyCjsFilesFromTranspiledToDistributed = () => gulp.src(
    'transpiled/**/*.js'
).pipe(
    gulp.dest('distributed/cjs')
);

const copyEsmFilesFromAssetsToDistributed = () => gulp.src(
    'assets/**/*.js'
).pipe(
    gulp.dest('distributed/esm')
);

const promoteToBundled = gulp.series(
    cleanBundledFolder
);

const promoteToDistributed = gulp.series(
    cleanDistributedFolder,
    copyBrowserFileFromBundledToDistributed,
    copyBrowserFileFromMinifiedToDistributed,
    copyCjsFilesFromTranspiledToDistributed,
    copyEsmFilesFromAssetsToDistributed
);

const promoteToMinified = gulp.series(
    cleanMinifiedFolder
);

const promoteToTranspiled = gulp.series(
    cleanTranspiledFolder
);

const bundleJavaScriptFiles = () => gulp.src(
    [
        'transpiled/index.js'
    ]
).pipe(
    webpackStream(
        {
            mode: "production",
            optimization: {
                minimize: false
            },
            output: {
                filename: 'index.js',
                library: exportedName,
                libraryTarget: "window"
            },
            target: 'web'
        },
        webpack
    )
).pipe(
    gulp.dest('bundled')
);

const minifyJavaScriptFiles = () => gulp.src(
    [
        'bundled/index.js'
    ]
).pipe(
    gulpUglify()
).pipe(
    gulp.dest('minified')
);

const transpileJavaScriptFiles = () => gulp.src(
    [
        'assets/**/*.js'
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

const build = (done) => gulp.series(
    transpile,
    bundle,
    minify,
    distribute
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

const watch = (done) => gulp.series(
    watcher(build)
)(done);

gulp.task(
    'build',
    build
);

gulp.task(
    'watch',
    watch
);
