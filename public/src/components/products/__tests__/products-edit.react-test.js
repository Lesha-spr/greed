jest.unmock('./../products-edit.react.jsx');
jest.unmock('react-modal');
jest.unmock('react-validation');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsEdit from './../products-edit.react.jsx';
import ProductsActions from './../../../actions/products/products.actions.js';

const product = {
    _id: 'id',
    title: 'title',
    price: 10,
    //category: 'category',
    image: {
        secure_url: 'url'
    }
};

let productsEdit, form, inputId, inputTitle, inputPrice, inputImage;

describe('ProductsEdit', () => {
    beforeEach(() => {
        productsEdit = TestUtils.renderIntoDocument(
            <ProductsEdit product={product}/>
        );

        form = TestUtils.findRenderedDOMComponentWithClass(productsEdit, 'products__upsert');
        inputId = form.elements._id;
        inputTitle = form.elements.title;
        inputPrice = form.elements.price;
        inputImage = form.elements.image;
    });

    it('should populate props on form controls', () => {
        expect(inputId.value).toBe(product._id);
        expect(inputTitle.value).toBe(product.title);
        expect(inputPrice.value).toBe(product.price.toString());
        // TODO: test after categories added
        //expect(form.elements.category.value).toBe(product.category);

        // NOTE: hacky cause input[type=file] is secured by browser so we can't set value to it
        expect(inputImage.value).toBe('');
    });

    it('should call put action on editing product submit', () => {
        TestUtils.Simulate.submit(form);

        expect(ProductsActions.put).toBeCalled();
    });

    it('should call post action on new product submit', () => {
        productsEdit = TestUtils.renderIntoDocument(
            <ProductsEdit />
        );

        form = TestUtils.findRenderedDOMComponentWithClass(productsEdit, 'products__upsert');

        TestUtils.Simulate.submit(form);

        expect(ProductsActions.post).toBeCalled();
    });
});