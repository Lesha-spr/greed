import React, {Component, PropTypes} from 'react';
import {AppWrapper} from '../app-wrapper/app-wrapper.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <AppWrapper>
            Greed
        </AppWrapper>;
    }
}

export default App;