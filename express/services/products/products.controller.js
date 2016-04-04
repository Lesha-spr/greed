'use strict';

const ModelWrapper = require('./../../helpers/modelWrapper/model-wrapper.js');
const Product = require('./product.model.js');
const _ = require('lodash');
const parseForm = require('./../../helpers/multipartyPromise/multipartyPromise.js');
const cloudinary = require('./../../helpers/cloudinary/cloudinary.js');
const path = require('path');
const config = require('./../../config/private');
const root = require('app-root-path');

module.exports = class ProductsController {
    constructor() {
        this.res = null;
        this.model = new ModelWrapper(Product);

        _.bindAll(this, '_sendResponse', '_uploadStatic', '_uploadFiles', '_destroyFile', '_saveProduct', '_updateProduct', '_removeProduct');
    }

    get(req, res, next) {
        this.res = res;

        this.model.query('find')
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    post(req, res, next) {
        this.res = res;

        this._parseForm(req, config.imagePath)
            .then(this._uploadStatic)
            .then(this._saveProduct)
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    put(req, res, next) {
        this.res = res;

        this._parseForm(req, config.imagePath)
            .then(this._uploadStatic)
            .then(this._updateProduct)
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    delete(req, res, next) {
        this.res = res;

        this.model.query('findById', req.params.id)
            .then(this._destroyFile)
            .then(this._removeProduct)
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    _sendResponse(data) {
        this.res.send(data);
    }

    _saveProduct(data) {
        data = this._prepareData(data);

        return this.model.query('create', data);
    }

    _updateProduct(data) {
        data = this._prepareData(data);

        return this.model.query('findByIdAndUpdate', data._id, data);
    }

    _removeProduct(product) {
        return this.model.query('remove', {_id: product._id});
    }

    _parseForm(req) {
        return new Promise((resolve, reject) => {
            parseForm(req).then(parsed => {
                let data = {
                    parsed: parsed,
                    formData: Object.assign({}, parsed.fields)
                };

                resolve(data);
            }).catch(reject);
        });
    }

    _uploadStatic(data) {
        let uploadPromises = [];

        Object.keys(data.parsed.files).forEach(name => {
            uploadPromises.push(Promise.all(this._uploadFiles(data.parsed, name, data.formData)));
        });

        return new Promise((resolve, reject) => {
            Promise.all(uploadPromises).then(() => {
                resolve(data.formData);
            }).catch(reject);
        });
    }

    _uploadFiles(data, name, formData) {
        let promises = [];

        formData[name] = [];

        data.files[name].forEach(file => {
            promises.push(this._uploadSingleFile(formData, name, file));
        });

        return promises;
    }

    _destroyFile(product) {
        return new Promise((resolve, reject) => {
            cloudinary.delete(product.image.public_id).then(() => {
                resolve(product);
            }).catch(reject);
        });
    }

    _uploadSingleFile(formData, name, file) {
        return new Promise((resolve, reject) => {
            if (file.size) {
                cloudinary.upload(file.path).then(result => {
                    formData[name].push(result);

                    resolve(result);
                }).catch(reject);
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