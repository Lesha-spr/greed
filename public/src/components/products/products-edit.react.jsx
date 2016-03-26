import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import {Form, Input, Select, Button} from 'react-validation';
import serialize from 'form-serialize';
import config from './../../../../express/config';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class ProductsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        };

        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onChangeFile(event) {
        let image = (event.target.files && event.target.files.length) ? event.target.files[0].name : '';

        this.setState({
            image
        });
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
        let imageLabel = this.state.image
            || (this.props.product.image && this.props.product.image.public_id &&`${this.props.product.image.public_id}.${this.props.product.image.format}`)
            || 'Choose Product Image';

        return <div>
            <h3>Add Product</h3>
            <Form className='products__upsert' onSubmit={this.onSubmit} encType='multipart/form-data'>
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
                        <label htmlFor='file'>{imageLabel}</label>
                        <label htmlFor='file' className='button'>Upload file</label>
                        <Input name='image' onChange={this.onChangeFile} type='file' id='file' className='show-for-sr'/>
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
            <button className='close-button' type='button' onClick={ProductsActions.toggleModal.bind(ProductsActions, false)}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>;
    }
}

ProductsEdit.defaultProps = {
    product: {
        _id: '',
        title: '',
        price: '',
        category: '',
        image: {}
    }
};

export default ProductsEdit;