const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vegetable_schema = new Schema({
    imagePath: {
        type: String,
        required: true,
        trim:true
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    price: {
        type: Number,
        required: true
    },
    price_description: {
        type: String,
        required: true,
        trim:true
    },
    product_description: {
        type: String,
        required: true,
        trim:true
    }

})

module.exports = mongoose.model("vegetable", vegetable_schema)