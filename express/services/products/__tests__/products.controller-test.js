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

    pit('should call find model method', async () => {
        let expectData = [{a: 1}, {a: 2}];

        ProductModelWrapper.find = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve(expectData);
            });
        });

        await instance.get();

        expect(ProductModelWrapper.find).toBeCalled();
        expect(instance._sendRes).toBeCalledWith(expectData);
    });
});