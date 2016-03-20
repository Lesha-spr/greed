import {Router} from 'express';
import {ProductController} from './products.controller.js';

let router = Router();
const productsCtrl = new ProductController();

router
    .get('/', productsCtrl.get.bind(productsCtrl))
    .post('/', productsCtrl.post.bind(productsCtrl))
    .post('/:id', productsCtrl.post.bind(productsCtrl))
    .get('/:id', productsCtrl.get.bind(productsCtrl));

export {router};