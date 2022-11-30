const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = new mongoose.model("Admin", adminSchema)