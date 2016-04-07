'use strict';

const mongoose = require('./../../db/mongoose');

let Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.Mixed,
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
    },
    category: {
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Product', schema);