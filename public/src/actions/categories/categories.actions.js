import alt from './../../alt';

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