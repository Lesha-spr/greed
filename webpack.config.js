'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const autoprefixer = require('autoprefixer');

module.exports = {
    context: path.join(__dirname + '/public/src'),
    entry: {
        'app': './app.jsx',
        'admin': './admin.jsx'
    },

    output: {
        path: __dirname + '/public/build',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/build/'
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.ProvidePlugin({
            Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
            fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    resolve: {

    },

    module: {
        loaders: [
            {
                test: /\.js+x?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [require.resolve('babel-preset-react'), require.resolve('babel-preset-es2015')],
                    plugins: [require.resolve('babel-plugin-transform-runtime')]
                }
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader!resolve-url!sass?sourceMap')
            },

            {
                test: /\.(png|jpg|svg|ttf|eot|woff|worr2)$/,
                loader: 'file?name=[path][name].[ext]'
            }
        ]
    },

    postcss: [autoprefixer({
        browsers: ['last 3 versions']
    })]
};

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}