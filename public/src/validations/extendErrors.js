import {extendErrors} from 'react-validation';
import validator from 'validator';

const defaultInvalidClassName = 'is-invalid-input';
const defaultHintClassName = 'form-error is-visible';
const defaultContainerClassName = 'ui-control-holder';

const isRequired = {
    message: 'required',
    rule: value => Boolean(validator.trim(value))
};

const isPrice = {
    rule: value => Number(value) > 0
};

const isEmail = {
    message: 'should be email'
};

export default extendErrors({
    defaultInvalidClassName,
    defaultHintClassName,
    defaultContainerClassName,
    isRequired,
    isPrice,
    isEmail
});