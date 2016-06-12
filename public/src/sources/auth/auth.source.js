import AuthActions from './../../actions/auth/auth.actions.js';
import {API} from './auth.api.js';

export const AuthSource = {
    performRegistration: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'register'
                },
                init: {
                    headers: headers,
                    method: 'post',
                    body: JSON.stringify(body)
                }
            }).then(response => response.json());
        },

        success: AuthActions.successRegistration,
        error: AuthActions.error
    },

    performFetchLoginForm: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'login'
                },
                init: {
                    headers: headers,
                    method: 'get'
                }
            }).then(response => response.json());
        },

        local(state) {
            return state.toJS().loginForm;
        },

        success: AuthActions.successFetchLoginForm,
        error: AuthActions.error
    },

    performFetchRegistrationForm: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'register'
                },
                init: {
                    headers: headers,
                    method: 'get'
                }
            }).then(response => response.json());
        },

        local(state) {
            return state.toJS().registrationForm;
        },

        success: AuthActions.successFetchRegistrationForm,
        error: AuthActions.error
    },

    performLogin: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'login'
                },
                init: {
                    headers: headers,
                    method: 'post',
                    body: JSON.stringify(body)
                }
            }).then(response => response.json());
        },

        success: AuthActions.successLogin,
        error: AuthActions.error
    },

    performFetchUser: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'me'
                },
                init: {
                    headers: headers,
                    method: 'get'
                }
            }).then(response => response.json());
        },

        local(state) {
            return state.toJS().user;
        },

        success: AuthActions.successFetchUser,
        error: AuthActions.error
    },

    performLogout: {
        remote(state, body) {
            let headers = new Headers({
                'Accept': 'application/json',
                'Content-type': 'application/json'
            });

            return API.request({
                params: {
                    endpoint: 'logout'
                },
                init: {
                    headers: headers,
                    method: 'post'
                }
            }).then(response => response.text());
        },

        success: AuthActions.successLogout,
        error: AuthActions.error
    }
};