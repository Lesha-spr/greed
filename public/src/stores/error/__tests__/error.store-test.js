jest.unmock('./../error.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedErrorStore, {ErrorStore as UnwrappedErrprStore} from './../error.store.js';
import ErrorActions from './../../../actions/error/error.actions.js';

const defaultState = {
    error: null
};

describe('ErrorStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedErrorStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#show', () => {
        it('should set error to state', () => {
            let action = ErrorActions.SHOW;
            let data = {
                message: 'mock'
            };

            alt.dispatcher.dispatch({action, data});
            expect(WrappedErrorStore.getState().toJS().error.message).toBe(data.message);
        });
    });

    describe('#hide', () => {
        it('should set error state to null', () => {
            let action = ErrorActions.HIDE;
            let data = {};

            history.replaceState = jest.fn();

            alt.dispatcher.dispatch({action, data});

            expect(WrappedErrorStore.getState().toJS().error).toEqual(null);
        });
    });
});