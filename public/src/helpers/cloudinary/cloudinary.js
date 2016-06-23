import cloudinary from 'cloudinary-core';

export const options = {crop: 'fill', fetch_format: 'auto', flags: 'lossy', quality: 80};

export const cl = cloudinary.Cloudinary.new({
    cloud_name: CLOUDINARY_CLOUD_NAME
});