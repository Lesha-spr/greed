'use strict';

const Router = require('express').Router;
const routers = require('./../services');

let router = Router();

router.use('/products', routers.productsRouter);
router.use('/categories', routers.categoriesRouter);

module.exports = router;