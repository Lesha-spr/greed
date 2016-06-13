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
    stormpath: {
        web: {
            produces: ['application/json'],
            me: {
                expand: {
                    groups: true
                }
            }
        },

        client: {
            apiKey: {
                id: process.env.STORMPATH_CLIENT_APIKEY_ID,
                secret: process.env.STORMPATH_CLIENT_APIKEY_SECRET
            }
        },

        application: {
            href: process.env.STORMPATH_APPLICATION_HREF
        }
    }
};

module.exports = config;