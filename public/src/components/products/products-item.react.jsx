import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsItem extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <section className='column'>
            <div className='callout'>
                <h5>{this.props.product.title}</h5>
                <button className='hollow button' onClick={ProductsActions.upsertProduct.bind(ProductsActions, this.props.product)}>Edit product</button>
                <div className='stat'>{this.props.product.price} &#8381;</div>
                <hr/>
                <img className='thumbnail' src={this.props.product.image} alt={this.props.product.title}/>
            </div>
        </section>;
    }
}

export default ProductsItem;