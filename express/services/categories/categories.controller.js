'use strict';

const ModelWrapper = require('./../../helpers/modelWrapper/model-wrapper.js');
const apicache = require('apicache');
const Category = require('./category.model.js');
const _ = require('lodash');

module.exports = class CategoriesController {
    constructor() {
        this.res = null;
        this.model = new ModelWrapper(Category);

        _.bindAll(this, '_sendResponse');
    }

    _sendResponse(data) {
        this.res.send(data);
    }

    get(req, res, next) {
        this.res = res;

        req.apicacheGroup = 'Categories';

        this.model.query('find')
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    post(req, res, next) {
        this.res = res;

        apicache.clear('Categories');

        this.model.query('create', req.body)
            .then(this._sendResponse)
            .catch(error => {
                console.log(error);
            });
    }

    put(req, res, next) {
        this.res = res;

        apicache.clear('Categories');

        return this.model.query('findByIdAndUpdate', req.body._id, req.body, {new: true})
            .then(this._sendResponse)
            .catch(error => {
                console.log(error);
            });
    }

    delete(req, res, next) {
        this.res = res;

        apicache.clear('Categories');

        return this.model.query('findByIdAndRemove', req.params.id)
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }
};