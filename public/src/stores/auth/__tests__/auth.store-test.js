jest.unmock('./../auth.store.js');

import alt from './../../../alt';
import Immutable from 'immutable';
import WrappedAuthStore, {AuthStore as UnwrappedAuthStore} from './../auth.store.js';
import AuthActions from './../../../actions/auth/auth.actions.js';

const defaultState = {
    showForm: null,
    user: null,
    loginForm: null,
    registrationForm: null,
    error: null,
    isFetched: false
};

describe('AuthStore', () => {
    it('should initialize with default state', () => {
        expect(WrappedAuthStore.getState().toJS()).toEqual(defaultState);
    });

    describe('#fetchUser', () => {
        it('should get to user', () => {
            let action = AuthActions.FETCH_USER;
            let data = {
                user: {}
            };

            WrappedAuthStore.performFetchUser = jest.fn();

            spyOn(WrappedAuthStore, 'performFetchUser');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedAuthStore.performFetchUser).toHaveBeenCalledWith();
        });

        it('should set user to state on success fetch', () => {
            let action = AuthActions.SUCCESS_FETCH_USER;
            let data = {
                account: {}
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.user).toEqual(data);
        });

        it('should set error to state on error fetch', () => {
            let action = AuthActions.ERROR_FETCH_USER;
            let data = {
                error: true
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.isFetched).toEqual(true);
            expect(state.error).toEqual(data);
        });
    });

    describe('#login', () => {
        it('should fetch login form', () => {
            let action = AuthActions.FETCH_LOGIN_FORM;
            let data = {};
            let state;

            WrappedAuthStore.performFetchLoginForm = jest.fn();

            spyOn(WrappedAuthStore, 'performFetchLoginForm');

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.showForm).toEqual('loginForm');
            expect(state.error).toEqual(null);

            expect(WrappedAuthStore.performFetchLoginForm).toHaveBeenCalledWith();
        });

        it('should set login form on success fetch', () => {
            let action = AuthActions.SUCCESS_FETCH_LOGIN_FORM;
            let data = {
                fields: []
            };
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.loginForm).toEqual(data);
        });

        it('should post to login', () => {
            let action = AuthActions.LOGIN;
            let data = {
                user: {}
            };

            WrappedAuthStore.performLogin = jest.fn();

            spyOn(WrappedAuthStore, 'performLogin');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedAuthStore.performLogin).toHaveBeenCalledWith(data);
        });
    });

    describe('#registration', () => {
        it('should fetch registration form', () => {
            let action = AuthActions.FETCH_REGISTRATION_FORM;
            let data = {};
            let state;

            WrappedAuthStore.performFetchRegistrationForm = jest.fn();

            spyOn(WrappedAuthStore, 'performFetchRegistrationForm');

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.showForm).toEqual('registrationForm');
            expect(state.error).toEqual(null);

            expect(WrappedAuthStore.performFetchRegistrationForm).toHaveBeenCalledWith();
        });

        it('should set registration form on success fetch', () => {
            let action = AuthActions.SUCCESS_FETCH_REGISTRATION_FORM;
            let data = {
                fields: []
            };
            let state;

            WrappedAuthStore.performRegistration = jest.fn();

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.registrationForm).toEqual(data);
        });

        it('should post to registration', () => {
            let action = AuthActions.REGISTRATION;
            let data = {
                user: {}
            };

            WrappedAuthStore.performRegistration = jest.fn();

            spyOn(WrappedAuthStore, 'performRegistration');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedAuthStore.performRegistration).toHaveBeenCalledWith(data);
        });
    });

    describe('#logout', () => {
        it('should post to logout', () => {
            let action = AuthActions.LOGOUT;
            let data = {
                user: {}
            };

            WrappedAuthStore.performLogout = jest.fn();

            spyOn(WrappedAuthStore, 'performLogout');

            alt.dispatcher.dispatch({action, data});

            expect(WrappedAuthStore.performLogout).toHaveBeenCalledWith();
        });

        it('should clear user data on success logout', () => {
            let action = AuthActions.SUCCESS_LOGOUT;
            let data = {};
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.showForm).toEqual(null);
            expect(state.user).toEqual(null);
        });

        it('should null form and error on clear action', () => {
            let action = AuthActions.CLEAR;
            let data = {};
            let state;

            alt.dispatcher.dispatch({action, data});

            state = WrappedAuthStore.getState().toJS();

            expect(state.showForm).toEqual(null);
            expect(state.error).toEqual(null);
        });
    });
});