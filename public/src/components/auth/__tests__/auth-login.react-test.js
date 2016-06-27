jest.unmock('./../auth-login.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import AuthActions from './../../../actions/auth/auth.actions.js';
import {AuthLoginUnwrapped} from './../auth-login.react.jsx';
import ErrorCallout from './../../error/error-callout.react.jsx';

const authState = {
    user: {},
    showForm: null,
    isFetched: false,
    loginForm: {
        form: {
            fields: [{
                label: 'mock',
                name: 'mock',
                placeholder: 'mock',
                type: 'text'
            }]
        }
    }
};

let authLoginComponent, authLoginRendered, authLoginNode;

describe('AuthLogin', () => {
    beforeEach(() => {
        authLoginComponent = <AuthLoginUnwrapped {...authState}/>;
    });

    describe('#render error', () => {
        it('should render error on error state', () => {
            let error;

            TestUtils.mockComponent(ErrorCallout, 'error');

            authLoginComponent = <AuthLoginUnwrapped error={{}} {...authState}/>;

            authLoginRendered = TestUtils.renderIntoDocument(authLoginComponent);
            error = TestUtils.findRenderedDOMComponentWithTag(authLoginRendered, 'error');

            expect(error).toBeDefined();
        });

        it('should not render error on normal state', () => {
            TestUtils.mockComponent(ErrorCallout, 'error');

            authLoginComponent = <AuthLoginUnwrapped error={null} {...authState}/>;

            authLoginRendered = TestUtils.renderIntoDocument(authLoginComponent);
            authLoginNode = TestUtils.findRenderedDOMComponentWithTag(authLoginRendered, 'form');

            expect(authLoginNode.querySelectorAll('error').length).toBe(0);
        });
    });

    describe('#actions', () => {
        it('should call post action on login form submit', () => {
            authLoginNode = TestUtils.findRenderedDOMComponentWithTag(authLoginRendered, 'form');

            TestUtils.Simulate.submit(authLoginNode);

            expect(AuthActions.login).toBeCalled();
        });

        it('should call clear action on login form cancel', () => {
            let cancelButtonNode = TestUtils.findRenderedDOMComponentWithClass(authLoginRendered, 'button alert');

            TestUtils.Simulate.click(cancelButtonNode);

            expect(AuthActions.clear).toBeCalled();
        });
    });
});