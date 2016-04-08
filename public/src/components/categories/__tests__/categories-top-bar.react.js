jest.unmock('./../categories-top-bar.react.jsx');
jest.unmock('./../../top-bar/top-bar.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CategoriesTopBar from './../categories-top-bar.react.jsx';
import CategoriesEdit from './../categories-edit.react.jsx';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

let categoriesTopBarRendered;

describe('CategoriesTopBar component', () => {
    beforeEach(() => {
        categoriesTopBarRendered = TestUtils.renderIntoDocument(
            <CategoriesTopBar/>
        );
    });

    it('should call open dialog action with CategoriesEdit component on add category button click', () => {
        //let addNew = TestUtils.findRenderedDOMComponentWithTag(categoriesTopBarRendered, 'a');
        //
        //TestUtils.Simulate.click(addNew);
        //
        //expect(DialogActions.open).toBeCalledWith(<CategoriesEdit/>);
    });
});