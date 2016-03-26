import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';
import modalStyles from './modalStyles.js';
import ProductsTopBar from './products-top-bar.react.jsx';
import ProductsItem from './products-item.react.jsx';
import ProductsEdit from './products-edit.react.jsx';
import ProductsAlert from './product-alert.react.jsx';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

import './_products.scss';

export class ProductsUnwrapped extends Component {
    static getStores(props) {
        return [ProductsStore];
    }

    static getPropsFromStores(props) {
        return ProductsStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        ProductsActions.fetch();
    }

    render() {
        let products = this.props.showQuery ? this.props.queryProducts : this.props.products;
        let modal = this.props.alert ? <ProductsAlert product={this.props.product}/> : <ProductsEdit product={this.props.product}/>;

        return <div className='products'>
            <h3>Products</h3>
            <ProductsTopBar/>
            <hr/>
            <Modal onRequestClose={ProductsActions.closeModal} isOpen={this.props.isOpenModal} style={modalStyles}>
                {modal}
            </Modal>
            {this.props.showQuery && !products.length ? <h4>Not found</h4> : null}
            <ReactCSSTransitionGroup className='row small-up-1 medium-up-2 large-up-3' transitionName='mui-zoom' transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={500}>
                {products.map(product => <ProductsItem key={product._id} product={product}/>)}
            </ReactCSSTransitionGroup>
        </div>;
    }
}

let Products = connectToStores(ProductsUnwrapped);

export default Products;