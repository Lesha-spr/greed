'use strict';

const config = {
    mongoose: {
        uri: process.env.MONGOOSE_URI,
        options: {}
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY_ID,
        api_secret: process.env.CLOUDINARY_APIKEY_SECRET
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