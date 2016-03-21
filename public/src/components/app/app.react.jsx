import React, {Component, PropTypes} from 'react';
import {NavLink} from './../nav-link/nav-link.react.jsx';
import Menu from './../menu/menu.react.jsx';
import AsyncStore from './../../stores/async/async.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';
import Immutable from 'immutable';
import classNames from 'classnames';

class App extends Component {
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

App = connectToStores(App);

export default App;