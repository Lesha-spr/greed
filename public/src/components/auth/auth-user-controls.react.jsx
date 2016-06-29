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
            {this.props.user.isEnabled() && this.props.user.isAdmin() && <a href='/admin' className='button'><span aria-hidden='true'><i className='fi-key'></i></span>&nbsp;&nbsp;Admin</a>}
            <button onClick={AuthActions.logout} className='button'><span aria-hidden='true'><i className='fi-skull'></i></span>&nbsp;&nbsp;Logout</button>
        </div>;
    }
}

AuthUserControlsUnwrapped.propTypes = {
    user: PropTypes.shape({
        account: PropTypes.shape({
            fullName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        }),
        isEnabled: PropTypes.func.isRequired,
        isAdmin: PropTypes.func.isRequired
    })
};

const AuthUserControls = AuthUserControlsUnwrapped;

export default AuthUserControls;