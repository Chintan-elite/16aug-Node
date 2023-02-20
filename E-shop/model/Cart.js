const mongoose = require("mongoose")


const cartschema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    qty: {
        type: Number,
        default: 1
    },
    total: {
        type: Number
    }
})

module.exports = new mongoose.model("Cart", cartschema)