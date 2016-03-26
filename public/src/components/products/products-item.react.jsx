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
                <div className='button-group'>
                    <button className='button success' onClick={ProductsActions.upsertProduct.bind(ProductsActions, this.props.product)}>Edit</button>
                    <button className='button alert' onClick={ProductsActions.alertProduct.bind(ProductsActions, this.props.product)}>Delete</button>
                </div>
                <div className='stat'>{this.props.product.price} &#8381;</div>
                <hr/>
                <img className='thumbnail' src={this.props.product.image.secure_url} alt={this.props.product.title}/>
            </div>
        </section>;
    }
}

export default ProductsItem;