import React, {Component, PropTypes} from 'react';
import ProductsAdd from './products-add.react.jsx';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = ProductsStore.getState().toJS();
        this.boundedMethods = {
            updateState: this.updateState.bind(this)
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        ProductsStore.listen(this.boundedMethods.updateState);
        ProductsActions.fetch();
    }

    componentWillUnmount() {
        ProductsStore.unlisten(this.boundedMethods.updateState);
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
            <ProductsAdd/>
            <ul className='row medium-unstack'>
                {this.state.products.map(product => <li key={product._id} className='columns'>
                    <h4>{product._id}</h4>
                    <h5>{product.price}</h5>
                    <img src={product.image} alt={product._id}/>
                </li>)}
            </ul>
        </div>;
    }
}

export default Products;