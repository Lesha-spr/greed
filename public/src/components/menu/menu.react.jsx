import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import './_menu.scss';

export class MenuUnwrapped extends Component {
    render() {
        return <ul className="menu menu_main vertical">
            <li><Link to='/admin/start/products' activeClassName='active'>Products</Link></li>
            <li><Link to='/admin/start/categories' activeClassName='active'>Categories</Link></li>
            <li><Link to='/admin/start/boxes' activeClassName='active'>Boxes</Link></li>
        </ul>;
    }
}

MenuUnwrapped.propTypes = {};

const Menu = MenuUnwrapped;

export default Menu;