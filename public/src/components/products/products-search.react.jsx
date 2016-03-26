import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import debounce from 'lodash.debounce';

class ProductsSearchUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onChange = debounce(this.onChange.bind(this), 300);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    handleChange(event) {
        event.persist();

        this.onChange(event);
    }

    onChange(event) {
        ProductsActions.querySearch(event.target.value);
    }

    render() {
        return <input type='search' onChange={this.handleChange} placeholder='Search'/>;
    }
}

let ProductsSearch = ProductsSearchUnwrapped;

export default ProductsSearch;