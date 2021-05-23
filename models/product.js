const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({

    name: {type: String, required: true},
    price: {type: Number, required: true, max: 100000},
    category: {type: String, required: true},
    quantity: {type: Number, required: true, max: 10000},

});

module.exports = mongoose.model('Product', ProductSchema);