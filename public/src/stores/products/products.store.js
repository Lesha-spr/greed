import alt from './../../alt';
import querySearch from 'query-search';
import ProductsActions from './../../actions/products/products.actions.js';
import {ProductsSource} from './../../sources/products/products.source.js';
import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

export class ProductsStore {
    constructor() {
        this.state = Immutable.Map({
            products: Immutable.List(),
            query: '',
            queryProducts: Immutable.List(),
            shouldFetch: true
        });

        this.registerAsync(ProductsSource);
        this.bindActions(ProductsActions);
    }

    onAlertProduct(product) {
        this.setState(this.state.set('product', product));
    }

    onUpsertProduct(product) {
        this.setState(this.state.set('product', product));
    }

    onFetch() {
        if (!this.getInstance().isLoading()) {
            this.getInstance().performFetch();
        }
    }

    onSuccessFetch(products) {
        let queryProducts = this._populateQueryProducts(products);

        this.setState(this.state.set('products', Immutable.fromJS(products)).set('shouldFetch', false).set('queryProducts', Immutable.fromJS(queryProducts)));
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

        this.setState(this.state.set('queryProducts', Immutable.fromJS(products)).set('query', query));
    }

    onClearQuery() {
        this.setState(this.state.set('queryProducts', Immutable.List()).set('query', ''));
    }

    _populateQueryProducts(products) {
        let queryProducts = this.state.toJS().queryProducts;

        queryProducts.forEach(queryProduct => {
            products.forEach(product => {
                if (queryProduct._id === product._id) {
                    Object.assign(queryProduct, product);
                }
            });
        });

        return queryProducts;
    }
}

export default alt.createStore(immutable(ProductsStore), 'ProductsStore');