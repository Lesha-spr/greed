import React, {Component, PropTypes} from 'react';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CategoriesAlertUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        CategoriesActions.delete(this.props.category);
        DialogActions.close();
    }

    render() {
        return <form className='category__remove' onSubmit={this.onSubmit}>
            <h3>Delete category</h3>
            <p>Are you sure you want to delete <b>&laquo;{this.props.category.title}&raquo;</b>?</p>
            <div className='button-group'>
                <button type='submit' className='alert button'>Delete</button>
                <a className='secondary button' onClick={DialogActions.close}>Cancel</a>
            </div>
            <button className='close-button' type='button' onClick={DialogActions.close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </form>;
    }
}

CategoriesAlertUnwrapped.propTypes = {
    category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired
};

const CategoriesAlert = CategoriesAlertUnwrapped;

export default CategoriesAlert;