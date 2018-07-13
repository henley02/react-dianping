const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");//webpack配置文件合并
const baseWebpackConfig = require("./webpack.config");

let config = merge(baseWebpackConfig, {
    mode: 'development',

    plugins: [
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: '9090',
        compress: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: [
            {
                context: ['/api/**', '/u/**'],
                target: 'http://192.168.12.100:8080/',
                secure: false
            }
        ],
        open: true,//打开浏览器
    }
})

module.exports = config;