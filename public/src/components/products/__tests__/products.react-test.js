jest.unmock('./../products.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {ProductsUnwrapped} from './../products.react.jsx';
import ProductsActions from './../../../actions/products/products.actions.js';
import CategoriesActions from './../../../actions/categories/categories.actions.js';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const productsState = {
    products: [],
    query: '',
    queryProducts: [],
    shouldFetch: false
};
const categoriesState = {
    categories: []
};

let productsComponent, productsRendered;

describe('Products component', () => {
    beforeEach(() => {
        productsComponent = <ProductsUnwrapped productsState={productsState} categoriesState={categoriesState}/>;
    });

    it('should fetch products and categories on mount', () => {
        productsRendered = TestUtils.renderIntoDocument(productsComponent);

        expect(ProductsActions.fetch).toBeCalled();
        expect(CategoriesActions.fetch).toBeCalled();
    });

    it('should clear query on unmount', () => {
        let container = document.createElement('div');

        ReactDOM.render(productsComponent, container);
        ReactDOM.unmountComponentAtNode(container);

        expect(ProductsActions.clearQuery).toBeCalled();
    });
});