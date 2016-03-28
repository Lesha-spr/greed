jest.unmock('./../HTTPWrapper.js');
jest.unmock('./../__mock__/HTTPWrapper-mock.js');
jest.unmock('./../../WebResource/WebResource.js');

import 'babel-polyfill';
import 'whatwg-fetch';
import {HTTPWrapper} from './../HTTPWrapper.js';
import mockInstance from './../__mock__/HTTPWrapper-mock.js';
import AsyncActions from './../../../actions/async/async.actions.js';

let instance;

describe('HTTPWrapper', () => {
    beforeEach(() => {
        instance = new HTTPWrapper('/some/url/with/:param');
    });

    pit('should call associated actions and resolve promise with mock data', async () => {
        const data = await mockInstance.request();

        expect(AsyncActions.toggle.defer).toBeCalledWith(true);
        expect(data.mock).toBe(true);
        expect(AsyncActions.toggle.defer).toBeCalledWith(false);
    });
});