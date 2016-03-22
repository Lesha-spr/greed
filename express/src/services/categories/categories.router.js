import {Router} from 'express';
import {CategoriesController} from './categories.controller.js';

let router = Router();
const categoriesCtrl = new CategoriesController();

router
    .get('/', categoriesCtrl.get.bind(categoriesCtrl))
    .post('/', categoriesCtrl.post.bind(categoriesCtrl))
    .put('/:id', categoriesCtrl.put.bind(categoriesCtrl));

export {router};