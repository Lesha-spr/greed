'use strict';

const Router = require('express').Router;
const ProductsController = require('./products.controller.js');
const stormpath = require('express-stormpath');

const productsCtrl = new ProductsController();
let router = Router();

router
    .get('/', productsCtrl.get.bind(productsCtrl))
    .post('/', stormpath.groupsRequired(['Admin']), productsCtrl.post.bind(productsCtrl))
    .put('/:id', stormpath.groupsRequired(['Admin']), productsCtrl.put.bind(productsCtrl))
    .delete('/:id', stormpath.groupsRequired(['Admin']), productsCtrl.delete.bind(productsCtrl));

module.exports = router;