import React, {Component, PropTypes} from 'react';
import Menu from './../menu/menu.react.jsx';

class AdminRoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            Greed Admin
            <Menu/>
            {this.props.children}
        </div>;
    }
}

export default AdminRoot;