'use strict';

const config = {
    mongoose: {
        uri: 'mongodb://Lesha-spr:alewka456@ds055545.mongolab.com:55545/heroku_f65j1tzp',
        options: {}
    },
    cloudinary: {
        cloud_name: 'dcyuhoxoi',
        api_key: '358543651425887',
        api_secret: '-xZbnrqwfqtUE8_k0D001wKJbpQ'
    },
    imagePath: 'public/build/i/',
    outputImagePath: '/build/i/',
    session: {
        secret: 'someSecret',
        key: 'sid'
    }
};

module.exports = config;