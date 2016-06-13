import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import inGroup from './../../helpers/inGroup/inGroup.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthUserControlsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className='button-group'>
            {inGroup(this.props.account, 'Admin') ? <a href='/admin' className='button hollow'>Admin</a> : null}
            <button onClick={AuthActions.logout} className='button'>Logout</button>
        </div>;
    }
}

AuthUserControlsUnwrapped.propTypes = {};

const AuthUserControls = AuthUserControlsUnwrapped;

export default AuthUserControls;