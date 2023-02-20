const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    pid: {
        type: String
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    product: [
        {
            pid: {
                type: mongoose.Schema.Types.ObjectId
            },
            qty: {
                type: Number
            }
        }
    ]
})

module.exports = new mongoose.model("Order", orderSchema)