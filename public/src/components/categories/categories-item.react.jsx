import React, {Component, PropTypes} from 'react';
import CategoriesEdit from './categories-edit.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class CategoriesItemUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<CategoriesEdit category={this.props.category}/>);
    }

    render() {
        return <section className='column'>
            <a onClick={this.onClick}><i className='fi-page-edit'></i> {this.props.category.title}</a>
        </section>;
    }
}

let CategoriesItem = CategoriesItemUnwrapped;

export default CategoriesItem;