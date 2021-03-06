'use strict';

const ModelWrapper = require('./../../helpers/modelWrapper/model-wrapper.js');
const Box = require('./box.model.js');
const apicache = require('apicache');
const _ = require('lodash');

module.exports = class BoxesController {
    constructor() {
        this.res = null;
        this.model = new ModelWrapper(Box);

        _.bindAll(this, '_sendResponse');
    }

    _sendResponse(data) {
        this.res.send(data);
    }

    get(req, res, next) {
        this.res = res;

        req.apicacheGroup = 'Boxes';

        this.model.query('find')
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }

    post(req, res, next) {
        this.res = res;

        apicache.clear('Boxes');

        this.model.query('create', req.body)
            .then(this._sendResponse)
            .catch(error => {
                console.log(error);
            });
    }

    put(req, res, next) {
        this.res = res;

        apicache.clear('Boxes');

        return this.model.query('findByIdAndUpdate', req.body._id, req.body, {new: true})
            .then(this._sendResponse)
            .catch(error => {
                console.log(error);
            });
    }

    delete(req, res, next) {
        this.res = res;

        apicache.clear('Boxes');

        return this.model.query('findByIdAndRemove', req.params.id)
            .then(this._sendResponse)
            .catch(err => {
                console.log(err);
            });
    }
};