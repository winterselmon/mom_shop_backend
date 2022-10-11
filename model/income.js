const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    description: {
        type: String,
    },
    income: {
        type: Number,
    },
    date: {
        type: Date,
    },

});

module.exports = mongoose.model('income', incomeSchema);
