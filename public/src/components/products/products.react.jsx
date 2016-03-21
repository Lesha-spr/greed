import React, {Component, PropTypes} from 'react';
import ProductsItem from './products-item.jsx';
import ProductsEdit from './products-edit.js';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class Products extends Component {
    constructor(props) {
        super(props);

        this.boundedMethods = {
            updateState: this.updateState.bind(this)
        };

        this.state = Object.assign(ProductsStore.getState().toJS(), {
            isOpenModal: false,
            product: {}}
        );

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        ProductsStore.listen(this.boundedMethods.updateState);
        ProductsActions.fetch();
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.boundedMethods.updateState);
    }

    openModal() {
        this.setState({
            isOpenModal: true
        });
    }

    closeModal() {
        this.setState({
            isOpenModal: false
        });
    }

    changeProduct(product) {
        this.setState({
            product: product,
            isOpenModal: true
        });
    }

    createProduct() {
        this.setState({
            product: {},
            isOpenModal: true
        });
    }

    updateState(immutableState) {
        let state = immutableState.toJS();

        if (state.shouldFetch) {
            ProductsActions.fetch();
        }

        this.setState(state);
    }

    render() {
        return <div>
            <h3>Products</h3>
            <button type='button' className='button' onClick={this.createProduct.bind(this)}>Add product</button>
            <ProductsEdit isOpenModal={this.state.isOpenModal} openModal={this.openModal.bind(this)} closeModal={this.closeModal.bind(this)} product={this.state.product}/>
            <section className='row medium-unstack'>
                {this.state.products.map(product => <ProductsItem key={product._id} updateProduct={this.changeProduct.bind(this, product)} product={product}/>)}
            </section>
        </div>;
    }
}

export default Products;