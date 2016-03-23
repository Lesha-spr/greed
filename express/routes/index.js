'use strict';

const express = require('express');
const serviceRouter = require('./services.js');
const authorization = require('./../helpers/auth/index');

let router = express.Router();

router.use('/services', serviceRouter);

router.use('/admin*', authorization, (req, res, next) => {
    res.render('admin', {title: 'Admin'});
});

/* SPA bitch! */
router.get('*', (req, res, next) => {
    res.render('index', {title: 'Greed'});
});

module.exports = router;