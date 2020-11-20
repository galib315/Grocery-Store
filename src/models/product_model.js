const mongoose = require("mongoose")
const Schema = mongoose.Schema

const products_schema = new Schema({
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
        trim:true,
        default:""
    },
    product_description: {
        type: String,
        required: true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    }
    

})

module.exports = {
    fruits:mongoose.model("fruit", products_schema),
    vegetables:mongoose.model("vegetables",products_schema),
    personalcare:mongoose.model("personal_care",products_schema)
}
