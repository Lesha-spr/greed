import alt from './../../alt';

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
            'querySearch',
            'clearQuery'
        );
    }
}

export default alt.createActions(ProductsActions);