import React, {Component, PropTypes} from 'react';
import {Input} from 'react-validation';
import AuthActions from './../../actions/auth/auth.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class AuthFormFieldsUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div>
            {this.props.fields.map(field => {
                return <div className='row' key={field.name}>
                    <div className='column show-for-medium medium-3'>
                        <label htmlFor={field.name} className='medium-text-right middle'>{field.label}</label>
                    </div>
                    <div className='column small-12 medium-9'>
                        <Input id={field.name} autoComplete='off' className='ui-input' validations={[{rule: 'isRequired'}]} name={field.name} type={field.type} placeholder={field.placeholder}/>
                    </div>
                </div>;
            })}
        </div>;
    }
}

AuthFormFieldsUnwrapped.propTypes = {};

const AuthFormFields = AuthFormFieldsUnwrapped;

export default AuthFormFields;