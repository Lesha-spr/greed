import alt from './../../alt';
import querySearch from './../../helpers/querySearch/querySearch.js';
import ProductsActions from './../../actions/products/products.actions.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class ProductsStore {
    constructor() {
        this.state = Immutable.Map({
            products: Immutable.List(),
            shouldFetch: false,
            isOpenModal: false,
            product: {}
        });
        this.bindActions(ProductsActions);
    }

    onToggleModal(isOpenModal) {
        this.setState(this.state.set('isOpenModal', isOpenModal));
    }

    onUpsertProduct(data) {
        let {product, isOpenModal} = data;

        this.setState(this.state.set('product', product).set('isOpenModal', isOpenModal));
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

    onQuerySearch(query) {
        console.log(query);
    }
}

export default alt.createStore(immutable(ProductsStore), 'ProductsStore');