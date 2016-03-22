import mongoose from './../../db/mongoose';

let Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    }
});

export const Category = mongoose.model('Category', schema);