'use strict';

const mongoose = require('./../../db/mongoose');

let Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Category', schema);