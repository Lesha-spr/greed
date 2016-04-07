'use strict';

const Router = require('express').Router;
const BoxesController = require('./boxes.controller.js');

const boxesCtrl = new BoxesController();
let router = Router();

router
    .get('/', boxesCtrl.get.bind(boxesCtrl))
    .post('/', boxesCtrl.post.bind(boxesCtrl))
    .put('/:id', boxesCtrl.put.bind(boxesCtrl))
    .delete('/:id', boxesCtrl.delete.bind(boxesCtrl));

module.exports = router;