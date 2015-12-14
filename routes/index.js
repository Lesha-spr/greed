var express = require('express');
var router = express.Router();

/* SPA bitch! */
router.get('*', function(req, res, next) {
  res.render('index', {title: 'Greed'});
});

module.exports = router;