import {Category} from './category.model.js';

export class CategoriesController {
    constructor() {}

    get(req, res, next) {
        Category.find().then(items => {
            res.json(items);
        });
    }

    post() {}

    put() {}
}