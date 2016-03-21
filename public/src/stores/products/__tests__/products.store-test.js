jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

const initialState = {
    products: [],
    product: {},
    isOpenModal: false,
    shouldFetch: true
};
const staticState = {
    products: [],
    product: {},
    isOpenModal: false,
    shouldFetch: false
};

describe('ProductsStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a fetch action', () => {
        let action = ProductsActions.FETCH;
        let data = [{product: 1}, {product: 2}];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [{product: 1}, {product: 2}], product: {}, isOpenModal: false, shouldFetch: false});

        data = [];
        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual(staticState);
    });

    it('should listen for a post action', () => {
        let action = ProductsActions.POST;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a put action', () => {
        let action = ProductsActions.PUT;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });
});