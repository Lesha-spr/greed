import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProductsTopBar from './products-top-bar.react.jsx';
import ProductsItem from './products-item.react.jsx';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import CategoriesStore from './../../stores/categories/categories.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {some} from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';

import './_products.scss';

export class ProductsUnwrapped extends Component {
    static getStores(props) {
        return [ProductsStore, CategoriesStore];
    }

    static getPropsFromStores(props) {
        return {
            productsState: ProductsStore.getState().toJS(),
            categoriesState: CategoriesStore.getState().toJS()
        }
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        ProductsActions.fetch();
        CategoriesActions.fetch();
    }

    componentWillUnmount() {
        ProductsActions.clearQuery();
    }

    render() {
        let products = this.props.productsState.query ? this.props.productsState.queryProducts : this.props.productsState.products;

        return <div className='products'>
            <h3>Products</h3>
            <ProductsTopBar {...this.props.categoriesState} {...this.props.productsState}/>
            <hr/>
            {this.props.productsState.query && !products.length ? <h4>Not found by <b>&laquo;{this.props.productsState.query}&raquo;</b></h4> : null}
            <ReactCSSTransitionGroup className='row small-up-2 medium-up-3 large-up-4' transitionName='mui-zoom' transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={500}>
                {products.map(product => <ProductsItem key={product._id} hasExistingCategory={some(this.props.categoriesState.categories, {_id: product.category})} product={product} categories={this.props.categoriesState.categories}/>)}
            </ReactCSSTransitionGroup>
        </div>;
    }
}

ProductsUnwrapped.propTypes = {
    productsState: PropTypes.shape({
        products: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired,
        queryProducts: PropTypes.array.isRequired,
        shouldFetch: PropTypes.bool.isRequired
    }),
    categoriesState: PropTypes.shape({
        categories: PropTypes.array.isRequired
    })
};

export const Products = connectToStores(ProductsUnwrapped);