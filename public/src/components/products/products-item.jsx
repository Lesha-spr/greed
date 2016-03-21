import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsItem extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <article className='small-2 large-4 columns'>
            <h5>{this.props.product.title}</h5>
            <hr/>
            <button className='button' onClick={ProductsActions.upsertProduct.bind(ProductsActions, this.props.product)}>Edit product</button>
            <h6>{this.props.product.price} &#8381;</h6>
            <img src={this.props.product.image} alt={this.props.product.title}/>
        </article>;
    }
}

export default ProductsItem;