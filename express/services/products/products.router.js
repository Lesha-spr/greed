'use strict';

const Router = require('express').Router;
const ProductController = require('./products.controller.js');

const productsCtrl = new ProductController();
let router = Router();

router
    .get('/', productsCtrl.get.bind(productsCtrl))
    .post('/', productsCtrl.post.bind(productsCtrl))
    .put('/:id', productsCtrl.put.bind(productsCtrl))
    .delete('/:id', productsCtrl.delete.bind(productsCtrl));

module.exports = router;