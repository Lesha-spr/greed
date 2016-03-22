jest.unmock('./../categories.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedCategoriesStore, {CategoriesStore as UnwrappedCategoriesStore} from './../categories.store.js';
import CategoriesActions from './../../../actions/categories/categories.actions.js';

const initialState = {
    categories: []
};

describe('CategoriesStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedCategoriesStore.getState().toJS()).toEqual(initialState);
    });

    it('should listen for a fetch action', () => {
        let action = CategoriesActions.FETCH;
        let data = [{title: 1}, {title: 2}];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedCategoriesStore.getState().toJS().categories).toEqual(data);

        data = [];

        alt.dispatcher.dispatch({action, data});
        expect(WrappedCategoriesStore.getState().toJS().categories).toEqual(data);
    });
});