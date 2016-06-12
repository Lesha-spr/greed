'use strict';

const Router = require('express').Router;
const BoxesController = require('./boxes.controller.js');
const stormpath = require('express-stormpath');

const boxesCtrl = new BoxesController();
let router = Router();

router
    .get('/', boxesCtrl.get.bind(boxesCtrl))
    .post('/', stormpath.groupsRequired(['Admin']), boxesCtrl.post.bind(boxesCtrl))
    .put('/:id', stormpath.groupsRequired(['Admin']), boxesCtrl.put.bind(boxesCtrl))
    .delete('/:id', stormpath.groupsRequired(['Admin']), boxesCtrl.delete.bind(boxesCtrl));

module.exports = router;