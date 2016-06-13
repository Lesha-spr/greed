import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './_header.scss';

export class HeaderUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <header className='header'>
            <div className='row'>
                <div className='columns'>
                    {this.props.children}
                </div>
            </div>
        </header>;
    }
}

HeaderUnwrapped.propTypes = {};

const Header = HeaderUnwrapped;

export default Header;