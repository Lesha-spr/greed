jest.unmock('./../products-item.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsItem from './../products-item.react.jsx';
import ProductsAlert from './../products-alert.react.jsx';
import ProductsEdit from './../products-edit.react.jsx';
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

let productsItem;

describe('productsItem', () => {
    beforeEach(() => {
        productsItem = TestUtils.renderIntoDocument(
            <ProductsItem product={product}/>
        );
    });

    it('should open edit dialog with edit component on edit button click', () => {
        let editButton = TestUtils.findRenderedDOMComponentWithClass(productsItem, 'success');

        TestUtils.Simulate.click(editButton);

        expect(DialogActions.open).toBeCalledWith(<ProductsEdit product={product}/>);
    });

    it('should open edit dialog with alert component on delete button click', () => {
        let alertButton = TestUtils.findRenderedDOMComponentWithClass(productsItem, 'alert');

        TestUtils.Simulate.click(alertButton);

        expect(DialogActions.open).toBeCalledWith(<ProductsAlert product={product}/>);
    });
});