const path        = require('path');
const fs          = require('fs');
const webpack     = require('webpack');
const iniLoader   = require('multi-ini');

let configInMemoryCache = {};

const ENV_VARIABLES_MAPPING = {
    
};

const ENV_VARIABLES_DEFAULT_NAMES = {

};

const PACKAGE_JSON_VARIABLES_MAPPING = {
    '$NAME':            'name',
    '$VERSION':         'version'
};

function loadRawBuildConfig() {
    let parsedContent = null;
    try {
        parsedContent = iniLoader.read('../buildConfig.ini');
    } catch(e) {
        parsedContent = iniLoader.read('./buildConfig.ini');
    }
    return parsedContent;
};

function cacheGeneratorConfig(configGenerator, env) {
    if(!configInMemoryCache || !configInMemoryCache[env]) {
        configInMemoryCache = configInMemoryCache || {};
        configInMemoryCache[env] = configGenerator(env);
    }

    return configInMemoryCache[env];
}

function generateRunningContextForConfig(buildConfig, env) {
    const releaseVersion = '1.0.'+parseInt(+new Date()/10000);

    const commitTitle = process.env['CI_COMMIT_TITLE'];
    const jobUrl = process.env['CI_JOB_URL'];
    const commitSha = process.env['CI_COMMIT_SHA'];
    const enviromentName = process.env['CI_ENVIRONMENT_NAME'];
    const commitUserLogin = process.env['GITLAB_USER_LOGIN'];

    const runningContext = {};

    if(commitTitle) runningContext['commit-title'] = commitTitle;
    if(jobUrl) runningContext['job-url'] = jobUrl;
    if(commitSha) runningContext['commit-sha'] = commitSha;
    if(enviromentName) runningContext['enviroment-name'] = enviromentName;
    if(commitUserLogin) runningContext['commit-user'] = commitUserLogin;

    runningContext['build-time'] = new Date().toString();
    runningContext['env'] = env || 'unknown';
    runningContext['release'] = releaseVersion;

    buildConfig['$RUNNING_CONTEXT'] = JSON.stringify(runningContext || {});
    buildConfig['$VERSION'] = JSON.stringify(releaseVersion);

    return buildConfig;
};

function dynamicallyResolveBuildConfig(buildConfig, env) {
    console.log('[WebpackCommonConfig] Resolve buildConfig ENV variables...');
    Object.keys(ENV_VARIABLES_MAPPING).forEach((key) => {
        const value = process.env[buildConfig[env][ENV_VARIABLES_MAPPING[key]]];
        if(!value) {
            if(!buildConfig[env][ENV_VARIABLES_MAPPING[key]]) {
                throw "[ConfigLoader] Build config must contain env \""+env+"\" with key \""+ENV_VARIABLES_MAPPING[key]+"\" that points to valid environmental variable name. Please set it up.";
            }
            throw "[ConfigLoader] Resolving build config: Missing evnironmental variable \""+buildConfig[env][ENV_VARIABLES_MAPPING[key]]+"\" for env \""+env+"\". Please set it up.";
        }
        console.log("[ConfigLoader] Resolving build config: \""+key+"\" -> [some value]");

        buildConfig[env][key] = JSON.stringify(value);
    });

    buildConfig['$ENV'] = buildConfig[env]['$ENV'] = env || 'dev';

    console.log('[WebpackCommonConfig] Resolve buildConfig ENV variables: DONE.');
    return generateRunningContextForConfig(buildConfig[env], env);
};

function addProcessEnvToBuildConfig(buildConfig, currentEnv) {
    if(currentEnv === 'prod' || currentEnv == 'stage') {
        buildConfig['process.env'] = {
            NODE_ENV: JSON.stringify('production')
        };
    }

    return buildConfig;
};

function addPackageJsonFieldsToBuildConfig(buildConfig) {

    let packageJson = {};
    try {
        packageJson = fs.readFileSync('../package.json').toString();
    } catch(e) {
        packageJson = fs.readFileSync('./package.json').toString();
    }

    Object.keys(PACKAGE_JSON_VARIABLES_MAPPING).forEach(key => {
       buildConfig[key] = packageJson[PACKAGE_JSON_VARIABLES_MAPPING[key]];
    });
    return buildConfig;
};

function loadBuildConfigNoCache(currentEnv) {
    return addPackageJsonFieldsToBuildConfig(
        addProcessEnvToBuildConfig(
            dynamicallyResolveBuildConfig(
                loadRawBuildConfig(),
                currentEnv
            ),
            currentEnv
        )
    );
};

function loadBuildConfig(currentEnv) {
    return cacheGeneratorConfig(loadBuildConfigNoCache, currentEnv);
};

module.exports = {
    loadBuildConfig
};
