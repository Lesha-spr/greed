import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthUnauthorizedControlsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className='button-group'>
            <button onClick={AuthActions.fetchLoginForm} className='button'>Sign in</button>
            <button onClick={AuthActions.fetchRegistrationForm} className='button secondary'>Sign up</button>
        </div>;
    }
}

AuthUnauthorizedControlsUnwrapped.propTypes = {};

const AuthUnauthorizedControls = AuthUnauthorizedControlsUnwrapped;

export default AuthUnauthorizedControls;