import alt from './../../alt';

class CategoriesActions {
    constructor() {
        this.generateActions(
            'upsertCategory',
            'fetch',
            'successFetch',
            'error'
        );
    }
}

export default alt.createActions(CategoriesActions);