import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsItem extends Component {
    constructor(props) {
        super(props);

        this.alertProduct = this.alertProduct.bind(this);
        this.upsertProduct = this.upsertProduct.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    alertProduct() {
        ProductsActions.alertProduct(this.props.product);
    }

    upsertProduct() {
        ProductsActions.upsertProduct(this.props.product);
    }

    render() {
        return <section className='column'>
            <div className='callout'>
                <h5>{this.props.product.title}</h5>
                <div className='button-group stacked-for-small'>
                    <button className='button success' onClick={this.upsertProduct}>Edit</button>
                    <button className='button alert' onClick={this.alertProduct}>Delete</button>
                </div>
                <div className='stat'>{this.props.product.price} &#8381;</div>
                <hr/>
                <img className='thumbnail' src={this.props.product.image.secure_url} alt={this.props.product.title}/>
            </div>
        </section>;
    }
}

export default ProductsItem;