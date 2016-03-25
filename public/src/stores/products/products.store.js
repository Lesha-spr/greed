import alt from './../../alt';
import querySearch from '../../helpers/querySearch/querySearch.js';
import ProductsActions from './../../actions/products/products.actions.js';
import {ProductsSource} from './../../sources/products/products.source.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class ProductsStore {
    constructor() {
        this.state = Immutable.Map({
            products: Immutable.List(),
            shouldFetch: true,
            isOpenModal: false,
            product: {}
        });
        this.registerAsync(ProductsSource);
        this.bindActions(ProductsActions);
    }

    onToggleModal(isOpenModal) {
        this.setState(this.state.set('isOpenModal', isOpenModal));
    }

    onUpsertProduct(data) {
        let {product, isOpenModal} = data;

        this.setState(this.state.set('product', product).set('isOpenModal', isOpenModal));
    }

    onFetch() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performFetch();
        }
    }

    onSuccessFetch(products) {
        this.setState(this.state.set('products', Immutable.fromJS(products)).set('shouldFetch', false));
    }

    onPut(data) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performPut(data.formData, data.product);
        }
    }

    onSuccessPut() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }

    onPost(formData) {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performPost(formData);
        }
    }

    onSuccessPost() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }

    onQuerySearch(query) {
        console.log(query);
    }
}

export default alt.createStore(immutable(ProductsStore), 'ProductsStore');