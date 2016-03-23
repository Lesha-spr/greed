'use strict';

const Category = require('./category.model.js');

module.exports = class CategoriesController {
    constructor() {}

    get(req, res, next) {
        Category.find().then(items => {
            res.json(items);
        });
    }

    post() {}

    put() {}
};