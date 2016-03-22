import alt from './../../alt';
import {API} from './../../APIs/categories/categories.api.js';

class CategoriesActions {
    fetch() {
        return dispatch => {
            API.request().then(response => response.json()).then(data => {
                dispatch(data);
            });
        }
    }
}

export default alt.createActions(CategoriesActions);