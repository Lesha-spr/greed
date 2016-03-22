import cloudinary from 'cloudinary';
import config from './../../config/';

cloudinary.config(config.cloudinary);

export const upload = (file, options = {}) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, result => {
            resolve(result);
        }, options);
    });
};