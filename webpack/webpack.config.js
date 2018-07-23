const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'index': path.resolve(__dirname, '../src/app.js'),
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
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ],
                })
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
    optimization: {
        //包清单
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                //项目公共组件
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                //第三方组件
                vendor: {
                    test: /node-modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true,
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].bundle.[hash:8].js",
        chunkFilename: "js/[name].chunk.[hash:8].js",
        publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin('dist/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextWebpackPlugin({
            filename: '[name].min.[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: {
                collapseWhitespace: true //折叠空白区域 也就是压缩代码
            },
            hash: true
        }),
    ]
}