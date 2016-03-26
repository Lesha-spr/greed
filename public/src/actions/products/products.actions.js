import alt from './../../alt';
import {API} from './../../APIs/products/products.api.js';

class ProductsActions {
    constructor() {
        this.generateActions(
            'closeModal',
            'alertProduct',
            'upsertProduct',
            'fetch',
            'successFetch',
            'delete',
            'successDelete',
            'post',
            'successPost',
            'put',
            'successPut',
            'error',
            'querySearch'
        );
    }
}

export default alt.createActions(ProductsActions);