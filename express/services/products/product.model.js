'use strict';

const mongoose = require('./../../db/mongoose');

let Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
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

module.exports = mongoose.model('Product', schema);