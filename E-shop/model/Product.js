const mongoose = require("mongoose")


const productschema = new mongoose.Schema({
    category: {
        type: String,
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