import React, {Component, PropTypes} from 'react';
import {NavLink} from './../nav-link/nav-link.react.jsx';
import Menu from './../menu/menu.react.jsx';
import AsyncStore from './../../stores/async/async.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import classNames from 'classnames';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = AsyncStore.getState().toJS();
        this.boundedMethods = {
            onAsync: this.onAsync.bind(this)
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        AsyncStore.listen(this.boundedMethods.onAsync);
    }

    componentWillUnmount() {
        AsyncStore.unlisten(this.boundedMethods.onAsync);
    }

    onAsync(immutableState) {
        this.setState(immutableState.toJS());
    }

    render() {
        let appClassName = classNames({
            'app': true,
            'app_state_pending': this.state.pending
        });

        return <div className={appClassName}>{this.props.children}</div>;
    }
}

export default App;