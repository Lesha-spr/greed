import alt from './../../alt';

class CategoriesActions {
    constructor() {
        this.generateActions(
            'fetch',
            'successFetch',
            'post',
            'successPost',
            'error'
        );
    }
}

export default alt.createActions(CategoriesActions);