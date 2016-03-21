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
            API.request().then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }

    post(formData) {
        return dispatch => {
            API.request({
                init: {
                    method: 'post',
                    body: formData
                }
            }).then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }

    put(formData, product) {
        return dispatch => {
            API.request({
                params: {
                    id: product._id
                },
                init: {
                    method: 'put',
                    body: formData
                }
            }).then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }
}

export default alt.createActions(ProductsActions);