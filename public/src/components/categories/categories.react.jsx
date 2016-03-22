import React, {Component, PropTypes} from 'react';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import CategoriesStore from './../../stores/categories/categories.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

class Categories extends Component {
    static getStores(props) {
        return [CategoriesStore];
    }

    static getPropsFromStores(props) {
        return CategoriesStore.getState().toJS();
    }

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        CategoriesActions.fetch();
    }

    render() {
        return <div>
            <h3>Categories</h3>
            <button type='button' className='button' >Add category</button>
            <section className='row'>
                {this.props.categories.map(category => <article>{category}</article>)}
            </section>
        </div>;
    }
}

Categories = connectToStores(Categories);

export default Categories;