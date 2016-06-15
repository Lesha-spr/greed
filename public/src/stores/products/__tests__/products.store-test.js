jest.unmock('./../products.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedProductsStore, {ProductsStore as UnwrappedProductsStore} from './../products.store.js';
import ProductsActions from './../../../actions/products/products.actions.js';

const defaultState = {
    products: [],
    shouldFetch: true,
    query: '',
    queryProducts: []
};

describe('ProductsStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedProductsStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#fetch', () => {
        it('should get to products', () => {
            let action = ProductsActions.FETCH;
            let data = {};

            WrappedProductsStore.performFetch = jest.fn();

            spyOn(WrappedProductsStore, 'performFetch');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedProductsStore.performFetch).toHaveBeenCalledWith();
        });

        it('should set products to state on success fetch', () => {
            let action = ProductsActions.SUCCESS_FETCH;
            let data = [{
                _id: 0,
                title: 'mock'
            }, {
                _id: 1,
                title: 'mock'
            }];
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.products).toEqual(data);
            expect(state.shouldFetch).toEqual(false);
        });
    });

    describe('#put', () => {
        it('should put to products', () => {
            let action = ProductsActions.PUT;
            let data = {
                data: 'data',
                formData: 'formData'
            };

            WrappedProductsStore.performPut = jest.fn();

            spyOn(WrappedProductsStore, 'performPut');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedProductsStore.performPut).toHaveBeenCalledWith(data.formData, data.data);
        });

        it('should update product to state on success put', () => {
            let action = ProductsActions.SUCCESS_PUT;
            let data = {
                _id: 0,
                title: 'mock_updated'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.products.find(element => element._id === data._id).title).toEqual(data.title);
        });
    });

    describe('#post', () => {
        it('should post to products', () => {
            let action = ProductsActions.POST;
            let data = {
                _id: 2,
                title: 'mock'
            };

            WrappedProductsStore.performPost = jest.fn();

            spyOn(WrappedProductsStore, 'performPost');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedProductsStore.performPost).toHaveBeenCalledWith(data);
        });

        it('should set products to state on success post', () => {
            let action = ProductsActions.SUCCESS_POST;
            let data = {
                _id: 2,
                title: 'mock'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.products[state.products.length - 1]).toEqual(data);
        });
    });

    describe('#delete', () => {
        it('should delete to products', () => {
            let action = ProductsActions.DELETE;
            let data = {
                _id: 1,
                title: 'mock_deleted'
            };

            WrappedProductsStore.performDelete = jest.fn();

            spyOn(WrappedProductsStore, 'performDelete');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedProductsStore.performDelete).toHaveBeenCalledWith(data);
        });

        it('should delete category in state on success delete', () => {
            let action = ProductsActions.SUCCESS_DELETE;
            let data = {
                _id: 1,
                title: 'mock_deleted'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.products.find(element => element._id === data._id)).toBeUndefined();
        });
    });

    describe('#querySearch', () => {
        it('should set products collection on empty search', () => {
            let action = ProductsActions.QUERY_SEARCH;
            let data = '';
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.queryProducts).toEqual(state.products);
        });

        it('should set reduced products collection on query search', () => {
            let action = ProductsActions.QUERY_SEARCH;
            let data = 'mock_updated';
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.queryProducts).not.toEqual(state.products);
            expect(state.query).toBe(data);
        });

        it('should clear query products on clear action', () => {
            let action = ProductsActions.CLEAR_QUERY;
            let data = {};
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedProductsStore.getState().toJS();

            expect(state.queryProducts.length).toBe(0);
            expect(state.query).toBe('');
        });
    });
});