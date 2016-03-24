'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname + '/public/src'),
    entry: {
        'app': './app.jsx',
        'admin': './admin.jsx'
    },
    output: {
        path: path.join(__dirname + '/public/build'),
        publicPath: '/build/',
        filename: '[name].js'
    },

    watch: NODE_ENV === 'dev',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'dev' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        })
    ],

    resolve: {
        alias: {
            // Paths here
        }
    },

    module: {
        loaders: [
            {
                test: /\.js+x?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-runtime']
                }
            },

            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'autoprefixer?browsers=last 3 versions', 'resolve-url', 'sass?sourceMap']
            },

            {
                test: /\.(png|jpg|svg|ttf|eot|woff|worr2)$/,
                loader: 'file?name=[path][name].[ext]'
            }
        ]
    }
};

if (NODE_ENV === 'prod') {
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