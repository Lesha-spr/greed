jest.unmock('./../auth.react.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {AuthUnwrapped} from './../auth.react.jsx';
import AuthLogin from './../auth-login.react.jsx';
import AuthRegistration from './../auth-registration.react.jsx';
import AuthActions from './../../../actions/auth/auth.actions.js';

const authState = {
    user: {},
    showForm: null,
    isFetched: false
};

let authComponent, authRendered, authNode;

describe('Auth component', () => {
    beforeEach(() => {
        authComponent = <AuthUnwrapped authState={authState}/>;
    });

    describe('#lifecycle', () => {
        it('should fetch user data on mount', () => {
            authRendered = TestUtils.renderIntoDocument(authComponent);

            expect(AuthActions.fetchUser).toBeCalled();
        });
    });

    describe('#component visibility', () => {
        it('should be rendered invisible before complete fetch user data', () => {
            authRendered = TestUtils.renderIntoDocument(authComponent);
            authNode = TestUtils.findRenderedDOMComponentWithClass(authRendered, 'auth');

            expect(authNode.classList.contains('invisible')).toBe(true);
        });

        it('should be rendered visible after complete fetch user data', () => {
            authComponent = <AuthUnwrapped authState={{
                user: {},
                isFetched: true,
                showForm: null
            }}/>;
            authRendered = TestUtils.renderIntoDocument(authComponent);
            authNode = TestUtils.findRenderedDOMComponentWithClass(authRendered, 'auth');

            expect(authNode.classList.contains('invisible')).toBe(false);
        });
    });

    describe('#render form', () => {
        it('should render login form of necessity', () => {
            let form;

            TestUtils.mockComponent(AuthLogin, 'login');
            authComponent = <AuthUnwrapped authState={{
                user: null,
                isFetched: true,
                showForm: 'loginForm',
                loginForm: {}
            }}/>;
            authRendered = TestUtils.renderIntoDocument(authComponent);
            form = TestUtils.findRenderedDOMComponentWithTag(authRendered, 'login');

            expect(form).toBeDefined();
        });

        it('should render registration form of necessity', () => {
            let form;

            TestUtils.mockComponent(AuthRegistration, 'registration');
            authComponent = <AuthUnwrapped authState={{
                user: null,
                isFetched: true,
                showForm: 'registrationForm',
                registrationForm: {}
            }}/>;
            authRendered = TestUtils.renderIntoDocument(authComponent);
            form = TestUtils.findRenderedDOMComponentWithTag(authRendered, 'registration');

            expect(form).toBeDefined();
        });

        it('should not render form on success fetch user data', () => {
            TestUtils.mockComponent(AuthLogin, 'login');
            TestUtils.mockComponent(AuthRegistration, 'registration');
            authComponent = <AuthUnwrapped authState={{
                user: {},
                isFetched: true,
                showForm: null,
                registrationForm: {}
            }}/>;
            authRendered = TestUtils.renderIntoDocument(authComponent);
            authNode = TestUtils.findRenderedDOMComponentWithClass(authRendered, 'auth');

            expect(authNode.querySelectorAll('login, registration').length).toBe(0);
        });
    });
});