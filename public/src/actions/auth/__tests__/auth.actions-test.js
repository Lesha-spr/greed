jest.unmock('./../auth.actions.js');

import alt from './../../../alt';
import AuthActions from './../auth.actions.js';

describe('AuthActions', () => {
    beforeEach(() => {
        alt.dispatcher.dispatch = jest.fn();
    });

    //it('should dispatch event with correct data', () => {
    //    AuthActions.toggle(true);
    //    AuthActions.toggle(false);
    //
    //    expect(alt.dispatcher.dispatch.mock.calls[0][0].action).toBe('AsyncActions.toggle');
    //    expect(alt.dispatcher.dispatch.mock.calls[0][0].data).toBe(true);
    //    expect(alt.dispatcher.dispatch.mock.calls[1][0].data).toBe(false);
    //});
});