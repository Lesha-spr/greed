import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ErrorCalloutUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div className='alert callout small'>
            {this.props.message}
        </div>;
    }
}

ErrorCalloutUnwrapped.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired
};

const ErrorCallout = ErrorCalloutUnwrapped;

export default ErrorCallout;