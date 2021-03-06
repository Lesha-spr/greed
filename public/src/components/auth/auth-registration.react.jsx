import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import {Form, Button} from 'react-validation';
import AuthFormFields from './auth-form-fields.react.jsx';
import ErrorCallout from './../error/error-callout.react.jsx';
import serialize from 'form-serialize';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthRegistrationUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClear(event) {
        event.preventDefault();

        AuthActions.clear();
    }

    onSubmit(event) {
        event.preventDefault();

        AuthActions.registration(serialize(event.target, {hash: true}));
    }

    render() {
        return <Form autoComplete='off' onSubmit={this.onSubmit.bind(this)}>
            <AuthFormFields fields={this.props.registrationForm.form.fields}/>
            <div className='row'>
                <div className='column medium-9 medium-offset-3'>
                    {this.props.error && <ErrorCallout {...this.props.error}/>}
                    <div className='button-group'>
                        <Button className='button success' type='submit' value='Sign Up'/>
                        <button onClick={this.onClear.bind(this)} className='button alert'>Cancel</button>
                    </div>
                </div>
            </div>
        </Form>;
    }
}

AuthRegistrationUnwrapped.propTypes = {
    registrationForm: PropTypes.shape({
        form: PropTypes.shape({
            fields: PropTypes.arrayOf(PropTypes.shape({
                label: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                placeholder: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired
            }).isRequired).isRequired
        }).isRequired
    }).isRequired
};

const AuthRegistration = AuthRegistrationUnwrapped;

export default AuthRegistration;