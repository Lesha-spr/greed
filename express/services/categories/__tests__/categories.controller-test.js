jest.unmock('./../categories.controller.js');

import CategoriesController from './../categories.controller.js';

let instance;

describe('CategoriesController', () => {
    beforeEach(() => {
        instance = new CategoriesController();
        instance._sendResponse = jest.fn();
    });

    it('should initialize with null res', () => {
        expect(instance.res).toBeNull();
    });

    describe('#get', () => {
        pit('should resolve get flow', async () => {
            let expectData = [{a: 1}, {a: 2}];

            instance.model.query = jest.fn(() => Promise.resolve(expectData));

            await instance.get({});

            expect(instance.model.query).toBeCalledWith('find');
            expect(instance._sendResponse).toBeCalledWith(expectData);
        });

        pit('should not send response on error get', async () => {
            let expectData = {};

            instance.model.query = jest.fn(() => Promise.reject(expectData));

            await instance.get({});

            expect(instance.model.query).toBeCalled();
            expect(instance._sendResponse.mock.calls.length).toBe(0);
        });
    });

    describe('#post', () => {
        pit('should resolve post flow', async () => {
            let req = {
                body: {}
            };

            instance.model.query = jest.fn(() => Promise.resolve());

            await instance.post(req);

            expect(instance.model.query).toBeCalledWith('create', req.body);
            expect(instance._sendResponse).toBeCalled();
        });

        pit('should not send response on error post', async () => {
            let expectData = {};

            instance.model.query = jest.fn(() => Promise.reject(expectData));

            await instance.post({});

            expect(instance.model.query).toBeCalled();
            expect(instance._sendResponse.mock.calls.length).toBe(0);
        });
    });

    describe('#put', () => {
        pit('should resolve put flow', async () => {
            let req = {
                body: {
                    _id: 0
                }
            };

            instance.model.query = jest.fn(() => Promise.resolve());

            await instance.put(req);

            expect(instance.model.query).toBeCalledWith('findByIdAndUpdate', req.body._id, req.body, {new: true});
            expect(instance._sendResponse).toBeCalled();
        });

        pit('should not send response on error put', async () => {
            let req = {
                body: {
                    _id: 0
                }
            };

            instance.model.query = jest.fn(() => Promise.reject());

            await instance.put(req);

            expect(instance.model.query).toBeCalled();
            expect(instance._sendResponse.mock.calls.length).toBe(0);
        });
    });

    describe('#delete', () => {
        pit('should resolve delete flow', async () => {
            let req = {
                params: {
                    id: 0
                }
            };

            instance.model.query = jest.fn(() => Promise.resolve());

            await instance.delete(req);

            expect(instance.model.query).toBeCalledWith('findByIdAndRemove', req.params.id);
            expect(instance._sendResponse).toBeCalled();
        });

        pit('should not send response on error delete', async () => {
            let req = {
                params: {
                    id: 0
                }
            };

            instance.model.query = jest.fn(() => Promise.reject());

            await instance.delete(req);

            expect(instance.model.query).toBeCalled();
            expect(instance._sendResponse.mock.calls.length).toBe(0);
        });
    });
});