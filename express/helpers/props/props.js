'use strict';

module.exports = (props) => {
    let promises = [];
    let keys = [];
    let data = {};
    let i = 0;

    Object.keys(props).forEach(key => {
        promises.push(props[key]);
        keys.push(key);
    });

    return new Promise((resolve, reject) => {
        Promise.all(promises).then(values => {
            for (; i < values.length; i++) {
                data[keys[i]] = values[i];
            }

            resolve(data);
        }).catch(reject);
    });
};