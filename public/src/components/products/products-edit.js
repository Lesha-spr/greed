import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import Modal from 'react-modal';
import {Form, Input, Select, Button} from 'react-validation';
import serialize from 'form-serialize';
import config from './../../../../express/src/config';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import noop from 'lodash.noop';

class ProductsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        };

        this.boundedMethods = {
            onChangeFile: this.onChangeFile.bind(this),
            onSubmit: this.onSubmit.bind(this)
        };

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onChangeFile(event) {
        let image = (event.target.files && event.target.files.length) ? event.target.files[0].name : '';

        this.setState({
            image
        });
    }

    closeModal() {
        this.setState({
            image: ''
        });

        ProductsActions.toggleModal(false);
    }

    onSubmit(event) {
        let formData = new FormData(event.target);
        let data = serialize(event.target, {hash: true});
        let method = this.props.product._id ? 'put' : 'post';

        event.preventDefault();

        ProductsActions[method](formData, data);
        ProductsActions.toggleModal(false);
    }

    render() {
        let id = this.props.product._id ? <input type='hidden' name='_id' value={this.props.product._id}/> : null;

        return <Modal onRequestClose={ProductsActions.toggleModal.bind(ProductsActions, false)} isOpen={this.props.isOpenModal} style={{content: {bottom: 'auto'}}}>
            <h3>Add Product</h3>
            <Form onSubmit={this.boundedMethods.onSubmit} encType='multipart/form-data'>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Title
                            <Input value={this.props.product.title} className='ui-input' validations={[{rule: 'isRequired'}]} name='title' type='text' placeholder='Title'/>
                            {id}
                        </label>
                    </div>
                    <div className='medium-6 columns'>
                        <label>Price
                            <div className='input-group'>
                                <span className='input-group-label'>&#8381;</span>
                                <Input value={this.props.product.price} validations={[{rule: 'isPrice'}]} name='price' className='input-group-field' type='number' placeholder='Price'/>
                            </div>
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Category
                            <Select value={this.props.product.category} name='category'>
                                <option value=''>Choose Product Category</option>
                                <option value='Kyiv'>Kyiv</option>
                                <option value='London'>London</option>
                            </Select>
                        </label>
                    </div>
                    <div className='medium-6 columns'>
                        <label htmlFor='file'>{this.state.image || (this.props.product.image && this.props.product.image.replace(config.outputImagePath, '')) || 'Choose Product Image'}</label>
                        <label htmlFor='file' className='button'>Upload file</label>
                        <Input name='image' onChange={this.boundedMethods.onChangeFile} type='file' id='file' className='show-for-sr'/>
                    </div>
                </div>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <div className='button-group'>
                            <Button className='success button' type='submit' value='Submit'/>
                            <button className='alert button' type='reset' onClick={ProductsActions.toggleModal.bind(ProductsActions, false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>;
    }
}

ProductsEdit.defaultProps = {
    product: {
        _id: '',
        title: '',
        price: '',
        category: '',
        image: ''
    }
};

export default ProductsEdit;