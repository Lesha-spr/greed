jest.unmock('./../app.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {AppUnwrapped} from './../app.react.jsx';

const pendingClassName = 'app_state_pending';

describe('App', () => {
    it('should toggle pending className on async actions', () => {
        let app = TestUtils.renderIntoDocument(
            <AppUnwrapped pending={true}/>
        );

        expect(ReactDOM.findDOMNode(app).classList.contains(pendingClassName)).toBe(true);

        app = TestUtils.renderIntoDocument(
            <AppUnwrapped pending={false}/>
        );

        expect(ReactDOM.findDOMNode(app).classList.contains(pendingClassName)).toBe(false);
    });

    it('should render children', () => {
        let app = TestUtils.renderIntoDocument(
            <AppUnwrapped>
                <span className='test'>test child</span>
                <span className='test'>test child</span>
            </AppUnwrapped>
        );

        let children = TestUtils.scryRenderedDOMComponentsWithClass(app, 'test');

        expect(children.length).toBe(2);
    });
});