const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'none',
    optimization: {
        minimize: true,
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env.NODE_ENV': JSON.stringify('production'),
    //         'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION)
    //     })
    // ]
});
