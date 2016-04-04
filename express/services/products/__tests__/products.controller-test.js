require('babel-polyfill');

jest.unmock('./../products.controller.js');

const ProductsController = require('./../products.controller.js');
const cloudinary = require('./../../../helpers/cloudinary/cloudinary');
const _ = require('lodash');

let instance;

describe('ProductsController', () => {
    beforeEach(() => {
        instance = new ProductsController();
        instance._sendResponse = jest.fn();
    });

    it('should initialize with null res', () => {
        expect(instance.res).toBeNull();
    });

    pit('should throw exception', async () => {
        let expectData = {};

        instance.model.query = jest.fn(() => Promise.reject(expectData));

        await instance.get();

        expect(instance.model.query).toBeCalled();
        expect(instance._sendResponse.mock.calls.length).toBe(0);
    });

    it('should convert data object of arrays to object with 0 indexed props', () => {
        let mockData = {
            ignoredProp: [],
            title: ['title'],
            prop: [1, 2, 3],
            prop2: [1, 2, 3]
        };

        expect(instance._prepareData(mockData)).toEqual({
            title: 'title',
            link: `/admin/start/products/title`,
            prop: 1,
            prop2: 1
        });
    });

    pit('should resolve get flow', async () => {
        let expectData = [{a: 1}, {a: 2}];

        instance.model.query = jest.fn(() => Promise.resolve(expectData));

        await instance.get();

        expect(instance.model.query).toBeCalledWith('find');
        expect(instance._sendResponse).toBeCalledWith(expectData);
    });

    pit('should resolve post flow', async () => {
        instance._parseForm = jest.fn(() => Promise.resolve());

        instance._uploadStatic = jest.fn(() => Promise.resolve());

        instance._saveProduct = jest.fn(() => Promise.resolve());

        await instance.post();

        await expect(instance._parseForm).toBeCalled();
        await expect(instance._uploadStatic).toBeCalled();
        await expect(instance._saveProduct).toBeCalled();

        expect(instance._sendResponse.mock.calls.length).toBe(0);
    });

    pit('should resolve put flow', async () => {
        instance._parseForm = jest.fn(() => Promise.resolve());
        instance._uploadStatic = jest.fn(() => Promise.resolve());
        instance._updateProduct = jest.fn(() => Promise.resolve());

        await instance.put();

        await expect(instance._parseForm).toBeCalled();
        await expect(instance._uploadStatic).toBeCalled();
        await expect(instance._updateProduct).toBeCalled();

        expect(instance._sendResponse.mock.calls.length).toBe(0);
    });

    pit('should resolve delete flow', async () => {
        let mockReq = {
            params: {
                _id: 'id'
            }
        };

        instance.model.query = jest.fn(() => Promise.resolve());
        instance._destroyFile = jest.fn(() => Promise.resolve());
        instance._removeProduct = jest.fn(() => Promise.resolve());

        await instance.delete(mockReq);

        //await expect(instance._destroyFile).toBeCalled();
        //await expect(instance._removeProduct).toBeCalled();

        await expect(instance._destroyFile).toBeCalled();
        console.log(instance._removeProduct.mock.calls);
    });

    pit('should upload file to cloudinary', async () => {
        let mockName = 'name';
        let mockFormData = {};
        let mockFile = {size: 1, path: 'some/path'};

        mockFormData[mockName] = [];

        cloudinary.upload = jest.fn(() => Promise.resolve());

        await instance._uploadSingleFile(mockFormData, mockName, mockFile);

        expect(cloudinary.upload).toBeCalledWith('some/path');
    });

    pit('should destroy file from cloudinary', async () => {
        let mockProduct = {
            image: {
                public_id: 'id'
            }
        };

        cloudinary.delete = jest.fn(() => Promise.resolve());

        await instance._destroyFile(mockProduct);

        expect(cloudinary.delete).toBeCalledWith('id');
    });

    it('should upload 3 files', () => {
        let mockName = 'name';
        let mockData = {
            files: {}
        };
        let mockFormData = {};

        mockData.files[mockName] = [1, 2, 3];

        instance._uploadSingleFile = jest.fn(() => Promise.resolve());

        instance._uploadFiles(mockData, mockName, mockFormData);

        expect(instance._uploadSingleFile.mock.calls.length).toBe(3);
    });
});