import React, {Component, PropTypes} from 'react';
import ProductsEdit from './products-edit.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import ProductsSearch from './products-search.react.jsx';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class ProductsTopBarUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<ProductsEdit product={this.props.product}/>);
    }

    render() {
        return <div className='top-bar'>
            <div className='top-bar-left'>
                <ul className='menu' role='menubar'>
                    <li><a onClick={this.onClick}><i className='fi-plus'></i> Add product</a></li>
                </ul>
            </div>
            <div className='top-bar-right'>
                <ul className='menu'>
                    <li><ProductsSearch/></li>
                </ul>
            </div>
        </div>;
    }
}

let ProductsTopBar = ProductsTopBarUnwrapped;

export default ProductsTopBar;