// Capture build hash to enable better caching
// To take advantage of that you must call
// gulp watch
// The hash is generated for each call of gulp watch
// and each time it changes new cache is created
// they can be found under .build-cache/dev
const webpackWatchProcessHash = 'webpack-'+Date.now();

const path            = require('path');
const fs              = require('fs');
const webpack         = require('webpack');
const configLoader    = require('./configLoader.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ProgressBarPlugin = require('webpackbar');

const configCache = {};

module.exports = function(PATHS, currentEnv) {

  let esLintGlobalReport = null;

  console.log("[WebpackCommonConfig] Using config for "+currentEnv);

  // Load cached config
  if(configCache[currentEnv] !== undefined) {
    return configCache[currentEnv];
  }

  const buildConfig = configLoader.loadBuildConfig(currentEnv);

  let webpackDevtool = false;

  let webpackPlugins = [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin(buildConfig)
  ];

  let webpackLoaders = [
    {
      test: /\.css|\.less$/,
      loaders: [
        {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "env"
              ],
              plugins: [
                ["transform-es2015-arrow-functions", {}],
                ["babel-plugin-transform-object-assign", {}],
                ["transform-object-rest-spread", {}],
              ]
            }
        },
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'less-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader', options: {
            includePaths: ['./node_modules', './node_modules/grommet/node_modules']
          }
        }
      ]
    },
    {
      test: /\.md$/,
      use: 'raw-loader'
    }/*,
    {
      test: /\.json$/,
      loader: 'json-loader'
    }*/
  ];

  let webpackEntry = [
    PATHS.srcAppEntry
  ];

  let webpackOutput = {};

  if(currentEnv === 'prod' || currentEnv === 'stage') {
    webpackOutput = {
      filename: 'bundle.js',
      sourceMapFilename: '[file].map',
      path: PATHS.outAppEntry
    };
  } else if(currentEnv === 'dev') {
    webpackOutput = {
      filename: 'bundle.js',
      path: PATHS.outAppEntry
    };
  } else {
    webpackOutput = {
      filename: 'bundle.js',
      path: PATHS.outAppEntry
    };
  }

  if(currentEnv === 'prod' || currentEnv === 'stage') {

    webpackDevtool = 'source-map';

    webpackEntry = webpackEntry.concat([
      'babel-polyfill'
    ]);

    webpackLoaders = webpackLoaders.concat([
      {
        test: /\.jsx|js?$/,
        exclude: /node_modules(\/|\\)*(react-grid-layout|react-input-autosize|react-popover|react-google-maps|react-resizable|css-vendor)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "env", "react", "react-optimize"
              ],
              plugins: [
                ["babel-plugin-transform-es2015-arrow-functions", {}],
                ["babel-plugin-transform-object-assign", {}],
                ["transform-object-rest-spread", {}],
                ["react-css-modules", {}],
              ]
            }
          }
        ]
      }
    ]);

    webpackPlugins = webpackPlugins.concat([
      new webpack.SourceMapDevToolPlugin({
        append: `\n//# sourceMappingURL=${buildConfig['$DEPLOY_URL']}/js/[url]`,
        filename: '[name].map'
      }),
      new BundleAnalyzerPlugin({
          reportFilename: PATHS.bundleAnalyzerReportOut,
          analyzerMode: 'static',
          logLevel: 'info',
          openAnalyzer: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]);
  } else if(currentEnv === 'dev') {

    webpackDevtool = 'eval';

    webpackEntry = webpackEntry.concat([
      'babel-polyfill'
    ]);

    webpackLoaders = webpackLoaders.concat([
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
          cacheDirectory: true,
          presets: [
            "env", "react"
          ],
          plugins: [
            ["babel-plugin-transform-es2015-arrow-functions", {}],
            ["babel-plugin-transform-object-assign", {}],
            ["transform-object-rest-spread", {}],
            ["react-css-modules", {}],
          ]
          //,"plugins": ["inferno"]
          }
        },
        //{ loader: 'eslint-loader' }
      ]
    }
    ]);

    webpackPlugins = webpackPlugins.concat([
      //new webpack.HotModuleReplacementPlugin()
      //new webpack.NoErrorsPlugin()
    ]);
  }

  if(false && buildConfig['$CONFIG_BUILD_CACHE'] === true) {
    webpackPlugins = webpackPlugins.concat([
      // 70%-speedup caching
      new HardSourceWebpackPlugin({
        // Directory to store cache
        cacheDirectory: path.join(PATHS.buildCache, currentEnv, '[confighash]'),
        recordsPath: path.join(PATHS.buildCache, currentEnv, '[confighash]', 'records.json'),

        // Generate hash for current cache
        configHash: function(webpackConfig) {
          return `webpack-${currentEnv}`;
        },

        // Used to generate has for current env
        environmentHash: {
          root: '..',
          directories: ['node_modules'],
          files: [
            'package.json'
          ],
        },
      })
    ]);
  }

  // Final webpack config
  const finalConfig = {
    mode: (currentEnv === 'dev')?('development'):('production'),
    entry: webpackEntry,
    optimization: {
        minimize: (currentEnv !== 'dev')
    },
    //debug: true,
    //devtool: webpackDevtool,
    stats: {
      colors: true,
      reasons: true
    },
    output: webpackOutput,
    module: {
      rules: webpackLoaders,
      // Exclude tokbox.js file
      // Also exclude ajv.bundle.js
      // Both are precompiled and makes compilation longer a lot
      noParse: /(ajv\.bundle\.js)$/
    },
    plugins: webpackPlugins,
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    externals: {
      fs: '{}',
      tls: '{}',
      net: '{}',
      console: '{}'
    },
    resolve: {
      alias: {
        //'react': 'react-lite',
        //'react-dom': 'react-lite',
        'content': path.join(PATHS.app, 'content'),
        'animations': path.join(PATHS.app, 'animations'),
        'superbytes': path.join(PATHS.app, 'utils', 'superbytes.js'),
        'utils': path.join(PATHS.app, 'utils'),
        'test-utils': path.join(PATHS.app, 'test-utils'),
        'requests': path.join(PATHS.app, 'requests'),
        'pages': path.join(PATHS.app, 'components', 'pages'),
        'sections': path.join(PATHS.app, 'components', 'sections'),
        'components': path.join(PATHS.app, 'components', 'universal'),
        'reducers': path.join(PATHS.app, 'reducers'),
        'routes': path.join(PATHS.app, 'routes'),
        'css': path.join(PATHS.app, 'css')
      }
    }
  };

  // Store config in cache
  configCache[currentEnv] = finalConfig;

  // Return generated config object
  return finalConfig;
};
