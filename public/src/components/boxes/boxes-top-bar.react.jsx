import React, {Component, PropTypes} from 'react';
import BoxesEdit from './boxes-edit.react.jsx';
import TopBar from './../top-bar/top-bar.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class BoxesTopBarUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<BoxesEdit/>);
    }

    render() {
        let menu = {
            leftItems: [<a onClick={this.onClick}><i className='fi-plus'></i> Add box</a>]
        };

        return <TopBar menu={menu}/>;
    }
}

BoxesTopBarUnwrapped.propTypes = {};

const BoxesTopBar = BoxesTopBarUnwrapped;

export default BoxesTopBar;