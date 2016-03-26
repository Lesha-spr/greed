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
            queryProducts: Immutable.List(),
            shouldFetch: true,
            showQuery: false,
            isOpenModal: false,
            alert: false,
            product: {}
        });

        this.registerAsync(ProductsSource);
        this.bindActions(ProductsActions);
    }

    onCloseModal() {
        this.setState(this.state.set('alert', false).set('isOpenModal', false));
    }

    onAlertProduct(product) {
        this.setState(this.state.set('product', product).set('alert', true).set('isOpenModal', true));
    }

    onUpsertProduct(product) {
        this.setState(this.state.set('product', product).set('isOpenModal', true));
    }

    onFetch() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performFetch();
        }
    }

    onSuccessFetch(products) {
        this.setState(this.state.set('products', Immutable.fromJS(products)).set('shouldFetch', false));
    }

    onPut(product) {
        this.getInstance().performPut(product.formData, product.data);
    }

    onSuccessPut() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }

    onPost(formData) {
        this.getInstance().performPost(formData);
    }

    onSuccessPost() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }

    onDelete(product) {
        this.getInstance().performDelete(product);
    }

    onSuccessDelete() {
        this.setState(this.state.set('shouldFetch', true));
        this.getInstance().performFetch();
    }

    onQuerySearch(query) {
        let schema = {
            title: true
        };

        let products = querySearch({
            title: query
        }, schema, this.state.toJS().products);

        this.setState(this.state.set('queryProducts', Immutable.fromJS(products)).set('showQuery', Boolean(query)));
    }
}

export default alt.createStore(immutable(ProductsStore), 'ProductsStore');