import React, {Component, PropTypes} from 'react';
import ProductsItem from './products-item.jsx';
import ProductsEdit from './products-edit.js';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';
import Immutable from 'immutable';

class Products extends Component {
    static getStores(props) {
        return [ProductsStore];
    }

    static getPropsFromStores(props) {
        let nextProps = ProductsStore.getState().toJS();

        if (nextProps.shouldFetch) {
            ProductsActions.fetch();
        }

        return nextProps;
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return <div>
            <h3>Products</h3>
            <button type='button' className='button' onClick={ProductsActions.upsertProduct}>Add product</button>
            <ProductsEdit isOpenModal={this.props.isOpenModal} product={this.props.product}/>
            <section className='row'>
                {this.props.products.map(product => <ProductsItem key={product._id} product={product}/>)}
            </section>
        </div>;
    }
}

Products = connectToStores(Products);

export default Products;