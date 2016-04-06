import React, {Component, PropTypes} from 'react';
import ProductsEdit from './products-edit.react.jsx';
import ProductsAlert from './products-alert.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {cl as cloudinary, options} from './../../helpers/cloudinary/cloudinary.js';

export class ProductsItemUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.alertProduct = this.alertProduct.bind(this);
        this.upsertProduct = this.upsertProduct.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    alertProduct(event) {
        event.preventDefault();

        DialogActions.open(<ProductsAlert product={this.props.product}/>);
    }

    upsertProduct(event) {
        event.preventDefault();

        DialogActions.open(<ProductsEdit product={this.props.product} categories={this.props.categories}/>);
    }

    render() {
        return <section className='column'>
            <div className='callout'>
                <h6>{this.props.product.title}</h6>
                <div className='button-group stacked-for-small small'>
                    <button className='button success' onClick={this.upsertProduct}>Edit</button>
                    <button className='button alert' onClick={this.alertProduct}>Delete</button>
                </div>
                <div className='stat'>{this.props.product.price} &#8381;</div>
                <hr/>
                <img className='thumbnail' src={cloudinary.url(this.props.product.image.public_id, Object.assign({}, options, {width: 400, height: 300}))} alt={this.props.product.title}/>
            </div>
        </section>;
    }
}

ProductsItemUnwrapped.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.shape({
            public_id: PropTypes.string.isRequired
        })
    }).isRequired
};

const ProductsItem = ProductsItemUnwrapped;

export default ProductsItem;