'use strict';

const Product = require('./product.model');

module.exports = {
    create(data) {
        return new Product(data);
    },

    query(method) {
        let args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

        return Product[method].apply(Product, args);
    }
};