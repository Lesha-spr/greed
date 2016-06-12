import React, {Component, PropTypes} from 'react';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import CategoriesStore from './../../stores/categories/categories.store.js';
import CategoriesTopBar from './categories-top-bar.react.jsx';
import CategoriesItem from './categories-item.react.jsx';
import DocumentTitle from 'react-document-title';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

import './_categories.scss';

export class CategoriesUnwrapped extends Component {
    static getStores(props) {
        return [CategoriesStore];
    }

    static getPropsFromStores(props) {
        return CategoriesStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        CategoriesActions.fetch();
    }

    onClick(event) {
        event.preventDefault();
    }

    render() {
        return <DocumentTitle title='Categories'>
            <div className='categories'>
                <h3>Categories</h3>
                <CategoriesTopBar/>
                <hr/>
                <div className='row small-up-1 medium-up-2 large-up-3'>
                    {this.props.categories.map(category => <CategoriesItem key={category._id} category={category}/>)}
                </div>
            </div>
        </DocumentTitle>;
    }
}

CategoriesUnwrapped.propTypes = {
    categories: PropTypes.array.isRequired
};

const Categories = connectToStores(CategoriesUnwrapped);

export default Categories;