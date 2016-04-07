import React, {Component, PropTypes} from 'react';
import CategoriesEdit from './categories-edit.react.jsx';
import TopBar from './../top-bar/top-bar.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class CategoriesTopBarUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<CategoriesEdit/>);
    }

    render() {
        let menu = {
            leftItems: [<a onClick={this.onClick}><i className='fi-plus'></i> Add category</a>]
        };

        return <TopBar menu={menu}/>;
    }
}

CategoriesTopBarUnwrapped.propTypes = {};

const CategoriesTopBar = CategoriesTopBarUnwrapped;

export default CategoriesTopBar;