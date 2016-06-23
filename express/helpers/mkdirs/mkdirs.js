'use strict';

const fs = require('fs');
const config = require('./../../config/');
const root = require('app-root-path');

module.exports = (() => {
    fs.existsSync(`${root}/log`) || fs.mkdirSync(`${root}/log`);

    console.log('Project dirs are created!');

    return true;
})();