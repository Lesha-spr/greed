import alt from './../../alt';
import AuthActions from './../../actions/auth/auth.actions.js';
import {AuthSource} from './../../sources/auth/auth.source.js';
import User from './../../helpers/user/user.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class AuthStore {
    constructor() {
        this.state = Immutable.Map({
            showForm: null,
            user: null,
            loginForm: null,
            registrationForm: null,
            error: null,
            isFetched: false
        });

        this.registerAsync(AuthSource);
        this.bindActions(AuthActions);
    }

    onClear() {
        this.setState(this.state.set('showForm', null).set('error', null));
    }

    onFetchUser() {
        this.getInstance().performFetchUser();
    }

    onSuccessFetchUser(user) {
        this.setState(this.state.set('user', new User(user)).set('isFetched', true));
    }

    onErrorFetchUser(error) {
        this.setState(this.state.set('error', error instanceof Error ? null : error).set('isFetched', true));
    }

    onFetchLoginForm() {
        if (!this.getInstance().isLoading()) {
            this.setState(this.state.set('showForm', 'loginForm').set('error', null));
            this.getInstance().performFetchLoginForm();
        }
    }

    onSuccessFetchLoginForm(form) {
        this.setState(this.state.set('loginForm', form));
    }

    onFetchRegistrationForm() {
        if (!this.getInstance().isLoading()) {
            this.setState(this.state.set('showForm', 'registrationForm').set('error', null));
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

    onLogin(user) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performLogin(user);
        }
    }

    onLogout() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performLogout();
        }
    }

    onSuccessLogout() {
        this.setState(this.state.set('user', null).set('showForm', null));
    }

    onError(error) {
        if (!(error instanceof Error)) {
            this.setState(this.state.set('error', error));
        }
    }
}

export default alt.createStore(immutable(AuthStore), 'AuthStore');