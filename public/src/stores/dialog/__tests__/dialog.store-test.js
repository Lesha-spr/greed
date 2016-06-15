jest.unmock('./../dialog.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedDialogStore, {DialogStore as UnwrappedDialogStore} from './../dialog.store.js';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const defaultState = {
    isOpen: false,
    content: null
};

describe('DialogStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedDialogStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#open', () => {
        it('should open and set content to state', () => {
            let action = DialogActions.OPEN;
            let data = 'mock content';
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedDialogStore.getState().toJS();

            expect(state.content).toEqual(data);
            expect(state.isOpen).toEqual(true);
        });
    });

    describe('#close', () => {
        it('should close and null state', () => {
            let action = DialogActions.CLOSE;
            let data = 'mock content';
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedDialogStore.getState().toJS();

            expect(state).toEqual(defaultState);
        });
    });
});