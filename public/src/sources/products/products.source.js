import ProductsActions from './../../actions/products/products.actions.js';
import {API} from './products.api.js';

export const ProductsSource = {
    performFetch: {
        remote() {
            return API.request();
        },

        local(state) {
            let localProducts = state.toJS().products;

            return localProducts.length ? localProducts : null;
        },

        success: ProductsActions.successFetch,
        error: ProductsActions.error,

        shouldFetch(state) {
            return state.toJS().shouldFetch;
        }
    },

    performPost: {
        remote(state, formData) {
            return API.request({
                init: {
                    method: 'post',
                    body: formData
                }
            });
        },

        success: ProductsActions.successPost,
        error: ProductsActions.error
    },

    performPut: {
        remote(state, formData, product) {
            return API.request({
                params: {
                    id: product._id
                },
                init: {
                    method: 'put',
                    body: formData
                }
            });
        },

        success: ProductsActions.successPut,
        error: ProductsActions.error
    },

    performDelete: {
        remote(state, product) {
            return API.request({
                params: {
                    id: product._id
                },
                init: {
                    method: 'delete'
                }
            });
        },

        success: ProductsActions.successDelete,
        error: ProductsActions.error
    }
};