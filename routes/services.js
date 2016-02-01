var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('./../models/item');

router.get('/items', function(req, res, next) {
    Item.find().then(function(items) {
        res.send({
            items: items
        });
    });
});

module.exports = router;