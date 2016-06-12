import React, {Component, PropTypes} from 'react';
import DocumentTitle from 'react-document-title';
import {AppWrapper} from '../app-wrapper/app-wrapper.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <DocumentTitle title='Greed'>
            <AppWrapper>
                    <div className='row'>
                        <div className='columns'>
                            {this.props.children}
                        </div>
                    </div>
            </AppWrapper>
        </DocumentTitle>;
    }
}

export default App;