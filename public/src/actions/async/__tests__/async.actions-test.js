jest.unmock('./../async.actions.js');

import alt from './../../../alt';
import AsyncActions from './../async.actions.js';

describe('AsyncActions', () => {
    beforeEach(() => {
        alt.dispatcher.dispatch = jest.fn();
    });

    it('should dispatch event with correct data', () => {
        AsyncActions.toggle(true);
        AsyncActions.toggle(false);

        expect(alt.dispatcher.dispatch.mock.calls[0][0].action).toBe('AsyncActions.toggle');
        expect(alt.dispatcher.dispatch.mock.calls[0][0].data).toBe(true);
        expect(alt.dispatcher.dispatch.mock.calls[1][0].data).toBe(false);
    });

    it('should return true', () => {
        expect(true).toBe(true);
    });
});