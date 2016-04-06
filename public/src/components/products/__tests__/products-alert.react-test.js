jest.unmock('./../products-alert.react.jsx');
jest.unmock('react-modal');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsAlert from './../products-alert.react.jsx';
import ProductsActions from './../../../actions/products/products.actions.js';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const product = {
    _id: 'id',
    title: 'title',
    price: 10,
    //category: 'category',
    image: {
        public_id: 'id'
    }
};

let productsAlert;

describe('ProductsAlert', () => {
    beforeEach(() => {
        productsAlert = TestUtils.renderIntoDocument(
            <ProductsAlert product={product}/>
        );
    });

    it('should close dialog on close button', () => {
        let closeButton = TestUtils.findRenderedDOMComponentWithClass(productsAlert, 'close-button');

        TestUtils.Simulate.click(closeButton);

        expect(DialogActions.close).toBeCalled();
    });

    it('should close dialog on cancel button', () => {
        let cancelButton = TestUtils.findRenderedDOMComponentWithClass(productsAlert, 'secondary');

        TestUtils.Simulate.click(cancelButton);

        expect(DialogActions.close).toBeCalled();
    });

    it('should call delete action and close dialog on submit', () => {
        let form = TestUtils.findRenderedDOMComponentWithTag(productsAlert, 'form');

        TestUtils.Simulate.submit(form);

        expect(ProductsActions.delete).toBeCalledWith(product);
        expect(DialogActions.close).toBeCalled();
    });
});