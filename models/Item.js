var mongoose = require('./../db/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title:  {
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
        required: true
    },
    category: {
        type: [Schema.Types.ObjectId],
        required: true
    }
});

module.exports = mongoose.model('Item', schema);