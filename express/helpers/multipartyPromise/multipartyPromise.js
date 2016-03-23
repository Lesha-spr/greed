'use strict';

const multiparty = require('multiparty');
const fs = require('fs');

const parseForm = (req) => {
    return new Promise((resolve, reject) => {
        new multiparty.Form().parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }

            resolve({
                fields,
                files
            });
        });
    });
};

module.exports = parseForm;