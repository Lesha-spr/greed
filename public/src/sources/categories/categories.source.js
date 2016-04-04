import CategoriesActions from './../../actions/categories/categories.actions.js';
import {API} from './categories.api.js';

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
    },

    performPost: {
        remote(state, data) {
            return API.request({
                init: {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            }).then(response => response.json());
        },

        success: CategoriesActions.successPost,
        error: CategoriesActions.error
    }
};