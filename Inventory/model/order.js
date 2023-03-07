const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    home: {
        type: String
    },
    user: {
        type: String
    },
    date: {
        type: Date
    },
    flag: {
        type: String
    },
    tfrom: {
        type: String
    }
})

module.exports = new mongoose.model("Order", orderSchema)