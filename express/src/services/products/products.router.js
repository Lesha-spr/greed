import {Router} from 'express';
import {ProductController} from './products.controller.js';

let router = Router();
const productsCtrl = new ProductController();

router
    .get('/', productsCtrl.get.bind(productsCtrl))
    .post('/', productsCtrl.post.bind(productsCtrl))
    .put('/:id', productsCtrl.put.bind(productsCtrl));

export {router};