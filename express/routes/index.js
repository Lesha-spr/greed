'use strict';

const express = require('express');
const serviceRouter = require('./services.js');
const stormpath = require('express-stormpath');

let router = express.Router();

router.use('/services', serviceRouter);

router.use('/admin*', stormpath.groupsRequired(['Admin']), (req, res, next) => {
    res.render('admin', {title: 'Admin'});
});

/* SPA bitch! */
router.use('*', (req, res, next) => {
    res.render('index', {title: 'Greed'});
});

module.exports = router;