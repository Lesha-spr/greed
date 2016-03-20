import multiparty from 'multiparty';
import fs from 'fs';
import Promise from 'promise';

export const parseForm = (req) => {
    let form = new multiparty.Form();

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
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