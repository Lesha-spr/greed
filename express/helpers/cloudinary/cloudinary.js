'use strict';

const cloudinary = require('cloudinary');
const privateConfig = require('./../../config/private');
const publicConfig = require('./../../config/public');

cloudinary.config(Object.assign({}, privateConfig.cloudinary, publicConfig.cloudinary));

module.exports = {
    upload: (file, options) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, result => {
                resolve(result);
            }, options || {});
        });
    },

    delete: (file, options) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(file, result => {
                resolve(result);
            }, options || {});
        });
    }
};