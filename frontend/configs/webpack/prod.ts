import * as merge from "webpack-merge";
import { resolve } from "path";

import * as TypedocWebpackPlugin from "typedoc-webpack-plugin";
import commonConfig from "./common";

export default merge(commonConfig, {
    mode: "production",
    entry: "./index.tsx",
    output: {
        filename: "js/bundle.[hash].min.js",
        chunkFilename: "[name].bundle.js",
        path: resolve(__dirname, "../../dist"),
        publicPath: "/",
    },
    devtool: "source-map",
    plugins: [
        new TypedocWebpackPlugin({
            theme: "./docs-theme",
            out: "../docs",
            name: "Omigost Docs",
            mode: "file",
            target: "es6",
            includeDeclarations: false,
            ignoreCompilerErrors: true,
            excludePrivate: true,
            tsconfig: "./tsconfig.json",
            readme: "./ABOUT.md",
            media: "./src/assets/img"
            // media: "../docs/test-report.html"
        }, ["./src/"])
    ],
});