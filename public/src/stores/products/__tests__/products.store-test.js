jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

let initialState;

describe('ProductsStore', () => {
    beforeEach(() => {
        initialState = {
            products: [],
            shouldFetch: true,
            query: '',
            queryProducts: []
        };
    });

    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a fetch action', () => {
        let action = ProductsActions.SUCCESS_FETCH;
        let data = [{product: 1}, {product: 2}];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products).toEqual(data);

        data = [];
        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products).toEqual(data);
    });

    it('should listen for a post action', () => {
        let action = ProductsActions.SUCCESS_POST;
        let data = {
            _id: 1,
            title: 'title'
        };

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products[0]).toEqual(data);
    });

    it('should listen for a put action', () => {
        let action = ProductsActions.SUCCESS_PUT;
        let data = {
            _id: 1,
            title: 'new title'
        };

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products[0]).toEqual(data);
    });

    it('should clear query', () => {
        let action = ProductsActions.CLEAR_QUERY;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().queryProducts.length).toBe(0);
        expect(WrappedProductsStore.getState().toJS().query).toBe('');
    });
});