import alt from './../../alt';
import {API} from './../../APIs/categories/categories.api.js';

class CategoriesActions {
    constructor() {
        this.generateActions(
            'fetch',
            'successFetch',
            'error'
        );
    }
}

export default alt.createActions(CategoriesActions);