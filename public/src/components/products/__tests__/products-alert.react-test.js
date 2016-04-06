jest.unmock('./../products-alert.react.jsx');
jest.unmock('react-modal');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsAlert from './../products-alert.react.jsx';
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

describe('ProductsAlert', () => {
    it('should close dialog on close button and cancel', () => {
        let productsAlert = TestUtils.renderIntoDocument(
            <ProductsAlert product={product}/>
        );

        let closeButton = TestUtils.findRenderedDOMComponentWithClass(productsAlert, 'close-button');
        let cancelButton = TestUtils.findRenderedDOMComponentWithClass(productsAlert, 'secondary');

        TestUtils.Simulate.click(closeButton);

        expect(DialogActions.close.mock.calls.length).toBe(1);

        TestUtils.Simulate.click(cancelButton);

        expect(DialogActions.close.mock.calls.length).toBe(2);
    });
});