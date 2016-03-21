import alt from './../../alt';
import ProductsActions from './../../actions/products/products.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class ProductsStore {
    constructor() {
        this.state = Immutable.Map({
            products: Immutable.List(),
            shouldFetch: true
        });
        this.bindActions(ProductsActions);
    }

    onFetch(products) {
        this.setState(this.state.set('products', Immutable.fromJS(products)).set('shouldFetch', false));
    }

    onPost() {
        this.setState(this.state.set('shouldFetch', true));
    }

    onPut() {
        this.setState(this.state.set('shouldFetch', true));
    }
}

export default alt.createStore(immutable(ProductsStore), 'ProductsStore');