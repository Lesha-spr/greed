jest.unmock('./../categories-edit.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {CategoriesEditUnwrapped} from './../categories-edit.react.jsx';
import CategoriesAlert from './../categories-alert.react.jsx';
import CategoriesActions from './../../../actions/categories/categories.actions.js';
import DialogActions from './../../../actions/dialog/dialog.actions.js';

const category = {
    _id: 'id',
    title: 'title'
};

let categoriesEditRendered, form, inputId, inputTitle, buttons, buttonDel;

describe('CategoriesEdit component', () => {
    beforeEach(() => {
        categoriesEditRendered = TestUtils.renderIntoDocument(
            <CategoriesEditUnwrapped category={category}/>
        );

        form = TestUtils.findRenderedDOMComponentWithTag(categoriesEditRendered, 'form');
        inputId = form.elements._id;
        inputTitle = form.elements.title;
    });

    it('should populate form inputs with data', () => {
        expect(inputId.value).toBe(category._id);
        expect(inputTitle.value).toBe(category.title);
    });

    it('should render remove button only when there is existing category', () => {
        buttons = TestUtils.scryRenderedDOMComponentsWithTag(categoriesEditRendered, 'button');

        expect(buttons.length).toBe(3);

        categoriesEditRendered = TestUtils.renderIntoDocument(
            <CategoriesEditUnwrapped category={{}}/>
        );

        buttons = TestUtils.scryRenderedDOMComponentsWithTag(categoriesEditRendered, 'button');

        expect(buttons.length).toBe(2);
    });

    it('should open alert dialog on remove button click', () => {
        buttonDel = TestUtils.scryRenderedDOMComponentsWithTag(categoriesEditRendered, 'button')[0];

        TestUtils.Simulate.click(buttonDel);

        expect(DialogActions.open).toBeCalledWith(<CategoriesAlert category={category}/>);
    });

    it('should call put action on editing category submit', () => {
        TestUtils.Simulate.submit(form);

        expect(CategoriesActions.put).toBeCalled();
        expect(DialogActions.close).toBeCalled();
    });

    it('should call post action on new category submit', () => {
        categoriesEditRendered = TestUtils.renderIntoDocument(
            <CategoriesEditUnwrapped category={{}}/>
        );

        form = TestUtils.findRenderedDOMComponentWithTag(categoriesEditRendered, 'form');

        TestUtils.Simulate.submit(form);

        expect(CategoriesActions.post).toBeCalled();
        expect(DialogActions.close).toBeCalled();
    });
});