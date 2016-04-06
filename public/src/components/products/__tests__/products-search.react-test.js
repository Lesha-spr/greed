jest.unmock('./../products-search.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsSearch from './../products-search.react.jsx';
import ProductsActions from './../../../actions/products/products.actions.js';

let productsSearch;

describe('productsSearch', () => {
    beforeEach(() => {
        productsSearch = TestUtils.renderIntoDocument(
            <ProductsSearch/>
        );
    });

    it('should call querySearch action with input value', () => {
        let search = TestUtils.findRenderedDOMComponentWithTag(productsSearch, 'input');

        search.value = 'search';
        TestUtils.Simulate.change(search);

        expect(ProductsActions.querySearch).not.toBeCalled();

        jest.runAllTimers();

        expect(ProductsActions.querySearch).toBeCalledWith('search');
    });
});