import alt from './../../alt';
import {API} from './../../APIs/products/products.api.js';

class ProductsActions {
    toggleModal(isOpen) {
        return dispatch => {
            dispatch(isOpen);
        }
    }

    alertProduct(product) {
        return dispatch => {
            dispatch(product);
        }
    }

    upsertProduct(product = {}) {
        return dispatch => {
            dispatch(product);
        }
    }

    fetch() {
        return dispatch => {
            dispatch();
        }
    }

    successFetch(products) {
        return dispatch => {
            dispatch(products);
        }
    }

    post(formData) {
        return dispatch => {
            dispatch(formData);
        }
    }

    successPost(product) {
        return dispatch => {
            dispatch(product);
        }
    }

    put(formData, product) {
        return dispatch => {
            dispatch({
                formData,
                product
            });
        }
    }

    successPut(product) {
        return dispatch => {
            dispatch(product);
        }
    }

    delete(product) {
        return dispatch => {
            dispatch(product);
        }
    }

    successDelete() {
        return dispatch => {
            dispatch();
        }
    }

    error(error) {
        return dispatch => {
            dispatch(error);
        }
    }
}

export default alt.createActions(ProductsActions);