jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

describe('ProductsStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [], shouldFetch: true});
    });

    it('should listen for a fetch action', () => {
        let action = ProductsActions.FETCH;
        let data = [{product: 1}, {product: 2}];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [{product: 1}, {product: 2}], shouldFetch: false});

        data = [];
        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [], shouldFetch: false});
    });

    it('should listen for a post action', () => {
        let action = ProductsActions.POST;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [], shouldFetch: true});
    });

    it('should listen for a put action', () => {
        let action = ProductsActions.PUT;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS()).toEqual({products: [], shouldFetch: true});
    });
});