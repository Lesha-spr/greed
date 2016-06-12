import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthUserControlsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className='button-group'>
            <a href='/admin' className='button hollow'>Admin</a>
            <button onClick={AuthActions.logout} className='button'>Logout</button>
        </div>;
    }
}

AuthUserControlsUnwrapped.propTypes = {};

const AuthUserControls = AuthUserControlsUnwrapped;

export default AuthUserControls;