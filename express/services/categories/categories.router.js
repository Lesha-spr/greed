'use strict';

const Router = require('express').Router;
const CategoriesController = require('./categories.controller.js');

const categoriesCtrl = new CategoriesController();
let router = Router();

router
    .get('/', categoriesCtrl.get.bind(categoriesCtrl))
    .post('/', categoriesCtrl.post.bind(categoriesCtrl))
    .put('/:id', categoriesCtrl.put.bind(categoriesCtrl));

module.exports = router;