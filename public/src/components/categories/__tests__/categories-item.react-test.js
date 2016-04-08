jest.unmock('./../categories-item.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {CategoriesItemUnwrapped} from './../categories-item.react.jsx';
import {CategoriesEditUnwrapped} from './../categories-edit.react.jsx';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const category = {
    title: 'category',
    _id: 'id'
};

let categoriesItemRendered;

describe('CategoriesTopBar component', () => {
    beforeEach(() => {
        categoriesItemRendered = TestUtils.renderIntoDocument(
            <CategoriesItemUnwrapped category={category}/>
        );
    });

    it('should call open dialog action with CategoriesEdit component on edit category button click', () => {
        let addNew = TestUtils.findRenderedDOMComponentWithTag(categoriesItemRendered, 'a');

        TestUtils.Simulate.click(addNew);

        expect(DialogActions.open).toBeCalledWith(<CategoriesEditUnwrapped category={category}/>);
    });
});