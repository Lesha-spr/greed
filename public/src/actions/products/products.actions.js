import alt from './../../alt';
import {API} from './../../APIs/products/products.api.js';

class ProductsActions {
    toggleModal(isOpen) {
        return dispatch => {
            dispatch(isOpen);
        }
    }

    upsertProduct(product = {}) {
        return dispatch => {
            dispatch({
                product,
                isOpenModal: true
            });
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

    error(error) {
        return dispatch => {
            dispatch(error);
        }
    }
}

export default alt.createActions(ProductsActions);