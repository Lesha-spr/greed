import alt from './../../alt';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class CategoriesStore {
    constructor() {
        this.state = Immutable.Map({
            categories: Immutable.List()
        });
        this.bindActions(CategoriesActions);
    }

    onFetch(categories) {
        this.setState(this.state.set('categories', Immutable.fromJS(categories)));
    }
}

export default alt.createStore(immutable(CategoriesStore), 'CategoriesStore');