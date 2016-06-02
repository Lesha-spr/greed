'use strict';

const webpack = require('webpack');

module.exports = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 2
});