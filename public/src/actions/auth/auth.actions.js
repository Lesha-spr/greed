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
            'logout',
            'successLogout',
            'registration',
            'successRegistration',
            'fetchUser',
            'successFetchUser',
            'errorFetchUser',
            'error'
        );
    }
}

export default alt.createActions(AuthActions);