jest.unmock('./../async.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedAsyncStore, {AsyncStore as UnwrappedAsyncStore} from './../async.store.js';
import AsyncActions from './../../../actions/async/async.actions.js';

const defaultState = {
    pending: false
};

describe('AsyncStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedAsyncStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#toggle', () => {
        it('should set pending flag to state', () => {
            let action = AsyncActions.TOGGLE;
            let data = true;

            alt.dispatcher.dispatch({action, data});
            expect(WrappedAsyncStore.getState().toJS().pending).toBe(true);

            data = false;
            alt.dispatcher.dispatch({action, data});
            expect(WrappedAsyncStore.getState().toJS().pending).toBe(false);
        });
    });
});