import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsAlertUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        ProductsActions.delete(this.props.product);
        ProductsActions.toggleModal(false);
    }

    render() {
        return <form onSubmit={this.onSubmit}>
            <h3>Are you sure you want to delete {this.props.product.title}?</h3>
            <div className='button-group'>
                <button type='submit' className='alert button'>Delete</button>
                <a className='secondary button' onClick={ProductsActions.toggleModal.bind(ProductsActions, false)}>Cancel</a>
            </div>
            <button className='close-button' type='button' onClick={ProductsActions.toggleModal.bind(ProductsActions, false)}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </form>;
    }
}

let ProductsAlert = ProductsAlertUnwrapped;

export default ProductsAlert;