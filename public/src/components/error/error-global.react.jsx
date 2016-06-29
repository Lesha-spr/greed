import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ErrorStore from './../../stores/error/error.store.js';
import ErrorCallout from './error-callout.react.jsx';
import connectToStores from 'alt-utils/lib/connectToStores';

class ErrorGlobalUnwrapped extends Component {
    static getStores(props) {
        return [ErrorStore];
    }

    static getPropsFromStores(props) {
        return ErrorStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return this.props.error && <div className='row'>
            <div className='columns'>
                <ErrorCallout message={this.props.error.message}/>
            </div>
        </div>;
    }
}

ErrorGlobalUnwrapped.propTypes = {};

const ErrorGlobal = connectToStores(ErrorGlobalUnwrapped);

export default ErrorGlobal;