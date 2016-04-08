jest.unmock('./../products-alert.react.jsx');
jest.unmock('react-modal');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {ProductsAlertUnwrapped} from './../products-alert.react.jsx';
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

let productsAlertRendered;

describe('ProductsAlert component', () => {
    beforeEach(() => {
        productsAlertRendered = TestUtils.renderIntoDocument(
            <ProductsAlertUnwrapped product={product}/>
        );
    });

    it('should close dialog on close button', () => {
        let closeButton = TestUtils.findRenderedDOMComponentWithClass(productsAlertRendered, 'close-button');

        TestUtils.Simulate.click(closeButton);

        expect(DialogActions.close).toBeCalled();
    });

    it('should close dialog on cancel button', () => {
        let cancelButton = TestUtils.findRenderedDOMComponentWithClass(productsAlertRendered, 'secondary');

        TestUtils.Simulate.click(cancelButton);

        expect(DialogActions.close).toBeCalled();
    });

    it('should call delete action and close dialog on submit', () => {
        let form = TestUtils.findRenderedDOMComponentWithTag(productsAlertRendered, 'form');

        TestUtils.Simulate.submit(form);

        expect(ProductsActions.delete).toBeCalledWith(product);
        expect(DialogActions.close).toBeCalled();
    });
});