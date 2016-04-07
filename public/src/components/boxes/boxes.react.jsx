import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import BoxesTopBar from './boxes-top-bar.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

export class BoxesUnwrapped extends Component {
    static getStores(props) {
        return [ProductsStore];
    }

    static getPropsFromStores(props) {
        return {
            productsState: ProductsStore.getState().toJS()
        }
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        ProductsActions.fetch();
    }

    render() {
        return <div className='boxes'>
            <h3>Boxes</h3>
            <BoxesTopBar/>
        </div>;
    }
}

let Boxes = connectToStores(BoxesUnwrapped);

export default Boxes;