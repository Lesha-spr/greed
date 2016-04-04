import React, {Component, PropTypes} from 'react';
import CategoriesActions from './../../actions/categories/categories.actions.js';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import serialize from 'form-serialize';
import {Form, Input, Select, Button} from 'react-validation';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class CategoriesEdit extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onSubmit(event) {
        let data = serialize(event.target, {hash: true});

        event.preventDefault();

        CategoriesActions.post(data);
        DialogActions.close();
    }

    render() {
        return <div>
            <h3>Add Product</h3>
            <Form className='category__upsert' onSubmit={this.onSubmit}>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Title
                            <Input className='ui-input' value={this.props.category.title} name='title' type='text' placeholder='Title'/>
                        </label>
                    </div>
                    <div className='medium-6 columns'>
                    </div>
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
            <button className='close-button' type='button' onClick={DialogActions.close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>;
    }
}

CategoriesEdit.defaultProps = {
    category: {}
};

export default CategoriesEdit;