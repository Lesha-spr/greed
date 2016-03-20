import React, {Component, PropTypes} from 'react';
import AsyncStore from './../../stores/async/async.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class Root extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div>
            Greed
        </div>;
    }
}

export default Root;