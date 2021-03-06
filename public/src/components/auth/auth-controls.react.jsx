import React, {Component, PropTypes} from 'react';
import AuthUserControls from './auth-user-controls.react.jsx';
import AuthUnauthorizedControls from './auth-unauthorized-controls.react.jsx';
import AuthActions from './../../actions/auth/auth.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class AuthControlsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return this.props.user ? <AuthUserControls {...this.props}/> : <AuthUnauthorizedControls/>;
    }
}

AuthControlsUnwrapped.propTypes = {};

const AuthControls = AuthControlsUnwrapped;

export default AuthControls;