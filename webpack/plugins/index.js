'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = [
    require('./chunks'),
    require('./define'),
    require('./extract-text'),
    require('./provide')
];

if (NODE_ENV === 'production') {
    module.exports.plugins.push(require('./uglify'));
}