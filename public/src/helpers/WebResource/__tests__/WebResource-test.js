jest.unmock('./../WebResource.js');
jest.unmock('./../__mock__/WebResource-mock.js');
jest.unmock('parse-route');

import 'whatwg-fetch';
import {WebResource} from './../WebResource.js';
import mockInstance from './../__mock__/WebResource-mock.js';

let instance;

describe('WebApi', () => {
    beforeEach(() => {
        instance = new WebResource('/some/url/with/:param', {query: {a: 1, b: 2}, params: {param: 3}});
    });

    it('should create instance with api and defaults', () => {
        expect(instance.api).toBe('/some/url/with/:param');
        expect(instance.defaults.query.a).toBe(1);
    });

    it('should return promise on request call', () => {
        expect(mockInstance.request() instanceof Promise).toBe(true);
    });

    pit('should resolve promise with mock data', () => {
        return mockInstance.request().then(data => {
            expect(data.mock).toBe(true);
        });
    });
});