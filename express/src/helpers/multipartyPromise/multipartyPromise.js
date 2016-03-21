import multiparty from 'multiparty';
import fs from 'fs';

export const parseForm = (req) => {
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