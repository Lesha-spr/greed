jest.unmock('./../categories.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedCategoriesStore, {CategoriesStore as UnwrappedCategoriesStore} from './../categories.store.js';
import CategoriesActions from './../../../actions/categories/categories.actions.js';

const initialState = {
    categories: [],
    shouldFetch: true
};

describe('CategoriesStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedCategoriesStore.getState().toJS()).toEqual(initialState);
    });
});