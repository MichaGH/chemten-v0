const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = require('./compoundSchemas/productSchema');
const regulatoryInfoSchema = require('./compoundSchemas/regulatoryInfoSchema');
const categorySchema = require('./compoundSchemas/categorySchema')

const compoundSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    casNumber: {
        type: String,
        required: false,
    },
    structure: {
        type: String,
        required: false ,
    },
    molecularFormula: {
        type: String,
        required: false
    },
    molecularWeight: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    synonyms: {
        type: String,
        required: false
    },
    products: {
        type: [productSchema],
        required: false
    },
    categories: {
        type: categorySchema,
        required: false
    },
    regulatoryInformation: {
        type: regulatoryInfoSchema,
        required: true
    }

}, { timestamps: true })

const Compound = mongoose.model('Compound', compoundSchema);
module.exports= Compound;