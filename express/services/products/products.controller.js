'use strict';

const Product = require('./product.model.js');
const bindAll = require('lodash.bindall');
const parseForm = require('./../../helpers/multipartyPromise/multipartyPromise.js');
const cloudinaryAPI = require('./../../helpers/cloudinaryUploaderPromise/cloudinaryUploaderPromise.js');
const path = require('path');
const config = require('./../../config/index');
const root = require('app-root-path');

module.exports = class ProductController {
    constructor() {
        this.req = null;
        this.res = null;
        this.next = null;

        bindAll(this, '_sendRes', '_uploadStatic', '_uploadFiles', '_destroyFile', '_saveProduct', '_updateProduct', '_removeProduct');
    }

    get(req, res, next) {
        this.res = res;

        Product.find()
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

        Product.findOne({_id: req.params.id})
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

        product = new Product(data);

        return product.save();
    }

    _updateProduct(data) {
        data = this._prepareData(data);

        return Product.update({_id: data._id}, data);
    }

    _removeProduct(product) {
        return Product.remove({_id: product._id});
    }

    _parseForm(req) {
        return new Promise((resolve, reject) => {
            parseForm(req).then(parsed => {
                let data = {
                    parsed: parsed,
                    formData: Object.assign({}, parsed.fields)
                };

                resolve(data);
            });
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

    _destroyFile(product) {
        return new Promise((resolve, reject) => {
            cloudinaryAPI.delete(product.image.public_id).then(() => {
                resolve(product);
            });
        });
    }

    _uploadSingeFile(formData, name, file) {
        return new Promise((resolve, reject) => {
            if (file.size) {
                cloudinaryAPI.upload(file.path).then(result => {
                    formData[name].push(result);

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