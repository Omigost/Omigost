import * as merge from "webpack-merge";
import * as path from "path";

import devConfig from "./dev";
import { CheckerPlugin } from "awesome-typescript-loader";

import webpackPaths from "./webpackPaths";
const webpackPathsResolved = webpackPaths([__dirname, '..']);

export default {
    mode: "development",
    resolve: webpackPathsResolved.resolve,
    module: {
        ...devConfig.module,
        rules: [
            ...devConfig.module.rules,
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