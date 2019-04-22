import * as path from "path";
import * as fs from "fs";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as sass from "node-sass";
import * as sassUtilsFactory from "node-sass-utils";
import * as webpack from "webpack";

import webpackPaths from "./webpackPaths";
const webpackPathsResolved = webpackPaths([__dirname, '..', '..']);

const sassUtils = sassUtilsFactory(sass);
const sassVars = (fs.existsSync(path.join(__dirname, "../../src/themes"))) ? (
    require(path.join(__dirname, "../../src/themes/default.ts")).default
) : ({});

export default {
    resolve: webpackPathsResolved.resolve,
    context: webpackPathsResolved.context,
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
                        useCache: true,
                        transpileOnly: true,
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