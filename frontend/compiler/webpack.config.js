const process = require("process");
const devConfig = require("./dev.webpack.config.js");
const prodConfig = require("./prod.webpack.config.js");



const commonConfig = {
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: {
                    loader: "elm-webpack-loader",
                    options: {
                        optimize: true
                    }
                }
            }
        ]
    }
};


let finalConfig = {};

const env = process.env.NODE_ENV || "development";


if (env === "development"){
    finalConfig = Object.assign(finalConfig,commonConfig, devConfig);
}
else {
    finalConfig = Object.assign(finalConfig, commonConfig, prodConfig);
}

module.exports = finalConfig;

