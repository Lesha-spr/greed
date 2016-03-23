'use strict';

const productsRouter = require('./products/products.router.js');
const categoriesRouter = require('./categories/categories.router.js');

module.exports = {
    productsRouter,
    categoriesRouter
};