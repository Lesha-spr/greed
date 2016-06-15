jest.unmock('./../categories.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedCategoriesStore, {CategoriesStore as UnwrappedCategoriesStore} from './../categories.store.js';
import CategoriesActions from './../../../actions/categories/categories.actions.js';

const defaultState = {
    categories: [],
    shouldFetch: true
};

describe('CategoriesStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedCategoriesStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#fetch', () => {
        it('should get to categories', () => {
            let action = CategoriesActions.FETCH;
            let data = {};

            WrappedCategoriesStore.performFetch = jest.fn();

            spyOn(WrappedCategoriesStore, 'performFetch');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedCategoriesStore.performFetch).toHaveBeenCalledWith();
        });

        it('should set categories to state on success fetch', () => {
            let action = CategoriesActions.SUCCESS_FETCH;
            let data = [{
                _id: 0,
                title: 'mock'
            }, {
                _id: 1,
                title: 'mock'
            }];
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedCategoriesStore.getState().toJS();

            expect(state.categories).toEqual(data);
            expect(state.shouldFetch).toEqual(false);
        });
    });

    describe('#post', () => {
        it('should post to categories', () => {
            let action = CategoriesActions.POST;
            let data = {
                _id: 2,
                title: 'mock'
            };

            WrappedCategoriesStore.performPost = jest.fn();

            spyOn(WrappedCategoriesStore, 'performPost');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedCategoriesStore.performPost).toHaveBeenCalledWith(data);
        });

        it('should add category to state on success post', () => {
            let action = CategoriesActions.SUCCESS_POST;
            let data = {
                _id: 2,
                title: 'mock'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedCategoriesStore.getState().toJS();

            expect(state.categories[state.categories.length - 1]).toEqual(data);
        });
    });

    describe('#put', () => {
        it('should put to categories', () => {
            let action = CategoriesActions.PUT;
            let data = {
                _id: 1,
                title: 'mock_updated'
            };

            WrappedCategoriesStore.performPut = jest.fn();

            spyOn(WrappedCategoriesStore, 'performPut');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedCategoriesStore.performPut).toHaveBeenCalledWith(data);
        });

        it('should update category in state on success put', () => {
            let action = CategoriesActions.SUCCESS_PUT;
            let data = {
                _id: 1,
                title: 'mock_updated'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedCategoriesStore.getState().toJS();

            expect(state.categories.find(element => element._id === data._id).title).toEqual(data.title);
        });
    });

    describe('#delete', () => {
        it('should delete to categories', () => {
            let action = CategoriesActions.DELETE;
            let data = {
                _id: 1,
                title: 'mock_deleted'
            };

            WrappedCategoriesStore.performDelete = jest.fn();

            spyOn(WrappedCategoriesStore, 'performDelete');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedCategoriesStore.performDelete).toHaveBeenCalledWith(data);
        });

        it('should delete category in state on success delete', () => {
            let action = CategoriesActions.SUCCESS_DELETE;
            let data = {
                _id: 1,
                title: 'mock_deleted'
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedCategoriesStore.getState().toJS();

            expect(state.categories.find(element => element._id === data._id)).toBeUndefined();
        });
    });
});