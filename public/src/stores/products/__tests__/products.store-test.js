jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

const initialState = {
    products: [],
    product: {},
    isOpenModal: false,
    shouldFetch: false
};

describe('ProductsStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a toggleModal action', () => {
        let action = ProductsActions.TOGGLE_MODAL;
        let data = true;

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(true);

        data = false;

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(false);
    });

    it('should listen for a upsertProduct action', () => {
        let action = ProductsActions.UPSERT_PRODUCT;
        let data = {
            product: {
                _id: 'id',
                title: 'title',
                price: 100,
                category: 'category',
                image: '/link/to/image'
            },
            isOpenModal: true
        };

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(true);
        expect(WrappedProductsStore.getState().toJS().product).toEqual(data.product);

        data = {
            product: {},
            isOpenModal: false
        };

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().isOpenModal).toBe(false);
        expect(WrappedProductsStore.getState().toJS().product).toEqual(data.product);
    });

    it('should listen for a fetch action', () => {
        let action = ProductsActions.FETCH;
        let data = [{product: 1}, {product: 2}];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products).toEqual(data);

        data = [];
        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().products).toEqual(data);
    });

    it('should listen for a post action', () => {
        let action = ProductsActions.POST;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().shouldFetch).toBe(true);
    });

    it('should listen for a put action', () => {
        let action = ProductsActions.PUT;
        let data = {};

        alt.dispatcher.dispatch({action, data});
        expect(WrappedProductsStore.getState().toJS().shouldFetch).toBe(true);
    });
});