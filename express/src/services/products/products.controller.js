import {Product} from './product.model.js';
import {parseForm} from './../../helpers/multipartyPromise/multipartyPromise.js';
import {upload} from './../../helpers/cloudinaryUploaderPromise/cloudinaryUploaderPromise.js';
import multiparty from 'multiparty';
import path from 'path';
import fsp from 'fs-promise';
import config from './../../config';
import {path as root} from 'app-root-path';

export class ProductController {
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
}