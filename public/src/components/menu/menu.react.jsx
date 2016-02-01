import React, {Component, PropTypes} from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ul className="menu">
            <li><a href="#">One</a></li>
            <li><a href="#">Two</a></li>
            <li><a href="#">Three</a></li>
            <li><a href="#">Four</a></li>
        </ul>;
    }
}

export default Menu;