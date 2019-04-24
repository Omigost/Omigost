require('typescript-require');

// shared config (dev and prod)
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const webpack = require('webpack');

const sassVars = require(path.join(__dirname, "../../src/themes/default.ts"));

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'index.ts', 'index.tsx', 'index.js', 'index.jsx'],
    alias: {
      'scss': path.join(__dirname, '..', '..', 'src', 'scss'),
      'client': path.join(__dirname, '..', '..', 'src', 'client'),
      'components': path.join(__dirname, '..', '..', 'src', 'components', 'universal'),
      'pages': path.join(__dirname, '..', '..', 'src', 'components', 'pages'),
      'langs': path.join(__dirname, '..', '..', 'src', 'langs'),
      'routes': path.join(__dirname, '..', '..', 'src', 'routes'),
      'themes': path.join(__dirname, '..', '..', 'src', 'themes'),
      'modules': path.join(__dirname, '..', '..', 'src', 'modules'),
      'img': path.join(__dirname, '..', '..', 'src', 'assets', 'img')
    }
  },
  context: path.resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', {
          loader: 'awesome-typescript-loader',
          options:{
            transpileOnly: true
          },
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
              loader: 'sass-loader',
              options: {
                  functions: {
                      "getTheme($keys)": (keys) => {
                          keys = keys.getValue().split(".");
                          let result = sassVars;

                          keys.forEach(key => {
                              result = result[key];
                          });

                          return sassUtils.castToSass(result);
                      },
                  },
              },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({template: 'index.html.ejs',}),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      console.info(message, ...args);
    }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  performance: {
    hints: false,
  },
};
