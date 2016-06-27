jest.unmock('./../auth-controls.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {AuthControlsUnwrapped} from './../auth-controls.react.jsx';
import AuthUserControls from './../auth-user-controls.react.jsx';
import AuthUnauthorizedControls from './../auth-unauthorized-controls.react.jsx';

let authControlsComponent, authControlsRendered;

describe('AuthControls', () => {
    describe('#render controls', () => {
        it('should render auth user controls if state has user data', () => {
            let controls;

            authControlsComponent = <AuthControlsUnwrapped user={{}}/>;

            TestUtils.mockComponent(AuthUserControls, 'authUserControls');

            authControlsRendered = TestUtils.renderIntoDocument(authControlsComponent);
            controls = TestUtils.findRenderedDOMComponentWithTag(authControlsRendered, 'authUserControls');

            expect(controls).toBeDefined();
        });

        it('should render unauthorized controls if state has not user data', () => {
            let controls;

            authControlsComponent = <AuthControlsUnwrapped user={null}/>;

            TestUtils.mockComponent(AuthUnauthorizedControls, 'unauthUserControls');

            authControlsRendered = TestUtils.renderIntoDocument(authControlsComponent);
            controls = TestUtils.findRenderedDOMComponentWithTag(authControlsRendered, 'unauthUserControls');

            expect(controls).toBeDefined();
        });
    });
});