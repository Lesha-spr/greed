import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import ErrorActions from './../../actions/error/error.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthUnauthorizedControlsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    fetchLoginForm() {
        AuthActions.fetchLoginForm();
        ErrorActions.hide();
    }

    fetchRegistrationForm() {
        AuthActions.fetchRegistrationForm();
        ErrorActions.hide();
    }

    render() {
        return <div className='button-group'>
            <button onClick={this.fetchLoginForm.bind(this)} className='button'>Sign in</button>
            <button onClick={this.fetchRegistrationForm.bind(this)} className='button secondary'>Sign up</button>
        </div>;
    }
}

AuthUnauthorizedControlsUnwrapped.propTypes = {};

const AuthUnauthorizedControls = AuthUnauthorizedControlsUnwrapped;

export default AuthUnauthorizedControls;