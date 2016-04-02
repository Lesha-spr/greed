import cloudinary from 'cloudinary-core';
import config from './../../../../express/config/public.js';

const cl = cloudinary.Cloudinary.new({
    cloud_name: config.cloudinary.cloud_name
});

export default cl;