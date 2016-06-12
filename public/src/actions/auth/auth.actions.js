import alt from './../../alt';

class AuthActions {
    constructor() {
        this.generateActions(
            'clear',
            'fetchLoginForm',
            'successFetchLoginForm',
            'fetchRegistrationForm',
            'successFetchRegistrationForm',
            'showLoginForm',
            'showRegistrationForm',
            'login',
            'successLogin',
            'logout',
            'successLogout',
            'registration',
            'successRegistration',
            'fetchUser',
            'successFetchUser',
            'error'
        );
    }
}

export default alt.createActions(AuthActions);