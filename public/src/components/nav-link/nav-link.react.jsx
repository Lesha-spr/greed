import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class NavLink extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <Link className='ui-link' activeClassName='ui-link_state_active' {...this.props}>{this.props.children}</Link>;
    }
}

export default NavLink;