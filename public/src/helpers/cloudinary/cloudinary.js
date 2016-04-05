import cloudinary from 'cloudinary-core';
import config from './../../../../express/config/public.js';

export const options = {crop: 'fill', fetch_format: 'auto', flags: 'lossy', quality: 80};

export const cl = cloudinary.Cloudinary.new({
    cloud_name: config.cloudinary.cloud_name
});