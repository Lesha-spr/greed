import mongoose from './../../db/mongoose';

let Schema = mongoose.Schema;

const schema = new Schema({
    _id: String,
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
});

export const Product = mongoose.model('Product', schema);