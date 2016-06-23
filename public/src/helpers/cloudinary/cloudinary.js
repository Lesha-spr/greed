import cloudinary from 'cloudinary-core';

const CLOUDINARY_CLOUD_NAME = CLOUDINARY_CLOUD_NAME || null;

export const options = {crop: 'fill', fetch_format: 'auto', flags: 'lossy', quality: 80};

export const cl = cloudinary.Cloudinary.new({
    cloud_name: CLOUDINARY_CLOUD_NAME
});