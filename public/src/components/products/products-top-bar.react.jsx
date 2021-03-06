import React, {Component, PropTypes} from 'react';
import ProductsEdit from './products-edit.react.jsx';
import TopBar from './../top-bar/top-bar.react.jsx';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import ProductsSearch from './products-search.react.jsx';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class ProductsTopBarUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<ProductsEdit hasExistingCategory={true} validateFile={true} product={this.props.product} categories={this.props.categories}/>);
    }

    render() {
        let menu = {
            leftItems: [<a onClick={this.onClick}><i className='fi-plus'></i> Add product</a>],
            rightItems: [<ProductsSearch/>]
        };

        return <TopBar menu={menu}/>;
    }
}

ProductsTopBarUnwrapped.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.shape({
            public_id: PropTypes.string
        })
    }),
    categories: PropTypes.array
};

const ProductsTopBar = ProductsTopBarUnwrapped;

export default ProductsTopBar;