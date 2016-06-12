import React, {Component, PropTypes} from 'react';
import AuthActions from './../../actions/auth/auth.actions.js';
import {Form, Input, Button} from 'react-validation';
import serialize from 'form-serialize';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthLoginUnwrapped extends Component {
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

        AuthActions.login(serialize(event.target, {hash: true}));
    }

    render() {
        if (!this.props.showForm || !this.props.loginForm) {
            return null;
        }

        return <Form autoComplete='off' onSubmit={this.onSubmit.bind(this)}>
            {this.props.loginForm.form.fields.map(field => {
                return <div className='row' key={field.name}>
                    <div className='column medium-3'>
                        <label htmlFor={field.name} className='text-right middle'>{field.label}</label>
                    </div>
                    <div className='column medium-9'>
                        <Input id={field.name} autoComplete='off' className='ui-input' validations={[{rule: 'isRequired'}]} name={field.name} type={field.type} placeholder={field.placeholder}/>
                    </div>
                </div>;
            })}
            <div className='row'>
                <div className='column medium-9 medium-offset-3'>
                    <div className='button-group'>
                        <Button className='button success' type='submit' value='Sign In'/>
                        <button onClick={this.onClear.bind(this)} className='button alert'>Cancel</button>
                    </div>
                </div>
            </div>
        </Form>;
    }
}

AuthLoginUnwrapped.propTypes = {};

const AuthLogin = AuthLoginUnwrapped;

export default AuthLogin;