const mongoose = require("mongoose")
const Category = require("../model/Category")

const productschema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
    },
    product: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    image: {
        type: String
    }
})

module.exports = new mongoose.model("Product", productschema)