'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader!resolve-url!sass?sourceMap')
};