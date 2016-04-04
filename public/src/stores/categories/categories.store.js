import alt from './../../alt';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import {CategoriesSource} from './../../sources/categories/categories.source.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class CategoriesStore {
    constructor() {
        this.state = Immutable.Map({
            categories: Immutable.List(),
            shouldFetch: true
        });

        this.registerAsync(CategoriesSource);
        this.bindActions(CategoriesActions);
    }

    onUpsertCategory(category) {
        this.setState(this.state.set('category', category));
    }

    onFetch() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performFetch();
        }
    }

    onSuccessFetch(categories) {
        this.setState(this.state.set('categories', Immutable.fromJS(categories)).set('shouldFetch', false));
    }
}

export default alt.createStore(immutable(CategoriesStore), 'CategoriesStore');