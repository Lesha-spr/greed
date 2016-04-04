import React, {Component, PropTypes} from 'react';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import CategoriesStore from './../../stores/categories/categories.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import connectToStores from 'alt-utils/lib/connectToStores';

import './_categories.scss';

class Categories extends Component {
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
        return <div className='categories'>
            <h3>Categories</h3>
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <ul className='menu' role='menubar'>
                        <li><a onClick={this.onClick}><i className='fi-plus'></i> Add category</a></li>
                    </ul>
                </div>
            </div>
            <section className='row'>
                {this.props.categories.map(category => <article key={category._id}>{category.title}</article>)}
            </section>
        </div>;
    }
}

Categories = connectToStores(Categories);

export default Categories;