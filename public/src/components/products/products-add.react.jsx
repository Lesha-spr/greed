import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import {Form, Input, Select, Button} from 'react-validation';
import ProductsActions from './../../actions/products/products.actions.js';
import ProductsStore from './../../stores/products/products.store.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

class ProductsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            file: false
        };
        this.boundedMethods = {
            openModal: this.openModal.bind(this),
            closeModal: this.closeModal.bind(this),
            onChangeFile: this.onChangeFile.bind(this),
            onSubmit: this.onSubmit.bind(this)
        };

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    openModal() {
        this.setState({
            isOpenModal: true
        });
    }

    closeModal() {
        this.setState({
            isOpenModal: false,
            file: false
        });
    }

    onChangeFile(event) {
        let file = (event.target.files && event.target.files.length) ? event.target.files[0].name : false;

        this.setState({
            file
        });
    }

    onSubmit(event) {
        event.preventDefault();

        this.closeModal();
        ProductsActions.post(new FormData(event.target));
    }

    render() {
        return <div>
            <button type='button' className='button' onClick={this.boundedMethods.openModal}>Add product</button>
            <Modal onRequestClose={this.boundedMethods.closeModal} isOpen={this.state.isOpenModal} style={{content: {bottom: 'auto'}}}>
                <h3>Add Product</h3>
                <Form onSubmit={this.boundedMethods.onSubmit} encType='multipart/form-data'>
                    <div className='row'>
                        <div className='medium-6 columns'>
                            <label>Title
                                <Input className='ui-input' validations={[{rule: 'isRequired'}]} name='_id' type='text' placeholder='Title'/>
                            </label>
                        </div>
                        <div className='medium-6 columns'>
                            <label>Price
                                <div className='input-group'>
                                    <span className='input-group-label'>&#8381;</span>
                                    <Input validations={[{rule: 'isPrice'}]} name='price' className='input-group-field' type='number' placeholder='Price'/>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='medium-6 columns'>
                            <label>Category
                                <Select validations={[{rule: 'isRequired'}]} name='category'>
                                    <option value=''>Choose Product Category</option>
                                    <option value='Kyiv'>Kyiv</option>
                                    <option value='London'>London</option>
                                </Select>
                            </label>
                        </div>
                        <div className='medium-6 columns'>
                            <label htmlFor='file'>{this.state.file || 'Choose Product Image'}</label>
                            <label htmlFor='file' className='button'>Upload file</label>
                            <Input validations={[{rule: 'isRequired'}]} name='image' onChange={this.boundedMethods.onChangeFile} type='file' id='file' className='show-for-sr'/>
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
            </Modal>
        </div>;
    }
}

export default ProductsAdd;