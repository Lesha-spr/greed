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

    onFetch() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performFetch();
        }
    }

    onSuccessFetch(categories) {
        this.setState(this.state.set('categories', Immutable.fromJS(categories)).set('shouldFetch', false));
    }

    onPost(data) {
        this.getInstance().performPost(data);
    }

    onSuccessPost() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }
}

export default alt.createStore(immutable(CategoriesStore), 'CategoriesStore');