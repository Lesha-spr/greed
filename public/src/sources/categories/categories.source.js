import CategoriesActions from './../../actions/categories/categories.actions.js';
import {API} from './../../APIs/products/products.api.js';

export const CategoriesSource = {
    performFetch: {
        remote() {
            return API.request().then(response => response.json());
        },

        local(state) {
            let localCategories = state.toJS().categories;

            return localCategories.length ? localCategories : null;
        },

        success: CategoriesActions.successFetch,
        error: CategoriesActions.error,

        shouldFetch(state) {
            return state.toJS().shouldFetch;
        }
    }
};