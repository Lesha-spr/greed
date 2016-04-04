import React, {Component, PropTypes} from 'react';
import CategoriesEdit from './categories-edit.react.jsx';
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
        return <div className='top-bar'>
            <div className='top-bar-left'>
                <ul className='menu' role='menubar'>
                    <li><a onClick={this.onClick}><i className='fi-plus'></i> Add category</a></li>
                </ul>
            </div>
        </div>;
    }
}

let CategoriesTopBar = CategoriesTopBarUnwrapped;

export default CategoriesTopBar;