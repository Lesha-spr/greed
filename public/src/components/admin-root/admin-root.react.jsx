import React, {Component, PropTypes} from 'react';
import {IndexLink} from 'react-router';
import Menu from './../menu/menu.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './_admin-root.scss';

class AdminRoot extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div id='root'>
            <div className='row'>
                <div className='large-12 columns'>
                    <h1><IndexLink to='/admin/start' className='ui-link' activeClassName='ui-link_state_active'>Admin</IndexLink></h1>
                </div>
            </div>
            <div className='row'>
                <div className='large-3 columns'>
                    <Menu/>
                </div>
                <div className='large-9 columns'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}

export default AdminRoot;