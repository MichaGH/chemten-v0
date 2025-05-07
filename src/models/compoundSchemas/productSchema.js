const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    quality: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = productSchema