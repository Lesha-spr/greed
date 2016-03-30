'use strict';

const ProductModelWrapper = require('./product.model.wrapper');
const _ = require('lodash');
const parseForm = require('./../../helpers/multipartyPromise/multipartyPromise.js');
const cloudinaryAPI = require('./../../helpers/cloudinaryUploaderPromise/cloudinaryUploaderPromise.js');
const path = require('path');
const config = require('./../../config/index');
const root = require('app-root-path');

module.exports = class ProductsController {
    constructor() {
        this.res = null;

        _.bindAll(this, '_sendRes', '_uploadStatic', '_uploadFiles', '_destroyFile', '_saveProduct', '_updateProduct', '_removeProduct');
    }

    get(req, res, next) {
        this.res = res;

        ProductModelWrapper.query('find')
            .then(this._sendRes)
            .catch(err => {
                console.log(err);
            });
    }

    post(req, res, next) {
        this.res = res;

        this._parseForm(req, config.imagePath)
            .then(this._uploadStatic)
            .then(this._saveProduct)
            .then(this._sendRes)
            .catch(err => {
                console.log(err);
            });
    }

    put(req, res, next) {
        this.res = res;

        this._parseForm(req, config.imagePath)
            .then(this._uploadStatic)
            .then(this._updateProduct)
            .then(this._sendRes)
            .catch(err => {
                console.log(err);
            });
    }

    delete(req, res, next) {
        this.res = res;

        ProductModelWrapper.query('findOne', {_id: req.params.id})
            .then(this._destroyFile)
            .then(this._removeProduct)
            .then(this._sendRes)
            .catch(err => {
                console.log(err);
            });
    }

    _sendRes(data) {
        this.res.send(data);
    }

    _saveProduct(data) {
        let product;

        data = this._prepareData(data);

        product = ProductModelWrapper.create(data);

        return product.save();
    }

    _updateProduct(data) {
        data = this._prepareData(data);

        return ProductModelWrapper.query('update', {_id: data._id}, data);
    }

    _removeProduct(product) {
        return ProductModelWrapper.query('remove', {_id: product._id});
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
            cloudinaryAPI.delete(product.image.public_id).then(() => {
                resolve(product);
            }).catch(reject);
        });
    }

    _uploadSingleFile(formData, name, file) {
        return new Promise((resolve, reject) => {
            if (file.size) {
                cloudinaryAPI.upload(file.path).then(result => {
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