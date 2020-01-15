const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    devtool: 'eval',
    devServer: {
        port: 4010,
        historyApiFallback: true,
        inline: true,
        contentBase: path.resolve(__dirname, './static/'),
        proxy: {
            "/api": {
                target: "http://localhost:3000/",
            }
        },
        stats: {
            modules: false,
            chunks: false,
            children: false,
            chunkModules: false,
            hash: false,
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.APP_VERSION': JSON.stringify('development')
        }),
        // new BundleAnalyzerPlugin()
    ]
});