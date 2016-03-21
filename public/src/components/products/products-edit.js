import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import {Form, Input, Select, Button} from 'react-validation';
import serialize from 'form-serialize';
import config from './../../../../express/src/config';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import noop from 'lodash.noop';

class ProductsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        };

        this.boundedMethods = {
            onChangeFile: this.onChangeFile.bind(this),
            closeModal: this.closeModal.bind(this),
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

        this.props.closeModal();
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.props.product._id) {
            ProductsActions.put(new FormData(event.target), serialize(event.target, {hash: true}));
        } else {
            ProductsActions.post(new FormData(event.target));
        }

        this.props.closeModal();
    }

    render() {
        let id = this.props.product._id ? <input type='hidden' name='_id' value={this.props.product._id}/> : '';

        return <Modal onRequestClose={this.props.closeModal} isOpen={this.props.isOpenModal} style={{content: {bottom: 'auto'}}}>
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
                            <button className='alert button' type='reset' onClick={this.boundedMethods.closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>;
    }
}

ProductsEdit.defaultProps = {
    openModal: noop,
    closeModal: noop,
    isOpenModal: false,
    product: {
        _id: '',
        title: '',
        price: '',
        category: '',
        image: ''
    }
};

export default ProductsEdit;