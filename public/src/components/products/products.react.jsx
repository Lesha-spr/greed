import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';
import modalStyles from './modalStyles.js';
import ProductsItem from './products-item.react.jsx';
import ProductsEdit from './products-edit.react.jsx';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

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

    componentDidMount() {
        ProductsActions.fetch();
    }

    render() {
        return <div className='products'>
            <h3>Products</h3>
            <button type='button' className='button' onClick={ProductsActions.upsertProduct}>Add product</button>
            <Modal onRequestClose={ProductsActions.toggleModal.bind(ProductsActions, false)} isOpen={this.props.isOpenModal} style={modalStyles}>
                <ProductsEdit product={this.props.product}/>
            </Modal>
            <ReactCSSTransitionGroup className='row small-up-1 medium-up-2 large-up-3' transitionName="mui-zoom" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={300}>
                {this.props.products.map(product => <ProductsItem key={product._id} product={product}/>)}
            </ReactCSSTransitionGroup>
        </div>;
    }
}

Products = connectToStores(Products);

export default Products;