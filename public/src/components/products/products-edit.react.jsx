import React, {Component, PropTypes} from 'react';
import ProductsActions from './../../actions/products/products.actions.js';
import DialogActions from './../../actions/dialog/dialog.actions.js';
import {Form, Input, Select, Button} from 'react-validation';
import serialize from 'form-serialize';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export class ProductsEditUnwrapped extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        };

        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        if (!this.props.hasExistingCategory) {
            this.refs.category.showError('Chosen category was deleted!');
        }
    }

    onChangeFile(event) {
        let image = (event.target.files && event.target.files.length) ? event.target.files[0].name : '';

        this.setState({
            image
        });
    }

    onSubmit(event) {
        let formData = new FormData(event.target);

        event.preventDefault();

        if (this.props.product._id) {
            let data = serialize(event.target, {hash: true});

            ProductsActions.put({
                formData,
                data
            });
        } else {
            ProductsActions.post(formData);
        }

        DialogActions.close();
    }

    render() {
        let id = this.props.product._id ? <input type='hidden' name='_id' value={this.props.product._id}/> : null;
        let imageLabel = this.state.image
            || (this.props.product.image && this.props.product.image.public_id &&`${this.props.product.image.public_id}.${this.props.product.image.format}`)
            || 'Choose Product Image';

        return <div>
            <h3>Add/Edit Product</h3>
            <Form className='products__upsert' onSubmit={this.onSubmit} encType='multipart/form-data'>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Title
                            <Input autoComplete='off' value={this.props.product.title} className='ui-input' validations={[{rule: 'isRequired'}]} name='title' type='text' placeholder='Title'/>
                            {id}
                        </label>
                    </div>
                    <div className='medium-6 columns'>
                        <label>Price
                            <div className='input-group'>
                                <span className='input-group-label'>&#8381;</span>
                                <Input autoComplete='off' value={this.props.product.price} validations={[{rule: 'isPrice'}]} name='price' className='input-group-field' type='number' placeholder='Price'/>
                            </div>
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='medium-6 columns'>
                        <label>Category
                            <Select ref='category' value={this.props.hasExistingCategory ? this.props.product.category : ''} validations={[{rule: 'isRequired'}]} name='category'>
                                <option value=''>Choose Product Category</option>
                                {this.props.categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>)}
                            </Select>
                        </label>
                    </div>
                    <div className='medium-6 columns'>
                        <label htmlFor='file'>{imageLabel}</label>
                        <label htmlFor='file' className='button'>Upload file</label>
                        <Input name='image' validations={this.props.validateFile ? [{rule: 'isRequired'}] : null} onChange={this.onChangeFile} type='file' id='file' className='show-for-sr'/>
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

ProductsEditUnwrapped.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.shape({
            public_id: PropTypes.string
        })
    }),
    categories: PropTypes.array
};

ProductsEditUnwrapped.defaultProps = {
    product: {},
    categories: []
};

const ProductsEdit = ProductsEditUnwrapped;

export default ProductsEdit;