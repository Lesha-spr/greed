jest.unmock('./../products-top-bar.react.jsx');
jest.unmock('./../../top-bar/top-bar.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {ProductsTopBarUnwrapped} from './../products-top-bar.react.jsx';
import ProductsEdit from './../products-edit.react.jsx';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const product = {};
const categories = [];

let productsTopBarRendered;

describe('ProductsTopBar component', () => {
    beforeEach(() => {
        productsTopBarRendered = TestUtils.renderIntoDocument(
            <ProductsTopBarUnwrapped product={product} categories={categories}/>
        );
    });

    it('should call open dialog action on add product button click', () => {
        let addNew = TestUtils.findRenderedDOMComponentWithTag(productsTopBarRendered, 'a');

        TestUtils.Simulate.click(addNew);

        expect(DialogActions.open).toBeCalledWith(<ProductsEdit hasExistingCategory={true} validateFile={true} product={product} categories={categories}/>);
    });
});