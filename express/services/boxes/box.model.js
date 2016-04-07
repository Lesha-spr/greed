'use strict';

const mongoose = require('./../../db/mongoose');

let Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: [Schema.Types.ObjectId],
    price: {
        type: String
    },
    image: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('Box', schema);