import {Product} from './product.model.js';
import {parseForm} from './../../helpers/multipartyPromise/multipartyPromise.js';
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

                Object.keys(data.files).forEach(name => {
                    let {promises, files} = this._getReadData(data, name, formData);

                    Promise.all(promises).then(buffers => {
                        let {promises} = this._getWriteData(buffers, files, name, formData);

                        Promise.all(promises).then(() => {
                            resolve(formData);
                        });
                    });
                });
            });
        });
    }

    _getReadData(data, name, formData) {
        let promises = [];
        let files = [];

        data.files[name].forEach(file => {
            formData[name] = [];

            if (file.size) {
                files.push(file);
                promises.push(fsp.readFile(file.path));
            }
        });

        return {
            promises,
            files
        };
    }

    _getWriteData(buffers, files, name, formData) {
        let promises = [];

        buffers.forEach((buffer, index) => {
            let output;

            formData[name].push(`${config.outputImagePath}${files[index].originalFilename}`);

            output = path.join(root, config.imagePath, files[index].originalFilename);

            promises.push(fsp.writeFile(output, buffer));
        });

        return {
            promises
        };
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