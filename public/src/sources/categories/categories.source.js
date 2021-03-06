import CategoriesActions from './../../actions/categories/categories.actions.js';
import {API} from './categories.api.js';

export const CategoriesSource = {
    performFetch: {
        remote() {
            return API.request();
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
            });
        },

        success: CategoriesActions.successPost,
        error: CategoriesActions.error
    },

    performPut: {
        remote(state, data) {
            return API.request({
                params: {
                    id: data._id
                },
                init: {
                    method: 'put',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            });
        },

        success: CategoriesActions.successPut,
        error: CategoriesActions.error
    },

    performDelete: {
        remote(state, category) {
            return API.request({
                params: {
                    id: category._id
                },
                init: {
                    method: 'delete'
                }
            });
        },

        success: CategoriesActions.successDelete,
        error: CategoriesActions.error
    }
};