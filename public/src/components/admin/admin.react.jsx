import React, {Component, PropTypes} from 'react';
import IndexLink from 'react-router/lib/IndexLink.js';
import DocumentTitle from 'react-document-title';
import {AppWrapper} from '../app-wrapper/app-wrapper.react.jsx';
import Menu from './../menu/menu.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_admin.scss';

export class AdminRootUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <DocumentTitle title='Admin'>
            <AppWrapper>
                <div className='row'>
                    <div className='columns'>
                        <h1><IndexLink to='/admin' className='ui-link' activeClassName='ui-link_state_active'>Admin</IndexLink></h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='small-12 large-3 columns'>
                        <Menu/>
                    </div>
                    <div className='small-12 large-9 columns'>
                        {this.props.children}
                    </div>
                </div>
            </AppWrapper>
        </DocumentTitle>;
    }
}

AdminRootUnwrapped.propTypes = {};

const AdminRoot = AdminRootUnwrapped;

export default AdminRoot;