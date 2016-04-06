import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import DialogActions from './../../actions/dialog/dialog.actions.js';
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
        DialogActions.close();
    }

    render() {
        return <form className='product__remove' onSubmit={this.onSubmit}>
            <h3>Delete product</h3>
            <p>Are you sure you want to delete <b>&laquo;{this.props.product.title}&raquo;</b>?</p>
            <div className='button-group'>
                <button type='submit' className='alert button'>Delete</button>
                <a className='secondary button' onClick={DialogActions.close}>Cancel</a>
            </div>
            <button className='close-button' type='button' onClick={DialogActions.close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </form>;
    }
}

ProductsAlertUnwrapped.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.shape({
            public_id: PropTypes.string.isRequired
        })
    }).isRequired
};

const ProductsAlert = ProductsAlertUnwrapped;

export default ProductsAlert;