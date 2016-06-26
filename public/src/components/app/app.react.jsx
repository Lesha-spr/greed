import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink.js';
import DocumentTitle from 'react-document-title';
import Header from './../header/header.react.jsx';
import Footer from './../footer/footer.react.jsx';
import ErrorGlobal from './../error/error-global.react.jsx';
import Auth from './../auth/auth.react.jsx';
import ErrorActions from './../../actions/error/error.actions.js';
import {AppWrapper} from '../app-wrapper/app-wrapper.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        if (this.props.location && this.props.location.query && this.props.location.query.next) {
            ErrorActions.show({
                message: <div>You should be logged in to view <b>{this.props.location.query.next}</b> route</div>
            });
        }
    }

    render() {
        return <DocumentTitle title='Greed'>
            <AppWrapper>
                <Header>
                    <h1><IndexLink to='/' className='ui-link' activeClassName='ui-link_state_active'>Greed</IndexLink></h1>
                </Header>
                <main className='main'>
                    <ErrorGlobal/>
                    <Auth/>
                    {this.props.children}
                </main>
                <Footer></Footer>
            </AppWrapper>
        </DocumentTitle>;
    }
}

export default App;