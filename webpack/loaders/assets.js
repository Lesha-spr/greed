'use strict';

module.exports = {
    test: /\.(png|jpg|svg|ttf|eot|woff|worr2)$/,
    loader: 'file?name=[path][name].[ext]'
};