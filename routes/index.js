var express = require('express');
var router = express.Router();
var services = require('./services');
var authorization = require('./../helpers/auth');

router.use('/services', services);

router.use('/admin*', authorization, function(req, res, next) {
    res.render('admin', {title: 'Admin'});
});

/* SPA bitch! */
router.get('*', function(req, res, next) {
    res.render('index', {title: 'Greed'});
});

module.exports = router;