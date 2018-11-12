const gulp           = require('gulp');
const runSeq         = require('run-sequence');
const del            = require('del');
const plumber        = require('gulp-plumber');
const cache          = require('gulp-cached');
const webpack        = require('webpack');
const gulpWebpack    = require('webpack-stream');
const path           = require('path');
const nodemon        = require('gulp-nodemon');
const livereload     = require('gulp-livereload');
const gulpFn         = require('gulp-fn');
const spawnProcess   = require('child_process').spawn;
const fs             = require('fs');
const doT            = require('dot');
const mustache       = require("gulp-mustache");
const chmod          = require('gulp-chmod');
const gulpDebug      = require('gulp-debug');

const utilPaths      = require('./paths.js');
const utils          = require('./utils.js');
const task           = utils.task;
const configLoader   = require('./configLoader.js');

const webpackConfigCommon = require('./webpack.common.config.js');

task('compileLess', '', (callback, env) => {
    utils.compileLessFiles(env, callback);
});

task('copyResources', '', (callback, env) => {
    return gulp
      .src(utils.getPaths(env).srcResources, {dot: true})
      .pipe(utils.debug('copyResources'))
      .pipe(chmod(0o777, true))
      .pipe(gulp.dest(utils.getPaths(env).out));
});

task('clean', '', (callback, env) => {
    return del([
        utils.getPaths(env).outFiles
    ], {force: true});
});

task('clean', 'stage', () => {
    return del([
        utils.getPaths('stage').outFiles
    ], {force: true});
});

task('prepareResources', '', [
    'copyResources:{env}'
]);

task('build', '', [
    'prepareResources:{env}',
    'buildApp:{env}',
    'compileLess:{env}'
]);

task('buildAndInit', '', [
    'build:{env}'
]);

task('buildApp', '', (callback, env) => {
    return gulp.src(utils.getPaths(env).srcAppEntry)
        .pipe(utils.debug('buildApp'))
        .pipe(cache('webpack', {optimizeMemory: true}))
        .pipe(plumber())
        .pipe(gulpWebpack( webpackConfigCommon(utils.getPaths(env), env), webpack ))
        .pipe(gulp.dest(utils.getPaths(env).outAppEntry));
});

task('rebuildServerWatch', 'dev', [
    'copyResources:{env}',
    'compileLess:{env}'
]);

task('watch', '', (callback, env) => {
  livereload.listen();
  gulp.start(`buildAndInit:${env}`);
  gulp.watch(utils.getPaths(env).srcApp, { interval: 3007, dot: true }, [`buildApp:${env}`]);
  gulp.watch(utils.getPaths(env).srcResources, { dot: true }, [`rebuildServerWatch:${env}`]);
});

task('server', '', (callback, env) => {
  nodemon({
    'script': './run-server.js',
    ext: 'html'
  })
});

task('start', 'dev', (callback, env) => {
  gulp.start('server:dev', 'watch:dev');
});
