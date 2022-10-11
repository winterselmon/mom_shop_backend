const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
    },

});

module.exports = Product = mongoose.model('income', incomeSchema);
