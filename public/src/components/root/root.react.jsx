import React, {Component, PropTypes} from 'react';
import App from './../app/app.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './_root.scss';

class Root extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <App>
            Greed
        </App>;
    }
}

export default Root;