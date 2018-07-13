const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/component/index/app.js'),
        'shop': path.resolve(__dirname, '../src/component/shop/app.js'),
    },
    resolve: {
        extensions: ['.js', '.json', '.jxs']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(css|pcss)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            outputPath: "images/",
                            name: "[name].[hash:base64:6].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].bundle.js",
        chunkFilename: "js/[name].chunk.js",
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        }),
    ],
}