jest.unmock('./../products.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {ProductsUnwrapped} from './../products.react.jsx';
import ProductsActions from './../../../actions/products/products.actions.js';
import CategoriesActions from './../../../actions/categories/categories.actions.js';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const products = [];
const categories = [];
const query = '';
const queryProducts = [];
const shouldFetch = true;

let productsRendered;

describe('Products component', () => {
    beforeEach(() => {

    });

    it('should fetch products and categories on mount', () => {
        productsRendered = TestUtils.renderIntoDocument(
            <ProductsUnwrapped shouldFetch={shouldFetch} products={products} categories={categories} query={query} queryProducts={queryProducts}/>
        );

        expect(ProductsActions.fetch).toBeCalled();
        expect(CategoriesActions.fetch).toBeCalled();
    });

    it('should clear query on unmount', () => {
        let container = document.createElement('div');

        ReactDOM.render(<ProductsUnwrapped shouldFetch={shouldFetch} products={products} categories={categories} query={query} queryProducts={queryProducts}/>, container);
        ReactDOM.unmountComponentAtNode(container);

        expect(ProductsActions.clearQuery).toBeCalled();
    });
});