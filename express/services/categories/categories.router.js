'use strict';

const Router = require('express').Router;
const CategoriesController = require('./categories.controller.js');
const stormpath = require('express-stormpath');
const cache = require('apicache').options({debug: process.env.NODE_ENV === 'development'}).middleware;

const categoriesCtrl = new CategoriesController();
let router = Router();

router
    .get('/', cache('24 hours'), categoriesCtrl.get.bind(categoriesCtrl))
    .post('/', stormpath.groupsRequired(['Admin']), categoriesCtrl.post.bind(categoriesCtrl))
    .put('/:id', stormpath.groupsRequired(['Admin']), categoriesCtrl.put.bind(categoriesCtrl))
    .delete('/:id', stormpath.groupsRequired(['Admin']), categoriesCtrl.delete.bind(categoriesCtrl));

module.exports = router;