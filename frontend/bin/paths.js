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

function generatePaths(srcPath, outPath) {
    srcPath = srcPath || SRC_PATH;
    outPath = outPath || OUT_PATH;

    return {
        workingDir: path.resolve(__dirname, '..'),
        eslintReportOut: path.resolve(__dirname, '..', 'docs', 'eslint-report.html'),
        bundleAnalyzerReportOut: path.resolve(__dirname, '..', 'docs', 'bundle-report.html'),
        srcResources: path.resolve(__dirname, `${srcPath}/resources/**/**/*`),
        srcResourcesAssetsWatch: [
            `${srcPath}/resources/**/*`,
            `${srcPath}/resources/*.*`,
            `${srcPath}/resources`
        ],
        app: path.resolve(__dirname, `${srcPath}/app`),
        srcAppEntry: path.resolve(__dirname, `${srcPath}/app/App.jsx`),
        srcApp: [
            `${srcPath}/app/*.*`,
            `${srcPath}/app/**/*`
        ],
        out: path.resolve(__dirname, `${outPath}/`),
        outFiles: path.resolve(__dirname, `${outPath}/**/*.*`),
        outAppEntry: path.resolve(__dirname, `${outPath}/js/`),
        srcArchive: `../archive/**/*.*`,
        outArchive: `${outPath}/archive`,
        outComposerJson: path.resolve(__dirname, `${outPath}/composer.json`),
        packageJson: `../package.json`,
        srcCss: `${srcPath}/resources/css`
    };
};

module.exports = {
    generatePaths
};