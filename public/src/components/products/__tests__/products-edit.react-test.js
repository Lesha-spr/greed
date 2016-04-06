jest.unmock('./../products-edit.react.jsx');
jest.unmock('react-modal');
jest.unmock('react-validation');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProductsEdit from './../products-edit.react.jsx';

const product = {
    _id: 'id',
    title: 'title',
    price: 10,
    //category: 'category',
    image: {
        secure_url: 'url'
    }
};

describe('ProductsEdit', () => {
    it('should populate props on form controls', () => {
        let productsEdit = TestUtils.renderIntoDocument(
            <ProductsEdit product={product} />
        );

        let form = TestUtils.findRenderedDOMComponentWithClass(productsEdit, 'products__upsert');

        expect(form.elements._id.value).toBe(product._id);
        expect(form.elements.title.value).toBe(product.title);
        expect(form.elements.price.value).toBe(product.price.toString());
        // TODO: test after categories added
        //expect(form.elements.category.value).toBe(product.category);

        // NOTE: hacky cause input[type=file] is secured by browser so we can't set value to it
        expect(form.elements.image.value).toBe('');
    });
});