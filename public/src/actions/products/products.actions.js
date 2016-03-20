import alt from './../../alt';
import {API} from './../../APIs/products/products.api.js';

class ProductsActions {
    fetch() {
        return dispatch => {
            API.request().then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }

    post(product) {
        return dispatch => {
            API.request({
                init: {
                    method: 'post',
                    body: product
                }
            }).then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }
}

export default alt.createActions(ProductsActions);