import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink.js';
import DocumentTitle from 'react-document-title';
import Header from './../header/header.react.jsx';
import Footer from './../footer/footer.react.jsx';
import Auth from './../auth/auth.react.jsx';
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
                <Header>
                    <h1><IndexLink to='/' className='ui-link' activeClassName='ui-link_state_active'>Greed</IndexLink></h1>
                </Header>
                <main className='main'>
                    <Auth/>
                    {this.props.children}
                </main>
                <Footer></Footer>
            </AppWrapper>
        </DocumentTitle>;
    }
}

export default App;