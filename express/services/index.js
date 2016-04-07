'use strict';

const productsRouter = require('./products/products.router.js');
const categoriesRouter = require('./categories/categories.router.js');
const boxesRouter = require('./boxes/boxes.router');

module.exports = {
    productsRouter,
    categoriesRouter,
    boxesRouter
};