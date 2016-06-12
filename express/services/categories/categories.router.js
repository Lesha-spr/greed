'use strict';

const Router = require('express').Router;
const CategoriesController = require('./categories.controller.js');
const stormpath = require('express-stormpath');

const categoriesCtrl = new CategoriesController();
let router = Router();

router
    .get('/', categoriesCtrl.get.bind(categoriesCtrl))
    .post('/', stormpath.groupsRequired(['Admin']), categoriesCtrl.post.bind(categoriesCtrl))
    .put('/:id', stormpath.groupsRequired(['Admin']), categoriesCtrl.put.bind(categoriesCtrl))
    .delete('/:id', stormpath.groupsRequired(['Admin']), categoriesCtrl.delete.bind(categoriesCtrl));

module.exports = router;