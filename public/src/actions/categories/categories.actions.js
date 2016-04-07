import alt from './../../alt';

class CategoriesActions {
    constructor() {
        this.generateActions(
            'fetch',
            'successFetch',
            'post',
            'successPost',
            'put',
            'successPut',
            'error'
        );
    }
}

export default alt.createActions(CategoriesActions);