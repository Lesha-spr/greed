import alt from './../../alt';
import AuthActions from './../../actions/auth/auth.actions.js';
import {AuthSource} from './../../sources/auth/auth.source.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class AuthStore {
    constructor() {
        this.state = Immutable.Map({
            showForm: null,
            user: null,
            loginForm: null,
            registrationForm: null
        });

        this.registerAsync(AuthSource);
        this.bindActions(AuthActions);
    }

    onClear() {
        this.setState(this.state.set('showForm', null));
    }

    onFetchUser() {
        this.getInstance().performFetchUser();
    }

    onSuccessFetchUser(user) {
        this.setState(this.state.set('user', user));
    }

    onFetchLoginForm() {
        if (!this.getInstance().isLoading()) {
            this.setState(this.state.set('showForm', 'loginForm'));
            this.getInstance().performFetchLoginForm();
        }
    }

    onSuccessFetchLoginForm(form) {
        this.setState(this.state.set('loginForm', form));
    }

    onFetchRegistrationForm() {
        if (!this.getInstance().isLoading()) {
            this.setState(this.state.set('showForm', 'registrationForm'));
            this.getInstance().performFetchRegistrationForm();
        }
    }

    onSuccessFetchRegistrationForm(form) {
        this.setState(this.state.set('registrationForm', form));
    }

    onRegistration(user) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performRegistration(user);
        }
    }

    onSuccessRegistration() {
        this.setState(this.state.set('showForm', null));
    }

    onLogin(user) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performLogin(user);
        }
    }

    onSuccessLogin(user) {
        this.setState(this.state.set('user', user).set('showForm', null));
    }

    onLogout() {
        this.getInstance().performLogout();
    }

    onSuccessLogout() {
        this.setState(this.state.set('user', null).set('showForm', null));
    }

    onError(error) {
        console.log(error);
    }
}

export default alt.createStore(immutable(AuthStore), 'AuthStore');