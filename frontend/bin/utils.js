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
const gulpDebug      = require('gulp-debug');


const utilPaths      = require('./paths.js');
const configLoader   = require('./configLoader.js');

const ENVS = [ 'prod', 'stage', 'dev' ];

const PATHS_CACHE = {};
const PATH_PREFIX = '../';
const DEFAULT_SRC_PATH = 'src';
const DEFAULT_OUT_PATH = 'public';

const debug = (taskName) => {
    return gulpDebug({title: `Task ${taskName}:`});
};


function getPaths(env) {
    if(PATHS_CACHE[env]) return PATHS_CACHE[env];
    const buildConfig = configLoader.loadBuildConfig(env);
    const conf = (buildConfig || {})[env] || {};
    const paths = utilPaths.generatePaths(
        PATH_PREFIX + (conf['$SRC_PATH'] || DEFAULT_SRC_PATH),
        PATH_PREFIX + (conf['$OUT_PATH'] || DEFAULT_OUT_PATH)
    );
    PATHS_CACHE[env] = paths;
    return paths;
};


function execCommand(commandString, callback, options) {

    console.log(" > "+commandString);

    let command = null;

    if(!options) {
        command = spawnProcess(commandString, {
            shell: true
        });
    } else {
        console.log(" > options: "+JSON.stringify(options));
        command = spawnProcess(commandString, [], options);
    }

    command.stdout.on('data', function (data) {
        process.stdout.write(data);
    });

    command.stderr.on('data', function (data) {
        process.stdout.write(data);
    });

    command.on('error', (err) => {
        console.log("Command failed during execution");
        console.log(err);
        setTimeout(function(){
            throw err;
        }, 0);
    });

    command.on('exit', function (code) {
        console.log("Command exited with code "+code.toString());
        if(code != 0) {
            console.log("Non-zero command exit code!");
            setTimeout(function(){
                throw "Non-zero command exit code!";
            }, 0);
        } else {
            callback();
        }
    });

};

function compileLessFile(modeName, inFile, outFile, callback) {
    execCommand(`node ../node_modules/less/bin/lessc ${inFile} ${outFile} --js`, callback);
};

function compileLessFiles(env, callback) {
    compileLessFile(
        env,
        `${getPaths(env).srcCss}/react-vertical-timeline-component.min.css`,
        `${getPaths(env).out}/css/react-vertical-timeline-component.min.css`,
        function(){
            compileLessFile(
                env,
                `${getPaths(env).srcCss}/progress-tracker.css`,
                `${getPaths(env).out}/css/progress-tracker.css`,
                function(){
                    compileLessFile(
                        env,
                        `${getPaths(env).srcCss}/rc-step.less`,
                        `${getPaths(env).out}/css/rc-step.css`,
                        function(){
                            compileLessFile(
                                env,
                                `${getPaths(env).srcCss}/react-select.less`,
                                `${getPaths(env).out}/css/react-select.css`,
                                function(){
                                    compileLessFile(
                                        env,
                                        `${getPaths(env).srcCss}/react-jsonschema-form.less`,
                                        `${getPaths(env).out}/css/react-jsonschema-form.css`,
                                        function(){
                                            compileLessFile(
                                                env,
                                                `${getPaths(env).srcCss}/antd.less`,
                                                `${getPaths(env).out}/css/antd.css`,
                                                function(){
                                                    callback();
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};

function executeTasksSeq(tasks, env, callback, supertaskNameHint) {
    return runSeq.apply(this, (tasks || []).map((t, index) => {
        if(typeof t === 'function') {
            const supertaskName = supertaskNameHint || 'anonymous-task-'+parseInt(Math.random()*100000);
            const taskName = `${supertaskName}-task-${index}`;
            console.log("Autocreate task "+taskName);
            task(taskName, env, t);
            return `${taskName}:${env}`;
        }
        return t.replace('{env}', env);
    }).concat(
        (callback)?([callback]):([])
    ));
}

function task(name, env, fn) {
    if(!env || env === 'all' || env === '*') {
        // Register for all envs
        ENVS.forEach((envName) => {
            task(name, envName || 'default', fn);
        });
    } else {
        if(!fn) {
            // Do nothing
        } else if(fn.constructor === Array) {
            gulp.task(`${name}:${env}`, (callback) => {
                return executeTasksSeq(fn, env, callback, name);
            });
        } else {
            gulp.task(`${name}:${env}`, (callback) => {
                return fn(callback, env);
            });
        }
    }
}

module.exports = {
    getPaths,
    execCommand,
    compileLessFile,
    compileLessFiles,
    task,
    executeTasksSeq,
    debug
};
