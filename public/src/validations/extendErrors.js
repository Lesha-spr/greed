import {extendErrors, validator} from 'react-validation';

const defaultHintClassName = 'ui-error-hint';
const defaultContainerClassName = 'ui-control-holder';

const isRequired = {
    message: 'required',
    rule: value => Boolean(validator.trim(value))
};

const isPrice = {
    rule: value => Number(value) > 0
};

export default extendErrors({
    defaultHintClassName,
    defaultContainerClassName,
    isRequired,
    isPrice
});