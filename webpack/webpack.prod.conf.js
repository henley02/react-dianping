const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const baseWebpackConfig = require("./webpack.config");

let config = merge(baseWebpackConfig, {
    mode: 'production',
})

module.exports = config;