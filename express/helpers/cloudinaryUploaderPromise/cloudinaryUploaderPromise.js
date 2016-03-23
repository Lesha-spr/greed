'use strict';

const cloudinary = require('cloudinary');
const config = require('./../../config/index');

cloudinary.config(config.cloudinary);

module.exports = {
    upload: (file, options) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file, result => {
                resolve(result);
            }, options || {});
        });
    }
};