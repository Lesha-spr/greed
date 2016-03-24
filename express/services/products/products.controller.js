'use strict';

const Product = require('./product.model.js');
const parseForm = require('./../../helpers/multipartyPromise/multipartyPromise.js');
const upload = require('./../../helpers/cloudinaryUploaderPromise/cloudinaryUploaderPromise.js').upload;
const path = require('path');
const fsp = require('fs-promise');
const config = require('./../../config/index');
const root = require('app-root-path');

module.exports = class ProductController {
    constructor() {}

    get(req, res, next) {
        Product.find().then(items => {
            res.json(items);
        });
    }

    post(req, res, next) {
        this._serveMultipartForm(req, config.imagePath).then(data => {
            let product;

            data = this._prepareData(data);

            product = new Product(data);

            product.save().then(data => {
                res.json(data);
            });
        });
    }

    put(req, res, next) {
        this._serveMultipartForm(req, config.imagePath).then(data => {
            data = this._prepareData(data);

            Product.update({_id: data._id}, data).then(data => {
                res.json(data);
            });
        });
    }

    _serveMultipartForm(req) {
        return new Promise((resolve, reject) => {
            parseForm(req).then(data => {
                let formData = Object.assign({}, data.fields);
                let uploadPromises = [];

                Object.keys(data.files).forEach(name => {
                    uploadPromises.push(Promise.all(this._uploadFiles(data, name, formData)));
                });

                Promise.all(uploadPromises).then(results => {
                    resolve(formData);
                });
            });
        });
    }

    _uploadFiles(data, name, formData) {
        let promises = [];

        formData[name] = [];

        data.files[name].forEach(file => {
            promises.push(this._uploadSingeFile(formData, name, file));
        });

        return promises;
    }

    _uploadSingeFile(formData, name, file) {
        return new Promise((resolve, reject) => {
            if (file.size) {
                upload(file.path).then(result => {
                    formData[name].push(result.secure_url);

                    resolve(result);
                });
            } else {
                resolve();
            }
        });
    }

    _prepareData(data) {
        let formData = {};

        Object.keys(data).forEach(name => {
            if (data[name][0]) {
                formData[name] = data[name][0];
            }
        });

        formData.link = `/admin/start/products/${formData.title}`;

        return formData;
    }
};