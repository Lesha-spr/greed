jest.unmock('./../app-wrapper.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {AppWrapperUnwrapped} from './../app-wrapper.react.jsx';

const pendingClassName = 'app_state_pending';

describe('AppWrapper component', () => {
    it('should toggle pending className on async actions', () => {
        let app = TestUtils.renderIntoDocument(
            <AppWrapperUnwrapped pending={true}/>
        );

        expect(ReactDOM.findDOMNode(app).classList.contains(pendingClassName)).toBe(true);

        app = TestUtils.renderIntoDocument(
            <AppWrapperUnwrapped pending={false}/>
        );

        expect(ReactDOM.findDOMNode(app).classList.contains(pendingClassName)).toBe(false);
    });

    it('should render children', () => {
        let app = TestUtils.renderIntoDocument(
            <AppWrapperUnwrapped pending={false}>
                <span className='test'>test child</span>
                <span className='test'>test child</span>
            </AppWrapperUnwrapped>
        );

        let children = TestUtils.scryRenderedDOMComponentsWithClass(app, 'test');

        expect(children.length).toBe(2);
    });
});