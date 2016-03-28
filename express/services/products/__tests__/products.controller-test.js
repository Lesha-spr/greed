require('babel-polyfill');

jest.unmock('./../products.controller.js');

const ProductsController = require('./../products.controller.js');
const ProductModelWrapper = require('./../product.model.wrapper');
const _ = require('lodash');

let instance;

describe('ProductsController', () => {
    beforeEach(() => {
        instance = new ProductsController();
        instance._sendRes = jest.fn();
    });

    it('should initialize with null res', () => {
        expect(instance.res).toBe(null);
    });

    pit('should call find model method and then send response', async () => {
        let expectData = [{a: 1}, {a: 2}];

        ProductModelWrapper.query = jest.fn(() => {
            return Promise.resolve(expectData);
        });

        await instance.get();

        expect(ProductModelWrapper.query).toBeCalledWith('find');
        expect(instance._sendRes).toBeCalledWith(expectData);
    });

    pit('should throw exception', async () => {
        let expectData = {};

        ProductModelWrapper.query = jest.fn(() => {
            return Promise.reject(expectData);
        });

        await instance.get();

        expect(ProductModelWrapper.query).toBeCalled();
        expect(instance._sendRes.mock.calls.length).toBe(0);
    });
});