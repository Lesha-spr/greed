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

    pit('should resolve get flow', async () => {
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

    it('should convert data object of arrays to object with 0 indexed props', () => {
        let data = {
            ignoredProp: [],
            title: ['title'],
            prop: [1, 2, 3],
            prop2: [1, 2, 3]
        };

        expect(instance._prepareData(data)).toEqual({
            title: 'title',
            link: `/admin/start/products/title`,
            prop: 1,
            prop2: 1
        });
    });

    pit('should resolve post flow', async () => {
        instance._parseForm = jest.fn(() => {
            return Promise.resolve();
        });

        instance._uploadStatic = jest.fn(() => {
            return Promise.resolve();
        });

        instance._saveProduct = jest.fn(() => {
            return Promise.resolve();
        });

        await instance.post();

        await expect(instance._parseForm).toBeCalled();
        await expect(instance._uploadStatic).toBeCalled();
        await expect(instance._saveProduct).toBeCalled();

        expect(instance._sendRes.mock.calls.length).toBe(0);
    });

    pit('should resolve put flow', async () => {
        instance._parseForm = jest.fn(() => {
            return Promise.resolve();
        });

        instance._uploadStatic = jest.fn(() => {
            return Promise.resolve();
        });

        instance._updateProduct = jest.fn(() => {
            return Promise.resolve();
        });

        await instance.put();

        await expect(instance._parseForm).toBeCalled();
        await expect(instance._uploadStatic).toBeCalled();
        await expect(instance._updateProduct).toBeCalled();

        expect(instance._sendRes.mock.calls.length).toBe(0);
    });
});