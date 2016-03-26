jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

const initialState = {
    products: [],
    product: {},
    isOpenModal: false,
    alert: false,
    shouldFetch: true
};

describe('ProductsStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a closeModal action', () => {
        let action = ProductsActions.CLOSE_MODAL;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(false);
    });

    it('should listen for a upsertProduct action', () => {
        let action = ProductsActions.UPSERT_PRODUCT;
        let data = {
            _id: 'id',
            title: 'title',
            price: 100,
            category: 'category',
            image: '/link/to/image'
        };

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(true);
        expect(WrappedProductsStore.getState().toJS().product).toEqual(data);

        data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(true);
        expect(WrappedProductsStore.getState().toJS().product).toEqual(data);
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
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().shouldFetch).toBe(true);
    });

    it('should listen for a put action', () => {
        let action = ProductsActions.SUCCESS_PUT;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().shouldFetch).toBe(true);
    });
});