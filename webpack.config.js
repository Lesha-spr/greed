'use strict';

const path = require('path');
const config = require('./express/config');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: path.join(__dirname, '/public/src'),

    entry: {
        'app': './app.jsx',
        'admin': './admin.jsx'
    },

    output: {
        path: path.join(__dirname, '/public/build'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: config.cdn + '/build/'
    },

    watch: (NODE_ENV === 'development' && NODE_ENV !== 'codeship'),

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    plugins: require('./webpack/plugins'),

    module: {
        loaders: require('./webpack/loaders'),
        preLoaders: require('./webpack/preloaders')
    },

    postcss: require('./webpack/postcss'),
    eslint: require('./webpack/eslint/.eslintrc.json')
};