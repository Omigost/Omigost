// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpackConfig = require("../configs/webpack/dev.js");
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
  mode: "development",
  resolve: webpackConfig.resolve,
  module: {
    ...webpackConfig.module,
    rules: [
        ...webpackConfig.module.rules,
        {
            test: /(\.stories|\.story)\.tsx?$/,
            loaders: [require.resolve('@storybook/addon-storysource/loader')],
            enforce: 'pre',
        }
    ]
  },
  plugins: [
      new CheckerPlugin(),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};