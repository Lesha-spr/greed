import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import AuthActions from './../../actions/auth/auth.actions.js';
import AuthStore from './../../stores/auth/auth.store.js';
import AuthControls from './auth-controls.react.jsx';
import AuthLogin from './auth-login.react.jsx';
import AuthRegistration from './auth-registration.react.jsx';
import connectToStores from 'alt-utils/lib/connectToStores';

export class AuthUnwrapped extends Component {
    static getStores(props) {
        return [AuthStore];
    }

    static getPropsFromStores(props) {
        return {
            authState: AuthStore.getState().toJS()
        }
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        AuthActions.fetchUser();
    }

    render() {
        let forms = {
            loginForm: this.props.authState.loginForm ? <AuthLogin {...this.props.authState}/> : null,
            registrationForm: this.props.authState.registrationForm ? <AuthRegistration {...this.props.authState}/> : null
        };
        let classnames = classNames({
            'auth': true,
            'invisible': !this.props.authState.isFetched
        });

        return <div className={classnames}>
            <div className='row'>
                <div className='column small-12 medium-6'>
                    <AuthControls {...this.props.authState}/>
                    {!this.props.authState.user ? forms[this.props.authState.showForm] : null}
                </div>
            </div>
        </div>;
    }
}

const Auth = connectToStores(AuthUnwrapped);

export default Auth;