import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsSearchUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onChange(event) {

    }

    render() {
        return <input type='search' onChange={this.onChange} placeholder='Search'/>;
    }
}

let ProductsSearch = ProductsSearchUnwrapped;

export default ProductsSearch;