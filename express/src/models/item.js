var mongoose = require('./../db/mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
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

export const Item = mongoose.model('Item', schema);