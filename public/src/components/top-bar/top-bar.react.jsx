import React, {Component, PropTypes} from 'react';

const renderList = (array) => {
    return array && array.length && <ul className='menu' role='menubar'>
        {array.map((item, key) => <li key={key}>{item}</li>)}
    </ul>
};

export class TopBarUnwrapped extends Component {
    render() {
        return <div className='top-bar'>
            <div className='top-bar-left'>
                {renderList(this.props.menu.leftItems)}
            </div>
            <div className='top-bar-right'>
                {renderList(this.props.menu.rightItems)}
            </div>
        </div>;
    }
}

TopBarUnwrapped.propTypes = {};

const TopBar = TopBarUnwrapped;

export default TopBar;