import {Product} from './product.model.js';
import {parseForm} from './../../helpers/multipartyPromise/multipartyPromise.js';
import mkdirp from 'mkdirp';
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

    _serveMultipartForm(req, pathToSave) {
        return new Promise((resolve, reject) => {
            parseForm(req).then(data => {
                let formData = Object.assign({}, data.fields);

                Object.keys(data.files).forEach(name => {
                    let readPromises = [];
                    let files = [];

                    data.files[name].forEach(file => {
                        formData[name] = [];

                        if (file.size) {
                            files.push(file);
                            readPromises.push(fsp.readFile(file.path));
                        }
                    });

                    Promise.all(readPromises).then(buffers => {
                        let writePromises = [];

                        buffers.forEach((buffer, index) => {
                            let output;

                            formData[name].push(`${config.outputImagePath}${files[index].originalFilename}`);

                            mkdirp.sync(config.imagePath);
                            output = path.join(root, pathToSave, files[index].originalFilename);

                            writePromises.push(fsp.writeFile(output, buffer));
                        });

                        Promise.all(writePromises).then(() => {
                            resolve(formData);
                        });
                    });
                });
            });
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