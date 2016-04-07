import React, {Component, PropTypes} from 'react';
import CategoriesAlert from './categories-alert.react.jsx';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import serialize from 'form-serialize';
import {Form, Input, Button} from 'react-validation';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class CategoriesEditUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        DialogActions.open(<CategoriesAlert category={this.props.category}/>);
    }

    onSubmit(event) {
        let data = serialize(event.target, {hash: true});

        event.preventDefault();

        if (this.props.category._id) {
            CategoriesActions.put(data);
        } else {
            CategoriesActions.post(data);
        }

        DialogActions.close();
    }

    render() {
        let id = this.props.category._id ? <input type='hidden' name='_id' value={this.props.category._id}/> : null;
        let deleteButton = this.props.category._id ? <div className='medium-6 columns'>
            <label>Remove category</label>
            <button onClick={this.onClick} className='button alert'>Delete</button>
        </div> : null;

        return <div>
            <h3>Add/Edit Category</h3>
            <Form className='category__upsert' onSubmit={this.onSubmit}>
                {id}
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Title
                            <Input autoComplete='off' className='ui-input' value={this.props.category.title} name='title' type='text' placeholder='Title'/>
                        </label>
                    </div>
                    {deleteButton}
                </div>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <div className='button-group'>
                            <Button className='success button' type='submit' value='Submit'/>
                            <button className='alert button' type='reset' onClick={DialogActions.close}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Form>
            <button className='close-button' type='reset' onClick={DialogActions.close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>;
    }
}

CategoriesEditUnwrapped.propTypes = {
    category: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string
    }),
    categories: PropTypes.array
};

CategoriesEditUnwrapped.defaultProps = {
    category: {},
    categories: []
};

const CategoriesEdit = CategoriesEditUnwrapped;

export default CategoriesEdit;