import React, {Component, PropTypes} from 'react';
import AsyncStore from './../../stores/async/async.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';
import classNames from 'classnames';
import './_app-wrapper.scss';

export class AppWrapperUnwrapped extends Component {
    static getStores(props) {
        return [AsyncStore];
    }

    static getPropsFromStores(props) {
        return AsyncStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let appClassName = classNames({
            'app': true,
            'app_state_pending': this.props.pending
        });

        return <div className={appClassName}>{this.props.children}</div>;
    }
}

AppWrapperUnwrapped.propTypes = {
    pending: PropTypes.bool.isRequired
};

const AppWrapper = connectToStores(AppWrapperUnwrapped);

export default AppWrapper;